import { NextRequest, NextResponse } from "next/server";
import { inferCategory } from "@/lib/categories";
import { getSkillCount, searchSkills } from "@/lib/search";
import { Category, Skill, SkillApiResponse } from "@/lib/types";

const SKILLS_API_BASE = "https://skills.sh";
const VALID_VIEWS = ["all-time", "trending", "hot"] as const;
const OFFICIAL_OWNERS = new Set(["vercel-labs", "anthropics", "vercel"]);
const VERIFIED_OWNERS = new Set([
  "remotion-dev",
  "expo",
  "supabase",
  "better-auth",
  "google-labs-code",
  "google-gemini",
  "openai",
]);
const VALID_CATEGORIES: readonly string[] = [
  "all",
  "frontend",
  "backend",
  "design",
  "testing",
  "marketing",
  "devops",
  "mobile",
  "ai-ml",
  "docs",
  "security",
  "utilities",
];

const UPSTREAM_TIMEOUT_MS = 7000;
const UPSTREAM_RETRIES = 2;
const RETRY_BASE_DELAY_MS = 250;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 120;
const ALERT_COOLDOWN_MS = 5 * 60_000;

type ViewMode = (typeof VALID_VIEWS)[number];

interface UpstreamSkill {
  readonly id?: string;
  readonly source: string;
  readonly skillId: string;
  readonly name: string;
  readonly installs: number;
}

interface UpstreamSearchResponse {
  readonly skills: readonly UpstreamSkill[];
}

