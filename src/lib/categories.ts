import { Category } from "./types";

export interface CategoryMeta {
  readonly value: Category;
  readonly label: string;
  readonly keywords: readonly string[];
}

export const CATEGORIES: readonly CategoryMeta[] = [
  { value: "all", label: "all", keywords: [] },
  {
    value: "frontend",
    label: "frontend",
    keywords: [
      "react", "vue", "angular", "css", "tailwind", "next", "web-design",
      "ui-ux", "html", "svelte", "astro", "frontend", "shadcn", "component",
      "responsive", "nuxt", "vite", "remix", "composition", "web-artifact",
    ],
  },
  {
    value: "backend",
    label: "backend",
    keywords: [
      "api", "database", "server", "node", "express", "graphql", "rest",
      "prisma", "drizzle", "postgres", "redis", "backend", "fastapi",
      "nestjs", "supabase", "convex", "stripe", "microservices",
    ],
  },
  {
    value: "design",
    label: "design",
    keywords: [
      "design", "figma", "color", "font", "layout", "accessibility", "a11y",
      "brand", "visual", "interface-design", "canvas", "theme", "stitch",
      "interaction-design", "web-design-guidelines",
    ],
  },
  {
    value: "testing",
    label: "testing",
    keywords: [
      "test", "jest", "playwright", "cypress", "vitest", "e2e", "unit-test",
      "coverage", "qa", "tdd", "debugging", "webapp-testing", "verification",
    ],
  },
  {
    value: "marketing",
    label: "marketing",
    keywords: [
      "seo", "analytics", "marketing", "content", "social", "email-sequence",
      "campaign", "growth", "copywriting", "cro", "programmatic-seo",
      "pricing", "launch", "referral", "paid-ads", "backlink",
    ],
  },
  {
    value: "devops",
    label: "devops",
    keywords: [
      "docker", "ci", "cd", "deploy", "kubernetes", "terraform", "aws",
      "gcp", "azure", "devops", "monitoring", "logging", "github-actions",
      "turborepo", "monorepo", "git", "pnpm", "uv",
    ],
  },
  {
    value: "mobile",
    label: "mobile",
    keywords: [
      "ios", "android", "react-native", "flutter", "mobile", "swift",
      "kotlin", "expo", "native", "swiftui",
    ],
  },
  {
    value: "ai-ml",
    label: "ai/ml",
    keywords: [
      "ai", "ml", "gpt", "llm", "openai", "anthropic", "langchain",
      "embedding", "vector", "rag", "agent", "prompt", "mcp", "skill-creator",
      "nblm", "context7",
    ],
  },
  {
    value: "docs",
    label: "docs",
    keywords: [
      "docs", "markdown", "readme", "documentation", "wiki", "changelog",
      "writing", "pdf", "docx", "pptx", "xlsx", "slide", "article",
      "comic", "infographic",
    ],
  },
  {
    value: "security",
    label: "security",
    keywords: [
      "security", "auth", "oauth", "jwt", "encryption", "vulnerability",
      "audit", "secret", "better-auth",
    ],
  },
  {
    value: "utilities",
    label: "utilities",
    keywords: [
      "util", "helper", "cli", "tool", "format", "lint", "parse", "convert",
      "find-skills", "firecrawl", "browser", "cron", "planning", "code-review",
      "humanizer", "release", "image",
    ],
  },
] as const;

export function inferCategory(
  name: string,
  owner: string,
  tags: readonly string[]
): Category {
  const searchText = `${name} ${owner} ${tags.join(" ")}`.toLowerCase();

  const scores = CATEGORIES
    .filter((cat) => cat.value !== "all")
    .map((cat) => ({
      category: cat.value,
      score: cat.keywords.reduce(
        (acc, kw) => acc + (searchText.includes(kw) ? 1 : 0),
        0
      ),
    }));

  const best = scores.reduce((a, b) => (b.score > a.score ? b : a));
  return best.score > 0 ? best.category : "utilities";
}
