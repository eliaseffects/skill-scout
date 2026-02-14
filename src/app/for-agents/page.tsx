import { Metadata } from "next";
import { CATEGORIES } from "@/lib/categories";
import { Header } from "@/components/Header";

interface UpstreamSkill {
  readonly source: string;
  readonly skillId: string;
  readonly name: string;
  readonly installs: number;
}

interface UpstreamCatalogPage {
  readonly skills: readonly UpstreamSkill[];
  readonly total: number;
}

interface CatalogSnapshot {
  readonly totalSkills: number;
  readonly topSkills: readonly Pick<UpstreamSkill, "name" | "installs" | "source">[];
}

export const metadata: Metadata = {
  title: "for agents // skill_scout",
  description:
    "Agent-first integration guide for live skill discovery, recommendation, and install commands.",
};

const CORE_FLOW = [
  {
    step: "01",
    title: "Discovery",
    detail:
      "Fetch the discovery manifest so your agent always knows what SkillScout exposes.",
    cmd: "GET /.well-known/skills.json",
  },
  {
    step: "02",
    title: "Search",
    detail:
      "Query by intent, category, or trending signals to surface relevant skills.",
    cmd: "GET /api/skills?q=deploy+vercel&category=devops&view=trending&limit=20",
  },
  {
    step: "03",
    title: "Recommend",
    detail:
      "Rank top results, explain why, and confirm with the owner before install.",
    cmd: "Return top 3 + rationale + install command",
  },
  {
    step: "04",
    title: "Install",
    detail:
      "Install the exact skill for the owner with a single deterministic command.",
    cmd: "npx skills add owner/repo --skill skill-name",
  },
];

const AGENT_RULES = [
  "Always ask the owner before installing a skill.",
  "Prefer direct task matches, then sort by installs.",
  "Include the install command in every recommendation.",
  "Cache results for 5 minutes to reduce latency.",
  "Handle 429s with a short retry + backoff.",
];

const INTEGRATION_SNIPPET = `const query = "api rate limiting";
const res = await fetch(
  "https://skillscout.dev/api/skills?" +
    new URLSearchParams({
      q: query,
      category: "backend",
      view: "trending",
      limit: "12",
    })
);
const { data } = await res.json();
const top = data.slice(0, 3);

// show top recommendations
for (const skill of top) {
  console.log(skill.name, skill.installCommand);
}`;

async function getCatalogSnapshot(): Promise<CatalogSnapshot> {
  try {
    const response = await fetch("https://skills.sh/api/skills/all-time/0", {
      next: { revalidate: 300 },
    });
    if (!response.ok) {
      throw new Error(`skills.sh returned ${response.status}`);
    }
    const payload = (await response.json()) as UpstreamCatalogPage;
    return {
      totalSkills: payload.total,
      topSkills: payload.skills.slice(0, 10),
    };
  } catch (error) {
    console.error("Failed to load live catalog snapshot", error);
    return {
      totalSkills: 0,
      topSkills: [],
    };
  }
}