interface UpstreamListResponse {
  readonly skills: readonly UpstreamSkill[];
  readonly total: number;
  readonly hasMore: boolean;
  readonly page: number;
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimitSnapshot {
  readonly allowed: boolean;
  readonly remaining: number;
  readonly resetAt: number;
}

interface FallbackAlertState {
  lastAlertAt: number;
  suppressedCount: number;
}

type SkillScoutGlobals = typeof globalThis & {
  __skillScoutRateLimitStore?: Map<string, RateLimitEntry>;
  __skillScoutFallbackAlertState?: FallbackAlertState;
};

const runtimeGlobals = globalThis as SkillScoutGlobals;
const rateLimitStore =
  runtimeGlobals.__skillScoutRateLimitStore ??
  (runtimeGlobals.__skillScoutRateLimitStore = new Map());
const fallbackAlertState =
  runtimeGlobals.__skillScoutFallbackAlertState ??
  (runtimeGlobals.__skillScoutFallbackAlertState = {
    lastAlertAt: 0,
    suppressedCount: 0,
  });

function parseCategory(input: string): Category {
  return VALID_CATEGORIES.includes(input) ? (input as Category) : "all";
}

function parseView(input: string): ViewMode {
  return VALID_VIEWS.includes(input as ViewMode)
    ? (input as ViewMode)
    : "all-time";
}

function normalizeSourceUrl(source: string): string {
  if (source === "mintlify/com") return "https://mintlify.com";
  if (source === "huggingface/co") return "https://huggingface.co";
  return `https://github.com/${source}`;
}

function splitTokens(input: string): string[] {
  return input
    .toLowerCase()
    .split(/[^a-z0-9.+-]+/g)
    .filter((token) => token.length > 1);
}

function deriveTags(skillId: string, name: string, source: string): string[] {
  return [...new Set(splitTokens(`${skillId} ${name} ${source}`))].slice(0, 8);
}

function normalizeSkill(raw: UpstreamSkill): Skill {
  const source = raw.source.trim();
  const owner = source.split("/")[0] ?? source;
  const skillId = raw.skillId.trim();
  const name = raw.name.trim() || skillId;
  const tags = deriveTags(skillId, name, source);
  const slugPath = `${source}/${skillId}`
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
  const category = inferCategory(name, owner, tags);
  const isOfficial = OFFICIAL_OWNERS.has(owner);
  const isVerified = raw.installs >= 10000 || VERIFIED_OWNERS.has(owner);

  return {
    id: `${source}/${skillId}`,
    name,
    description: `${name} skill from ${source}.`,
    homepage: `https://skills.sh/${slugPath}`,
    repoUrl: normalizeSourceUrl(source),
    tags,
    category,
    installCommand: `npx skills add ${source} --skill ${skillId}`,
    updatedAt: new Date().toISOString().slice(0, 10),
    source,
    badge: isOfficial ? "official" : isVerified ? "verified" : "community",
    installs: raw.installs,
    owner,
  };
}

function filterByCategory(skills: readonly Skill[], category: Category): Skill[] {
  if (category === "all") return [...skills];
  return skills.filter((skill) => skill.category === category);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchJsonWithRetry<T>(url: string): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= UPSTREAM_RETRIES; attempt += 1) {
    try {
      const response = await fetch(url, {
        next: { revalidate: 300 },
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const error = new Error(`Upstream request failed (${response.status})`);
        const canRetry = response.status === 429 || response.status >= 500;
        if (attempt < UPSTREAM_RETRIES && canRetry) {
          await sleep(RETRY_BASE_DELAY_MS * (attempt + 1));
          continue;
        }
        throw error;
      }

      return (await response.json()) as T;
    } catch (error) {
      lastError = error;
      if (attempt < UPSTREAM_RETRIES) {
        await sleep(RETRY_BASE_DELAY_MS * (attempt + 1));
        continue;
      }
      throw error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Upstream request failed");
}

async function fetchUpstreamSearch(
  query: string,
  limit: number
): Promise<UpstreamSearchResponse> {
  const url = `${SKILLS_API_BASE}/api/search?q=${encodeURIComponent(
    query
  )}&limit=${limit}`;
  return fetchJsonWithRetry<UpstreamSearchResponse>(url);
}

async function fetchUpstreamList(
  view: ViewMode,
  page: number
): Promise<UpstreamListResponse> {
  const url = `${SKILLS_API_BASE}/api/skills/${view}/${page}`;
  return fetchJsonWithRetry<UpstreamListResponse>(url);
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

function sweepExpiredRateLimits(now: number): void {
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}

function consumeRateLimit(ip: string): RateLimitSnapshot {
  const now = Date.now();
  if (rateLimitStore.size > 5000) {
    sweepExpiredRateLimits(now);
  }

  const existing = rateLimitStore.get(ip);
  const entry: RateLimitEntry =
    !existing || existing.resetAt <= now
      ? { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS }
      : existing;

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(ip, entry);
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  entry.count += 1;
  rateLimitStore.set(ip, entry);

  return {
    allowed: true,
    remaining: Math.max(0, RATE_LIMIT_MAX_REQUESTS - entry.count),
    resetAt: entry.resetAt,
  };
}

function buildBaseHeaders(
  rate: RateLimitSnapshot,
  source?: "skills.sh" | "local-fallback"
): HeadersInit {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Origin": "*",
    "X-RateLimit-Limit": String(RATE_LIMIT_MAX_REQUESTS),
    "X-RateLimit-Remaining": String(rate.remaining),
    "X-RateLimit-Reset": String(Math.ceil(rate.resetAt / 1000)),
  };

  if (source) {
    headers["X-Data-Source"] = source;
  }

  return headers;
}

async function emitFallbackAlert(details: {
  readonly ip: string;
  readonly query: string;
  readonly category: Category;
  readonly view: ViewMode;
  readonly page: number;
  readonly error: unknown;
}): Promise<void> {
  const normalizedError =
    details.error instanceof Error
      ? details.error.message
      : String(details.error ?? "unknown");

  const logPayload = {
    service: "skill_scout",
    event: "skills_api_fallback",
    at: new Date().toISOString(),
    ip: details.ip,
    query: details.query,
    category: details.category,
    view: details.view,
    page: details.page,
    reason: normalizedError,
  };

  console.error("[skill_scout] fallback to local dataset", logPayload);

  const webhookUrl = process.env.FALLBACK_ALERT_WEBHOOK_URL;
  if (!webhookUrl) return;

  const now = Date.now();
  if (now - fallbackAlertState.lastAlertAt < ALERT_COOLDOWN_MS) {
    fallbackAlertState.suppressedCount += 1;
    return;
  }

  const payload = {
    ...logPayload,
    suppressedSinceLastAlert: fallbackAlertState.suppressedCount,
  };

  fallbackAlertState.lastAlertAt = now;
  fallbackAlertState.suppressedCount = 0;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(3000),
    });
  } catch (webhookError) {
    console.error("[skill_scout] fallback alert webhook failed", webhookError);
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("q")?.trim() ?? "";
  const category = parseCategory(searchParams.get("category") ?? "all");
  const format = searchParams.get("format") === "text" ? "text" : "json";
  const view = parseView(searchParams.get("view") ?? "all-time");
  const page = Math.max(parseInt(searchParams.get("page") ?? "0", 10) || 0, 0);
  const limit = Math.max(
    1,
    Math.min(parseInt(searchParams.get("limit") ?? "50", 10) || 50, 500)
  );

  const clientIp = getClientIp(request);
  const rate = consumeRateLimit(clientIp);

  if (!rate.allowed) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((rate.resetAt - Date.now()) / 1000)
    );

    if (format === "text") {
      return new NextResponse(
        "Rate limit exceeded. Please retry shortly.",
        {
          status: 429,
          headers: {
            ...buildBaseHeaders(rate),
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-store",
            "Retry-After": String(retryAfterSeconds),
          },
        }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Rate limit exceeded. Please retry shortly.",
      },
      {
        status: 429,
        headers: {
          ...buildBaseHeaders(rate),
          "Cache-Control": "no-store",
          "Retry-After": String(retryAfterSeconds),
        },
      }
    );
  }

  let results: Skill[] = [];
  let sourceTotal: number | undefined;
  let hasMore: boolean | undefined;
  let source: "skills.sh" | "local-fallback" = "skills.sh";

  try {
    if (query.length >= 2) {
      const upstreamLimit =
        category === "all"
          ? limit
          : Math.min(Math.max(limit * 6, 200), 1000);
      const searchPayload = await fetchUpstreamSearch(query, upstreamLimit);
      const normalized = searchPayload.skills.map(normalizeSkill);
      results = filterByCategory(normalized, category).slice(0, limit);
      hasMore = searchPayload.skills.length >= upstreamLimit;
    } else {
      const maxPages = category === "all" ? 1 : 20;
      let pagesFetched = 0;
      let currentPage = page;
      let upstreamHasMore = true;

      while (
        upstreamHasMore &&
        pagesFetched < maxPages &&
        results.length < limit
      ) {
        const listPayload = await fetchUpstreamList(view, currentPage);
        if (sourceTotal === undefined) {
          sourceTotal = listPayload.total;
        }
        upstreamHasMore = listPayload.hasMore;
        const normalized = listPayload.skills.map(normalizeSkill);
        results.push(...filterByCategory(normalized, category));
        currentPage += 1;
        pagesFetched += 1;
      }

      results = results.slice(0, limit);
      hasMore = upstreamHasMore;
    }
  } catch (error) {
    source = "local-fallback";
    results = searchSkills(query, category).slice(0, limit) as Skill[];
    sourceTotal = getSkillCount();
    hasMore = false;
    void emitFallbackAlert({
      ip: clientIp,
      query,
      category,
      view,
      page,
      error,
    });
  }

  if (format === "text") {
    const textLines = results.map(
      (skill) =>
        `${skill.name} (${skill.source}) - ${skill.installs.toLocaleString()} installs\n` +
        `  ${skill.description}\n` +
        `  Install: ${skill.installCommand}`
    );
    const header =
      `# Skill Scout Results\n` +
      `# Query: "${query}" | Category: ${category} | ${results.length} results\n` +
      `# Source: ${source}\n\n`;

    return new NextResponse(header + textLines.join("\n\n"), {
      headers: {
        ...buildBaseHeaders(rate, source),
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=120, s-maxage=300",
      },
    });
  }

  const response: SkillApiResponse = {
    success: true,
    data: results,
    meta: {
      total: results.length,
      query,
      category,
      format: "json",
      view,
      page,
      hasMore,
      sourceTotal,
      source,
    },
  };

  return NextResponse.json(response, {
    headers: {
      ...buildBaseHeaders(rate, source),
      "Cache-Control": "public, max-age=120, s-maxage=300",
    },
  });
}