export default async function ForAgentsPage() {
  const stats = await getCatalogSnapshot();
  const categories = CATEGORIES.filter((category) => category.value !== "all");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex flex-col gap-12 px-16 py-16 w-full max-w-[1000px] mx-auto">
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2 border border-border-primary px-3 py-1.5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-green-primary" />
            <span className="text-text-secondary text-xs font-mono">
              {"//"} {stats.totalSkills > 0 ? stats.totalSkills.toLocaleString() : "..."}{" "}
              live skills indexed
            </span>
          </div>
          <h1 className="text-text-primary text-3xl font-bold font-mono leading-tight">
            SkillScout Integration - System Upgrade
          </h1>
          <p className="text-text-secondary text-sm font-mono-body leading-relaxed max-w-[760px]">
            Replace static skill discovery with live, agent-first search. SkillScout
            exposes a discovery manifest, a high-signal search endpoint, and
            deterministic install commands so agents can recommend upgrades fast,
            safely, and with owner approval.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
            {[
              {
                title: "Live Discovery",
                detail: "Auto-indexed skills.sh catalog with trending signals.",
              },
              {
                title: "Deterministic Install",
                detail: "Always include `npx skills add owner/repo --skill id`.",
              },
              {
                title: "Owner-First UX",
                detail: "Explain why, ask permission, then install.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="flex flex-col gap-2 p-4 bg-bg-elevated border border-border-primary"
              >
                <span className="text-text-primary text-sm font-mono">
                  {card.title}
                </span>
                <span className="text-text-tertiary text-xs font-mono-body">
                  {card.detail}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-text-primary text-lg font-bold font-mono">
            {"//"} core flow
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CORE_FLOW.map((item) => (
              <div
                key={item.step}
                className="flex flex-col gap-3 p-5 bg-bg-elevated border border-border-primary"
              >
                <div className="flex items-center gap-2">
                  <span className="text-green-primary text-xs font-mono">
                    {item.step}
                  </span>
                  <span className="text-text-primary text-sm font-mono">
                    {item.title}
                  </span>
                </div>
                <span className="text-text-tertiary text-xs font-mono-body">
                  {item.detail}
                </span>
                <code className="text-text-primary text-xs font-mono break-all">
                  {item.cmd}
                </code>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-text-primary text-lg font-bold font-mono">
            {"//"} agent playbook
          </h2>
          <div className="flex flex-col gap-3 p-6 bg-bg-elevated border border-border-primary">
            {AGENT_RULES.map((rule, index) => (
              <div key={rule} className="flex items-start gap-3">
                <span className="text-amber-primary text-xs font-mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-text-secondary text-xs font-mono-body">
                  {rule}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-text-primary text-lg font-bold font-mono">
            {"//"} integration snippet
          </h2>
          <div className="flex flex-col gap-2 p-4 bg-bg-elevated border border-border-primary">
            <pre className="text-text-secondary text-xs font-mono whitespace-pre-wrap">
              {INTEGRATION_SNIPPET}
            </pre>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-text-primary text-lg font-bold font-mono">
            {"//"} search endpoint
          </h2>
          <div className="flex flex-col gap-2">
            <code className="text-green-primary text-sm font-mono">
              GET /api/skills
            </code>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <h3 className="text-text-primary text-sm font-bold font-mono">
              parameters:
            </h3>
            <div className="flex flex-col gap-2 pl-4">
              {[
                {
                  name: "q",
                  type: "string",
                  desc: 'search query (e.g. "react testing", "docker", "marketing")',
                },
                {
                  name: "category",
                  type: "string",
                  desc: "filter by inferred category (see list below)",
                },
                {
                  name: "view",
                  type: '"all-time" | "trending" | "hot"',
                  desc: "catalog view when q is empty (default: all-time)",
                },
                {
                  name: "page",
                  type: "number",
                  desc: "page number for catalog view (default: 0)",
                },
                {
                  name: "format",
                  type: '"json" | "text"',
                  desc: "response format (default: json)",
                },
                {
                  name: "limit",
                  type: "number",
                  desc: "max results, 1-500 (default: 50)",
                },
              ].map((param) => (
                <div key={param.name} className="flex items-start gap-3">
                  <code className="text-amber-primary text-xs font-mono shrink-0 mt-0.5">
                    {param.name}
                  </code>
                  <span className="text-text-tertiary text-xs font-mono shrink-0">
                    {param.type}
                  </span>
                  <span className="text-text-secondary text-xs font-mono-body">
                    {param.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-text-primary text-lg font-bold font-mono">
            {"//"} examples
          </h2>
          <div className="flex flex-col gap-4">
            {[
              {
                label: "find react skills",
                cmd: "curl 'https://skillscout.dev/api/skills?q=react&category=frontend'",
              },
              {
                label: "get plain text results",
                cmd: "curl 'https://skillscout.dev/api/skills?q=testing&format=text'",
              },
              {
                label: "browse trending skills",
                cmd: "curl 'https://skillscout.dev/api/skills?view=trending&limit=20'",
              },
              {
                label: "discovery endpoint",
                cmd: "curl 'https://skillscout.dev/.well-known/skills.json'",
              },
            ].map((example) => (
              <div
                key={example.label}
                className="flex flex-col gap-2 p-4 bg-bg-elevated border border-border-primary"
              >
                <span className="text-text-tertiary text-xs font-mono">
                  {"//"} {example.label}
                </span>
                <code className="text-text-primary text-xs font-mono break-all">
                  $ {example.cmd}
                </code>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-text-primary text-lg font-bold font-mono">
            {"//"} categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category.value}
                className="text-text-secondary text-xs font-mono border border-border-primary px-3 py-1.5"
              >
                {category.value}
              </span>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-text-primary text-lg font-bold font-mono">
            {"//"} response format
          </h2>
          <div className="flex flex-col gap-2 p-4 bg-bg-elevated border border-border-primary">
            <pre className="text-text-secondary text-xs font-mono whitespace-pre-wrap">
              {JSON.stringify(
                {
                  success: true,
                  data: [
                    {
                      name: "skill-name",
                      description: "what it does",
                      source: "owner/repo",
                      installCommand: "npx skills add owner/repo --skill skill-name",
                      installs: 10000,
                      category: "frontend",
                      tags: ["tag1", "tag2"],
                    },
                  ],
                  meta: {
                    total: 1,
                    query: "search term",
                    category: "all",
                    format: "json",
                    view: "all-time",
                    page: 0,
                    hasMore: true,
                    sourceTotal: 56871,
                    source: "skills.sh",
                  },
                },
                null,
                2
              )}
            </pre>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-text-primary text-lg font-bold font-mono">
            {"//"} top skills
          </h2>
          <div className="flex flex-col gap-1">
            {stats.topSkills.map((skill, index) => (
              <div
                key={`${skill.source}-${skill.name}`}
                className="flex items-center gap-3"
              >
                <span className="text-text-tertiary text-xs font-mono w-6 text-right">
                  {index + 1}.
                </span>
                <span className="text-text-primary text-xs font-mono">
                  {skill.name}
                </span>
                <span className="text-text-tertiary text-xs font-mono">
                  {skill.source}
                </span>
                <span className="text-green-primary text-xs font-mono">
                  {skill.installs.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="w-full h-px bg-border-primary" />

        <div className="flex items-center gap-2">
          <span className="text-green-primary text-xs font-mono">{">"}</span>
          <span className="text-text-tertiary text-xs font-mono-body">
            powered by the skills.sh ecosystem //{" "}
            {stats.totalSkills > 0 ? stats.totalSkills.toLocaleString() : "..."}{" "}
            skills indexed
          </span>
        </div>
      </main>
    </div>
  );
}
