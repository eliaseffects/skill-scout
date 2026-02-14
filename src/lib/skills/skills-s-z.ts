import { Skill } from "../types";
import { inferCategory } from "../categories";
import { inferPlatforms } from "../platforms";

function skill(
  name: string,
  source: string,
  installs: number,
  description: string,
  tags: readonly string[] = []
): Skill {
  const owner = source.split("/")[0];
  const isOfficial = ["vercel-labs", "anthropics", "vercel"].includes(owner);
  const isVerified = installs >= 10000 || ["remotion-dev", "expo", "supabase", "better-auth", "google-labs-code", "google-gemini"].includes(owner);

  return {
    id: `${source}/${name}`,
    name,
    description,
    homepage: `https://skills.sh/${source}`,
    repoUrl: `https://github.com/${source}`,
    tags,
    category: inferCategory(name, owner, tags),
    installCommand: `npx skills add ${source}`,
    openclawInstallCommand: `openclaw skills add ${source}`,
    updatedAt: "2026-02-13",
    source,
    badge: isOfficial ? "official" : isVerified ? "verified" : "community",
    installs,
    owner,
    platforms: inferPlatforms(name, source, tags),
  };
}

export const skillsSZ: readonly Skill[] = [
  skill(
    "schema-markup",
    "coreyhaines31/marketingskills",
    6100,
    "Implement structured data and schema markup for rich search results and SEO enhancement.",
    ["seo", "schema", "structured-data"]
  ),
  skill(
    "seo-audit",
    "coreyhaines31/marketingskills",
    17800,
    "Run comprehensive SEO audits covering technical, on-page, and off-page optimization.",
    ["seo", "audit", "marketing"]
  ),
  skill(
    "seo-geo",
    "resciencelab/opc-skills",
    2600,
    "Optimize content for local and geographic SEO targeting with location-based strategies.",
    ["seo", "geo", "local", "marketing"]
  ),
  skill(
    "shadcn-ui",
    "giuseppe-trisciuoglio/developer-kit",
    4700,
    "Build UIs with shadcn/ui components using proper customization, theming, and composition.",
    ["shadcn", "ui", "react", "tailwind"]
  ),
  skill(
    "shadcn-ui",
    "google-labs-code/stitch-skills",
    2200,
    "Integrate shadcn/ui components with Google's Stitch design system for consistent UIs.",
    ["shadcn", "ui", "design-system"]
  ),
  skill(
    "signup-flow-cro",
    "coreyhaines31/marketingskills",
    5500,
    "Optimize signup and registration flows for maximum conversion with minimal friction.",
    ["signup", "cro", "marketing", "ux"]
  ),
  skill(
    "skill-creator",
    "anthropics/skills",
    32500,
    "Create new skills for the ecosystem with proper structure, metadata, and documentation.",
    ["skill", "creator", "development"]
  ),
  skill(
    "slack-gif-creator",
    "anthropics/skills",
    4800,
    "Create animated GIFs optimized for Slack with text overlays, reactions, and custom branding.",
    ["slack", "gif", "media"]
  ),
  skill(
    "slidev",
    "antfu/skills",
    2200,
    "Create developer presentations with Slidev using markdown, code highlighting, and animations.",
    ["slidev", "presentation", "markdown"]
  ),
  skill(
    "social-content",
    "coreyhaines31/marketingskills",
    7200,
    "Create engaging social media content with platform-specific formatting and scheduling.",
    ["social", "content", "marketing"]
  ),
  skill(
    "sql-optimization-patterns",
    "wshobson/agents",
    2400,
    "Optimize SQL queries with indexing strategies, query plans, and performance tuning.",
    ["sql", "database", "performance"]
  ),
  skill(
    "stitch-loop",
    "google-labs-code/stitch-skills",
    3900,
    "Implement design-to-code feedback loops with Google's Stitch for iterative UI development.",
    ["stitch", "design", "iteration"]
  ),
  skill(
    "stripe-integration",
    "wshobson/agents",
    2200,
    "Integrate Stripe payments with subscriptions, webhooks, and checkout flow best practices.",
    ["stripe", "payments", "backend"]
  ),
  skill(
    "subagent-driven-development",
    "obra/superpowers",
    6500,
    "Coordinate sub-agents to handle specialized tasks within a larger development workflow.",
    ["agent", "subagent", "orchestration"]
  ),
  skill(
    "supabase-postgres-best-practices",
    "supabase/agent-skills",
    16700,
    "Build with Supabase and PostgreSQL following best practices for auth, storage, and real-time.",
    ["supabase", "postgres", "database", "backend"]
  ),
  skill(
    "swiftui-expert-skill",
    "avdlee/swiftui-agent-skill",
    3800,
    "Build SwiftUI applications with declarative patterns, navigation, and platform integration.",
    ["swiftui", "ios", "apple", "mobile"]
  ),
  skill(
    "systematic-debugging",
    "obra/superpowers",
    10100,
    "Apply systematic debugging methodologies to efficiently identify and resolve complex bugs.",
    ["debugging", "troubleshooting", "methodology"]
  ),
  skill(
    "tailwind-design-system",
    "wshobson/agents",
    6300,
    "Build scalable design systems with Tailwind CSS using tokens, variants, and component patterns.",
    ["tailwind", "design-system", "css"]
  ),
  skill(
    "tailwind-v4-shadcn",
    "jezweb/claude-skills",
    2200,
    "Integrate Tailwind CSS v4 with shadcn/ui components for modern, performant styling.",
    ["tailwind", "shadcn", "css", "frontend"]
  ),
  skill(
    "tanstack-query",
    "jezweb/claude-skills",
    2200,
    "Master TanStack Query for efficient data fetching, caching, and server state management.",
    ["tanstack", "react-query", "data-fetching"]
  ),
  skill(
    "template-skill",
    "anthropics/skills",
    5200,
    "Scaffold new skills from templates with proper structure, metadata, and best practices.",
    ["template", "scaffolding", "skill"]
  ),
  skill(
    "test-driven-development",
    "obra/superpowers",
    8400,
    "Practice TDD with red-green-refactor cycles, test design, and coverage strategies.",
    ["tdd", "testing", "methodology"]
  ),
  skill(
    "theme-factory",
    "anthropics/skills",
    6100,
    "Generate and customize UI themes with color palettes, typography, and design token systems.",
    ["theme", "design", "tokens", "colors"]
  ),
  skill(
    "tsdown",
    "antfu/skills",
    2400,
    "Bundle TypeScript libraries with tsdown for optimal tree-shaking and ESM/CJS output.",
    ["typescript", "bundling", "library"]
  ),
  skill(
    "turborepo",
    "vercel/turborepo",
    4400,
    "Configure Turborepo for efficient monorepo builds with caching, pipelines, and remote cache.",
    ["turborepo", "monorepo", "devops"]
  ),
  skill(
    "turborepo",
    "antfu/skills",
    2300,
    "Turborepo patterns and configurations from Anthony Fu's development workflow.",
    ["turborepo", "monorepo", "tooling"]
  ),
  skill(
    "typescript-advanced-types",
    "wshobson/agents",
    5500,
    "Master advanced TypeScript types including generics, mapped types, and conditional types.",
    ["typescript", "types", "generics"]
  ),
  skill(
    "ui-ux-pro-max",
    "nextlevelbuilder/ui-ux-pro-max-skill",
    24100,
    "Comprehensive UI/UX design skill covering layout, interactions, and visual design principles.",
    ["ui", "ux", "design", "comprehensive"]
  ),
  skill(
    "unocss",
    "antfu/skills",
    2700,
    "Style applications with UnoCSS atomic CSS engine for instant, on-demand utility generation.",
    ["unocss", "css", "atomic", "styling"]
  ),
  skill(
    "upgrading-expo",
    "expo/skills",
    6100,
    "Upgrade Expo SDK versions safely with automated checks, migration steps, and testing.",
    ["expo", "upgrade", "migration"]
  ),
  skill(
    "use-dom",
    "expo/skills",
    4200,
    "Use DOM components in Expo apps with use-dom hook for web rendering in native contexts.",
    ["expo", "dom", "react-native"]
  ),
  skill(
    "using-git-worktrees",
    "obra/superpowers",
    6100,
    "Leverage Git worktrees for parallel development on multiple branches simultaneously.",
    ["git", "worktrees", "workflow"]
  ),
  skill(
    "using-superpowers",
    "obra/superpowers",
    6200,
    "Master the Superpowers agent framework for enhanced AI-assisted development workflows.",
    ["agent", "superpowers", "framework"]
  ),
  skill(
    "uv-package-manager",
    "wshobson/agents",
    1900,
    "Manage Python projects with uv for blazing-fast dependency resolution and virtual environments.",
    ["python", "uv", "package-manager"]
  ),
  skill(
    "vercel-composition-patterns",
    "vercel-labs/agent-skills",
    38300,
    "Apply Vercel's recommended React composition patterns for scalable component architectures.",
    ["react", "composition", "patterns", "vercel"]
  ),
  skill(
    "vercel-deploy-claimable",
    "vercel-labs/agent-skills",
    3200,
    "Deploy to Vercel instantly with claimable deployments that transfer ownership to users.",
    ["vercel", "deploy", "hosting"]
  ),
  skill(
    "vercel-react-best-practices",
    "vercel-labs/agent-skills",
    128200,
    "Follow Vercel's React and Next.js best practices for performance, patterns, and production readiness.",
    ["react", "nextjs", "vercel", "performance"]
  ),
  skill(
    "vercel-react-native-skills",
    "vercel-labs/agent-skills",
    27600,
    "Build React Native applications with Vercel's recommended patterns and mobile best practices.",
    ["react-native", "vercel", "mobile"]
  ),
  skill(
    "verification-before-completion",
    "obra/superpowers",
    6100,
    "Verify implementation correctness before marking tasks complete with automated checks.",
    ["verification", "quality", "workflow"]
  ),
  skill(
    "visual-design-foundations",
    "wshobson/agents",
    1900,
    "Apply fundamental visual design principles including typography, color theory, and layout.",
    ["design", "visual", "typography", "color"]
  ),
  skill(
    "vite",
    "antfu/skills",
    5200,
    "Configure and optimize Vite for fast development builds with HMR and production bundling.",
    ["vite", "build", "frontend", "tooling"]
  ),
  skill(
    "vitepress",
    "antfu/skills",
    3000,
    "Build documentation sites with VitePress using markdown, Vue components, and theming.",
    ["vitepress", "docs", "vue", "markdown"]
  ),
  skill(
    "vitest",
    "antfu/skills",
    4100,
    "Write fast unit and integration tests with Vitest using Vue and React testing patterns.",
    ["vitest", "testing", "unit-test"]
  ),
  skill(
    "vue",
    "antfu/skills",
    4500,
    "Build Vue 3 applications with Composition API, reactivity system, and ecosystem patterns.",
    ["vue", "frontend", "composition-api"]
  ),
  skill(
    "vue-best-practices",
    "hyf0/vue-skills",
    6000,
    "Follow Vue.js best practices for component design, state management, and performance.",
    ["vue", "best-practices", "frontend"]
  ),
  skill(
    "vue-best-practices",
    "antfu/skills",
    4000,
    "Vue best practices and patterns from Anthony Fu's development experience.",
    ["vue", "patterns", "frontend"]
  ),
  skill(
    "vue-best-practices",
    "vuejs-ai/skills",
    2000,
    "Official Vue.js community best practices for building maintainable applications.",
    ["vue", "community", "frontend"]
  ),
  skill(
    "vue-debug-guides",
    "hyf0/vue-skills",
    5700,
    "Debug Vue applications effectively with DevTools, reactivity tracking, and common issue patterns.",
    ["vue", "debugging", "devtools"]
  ),
  skill(
    "vue-router-best-practices",
    "antfu/skills",
    1900,
    "Implement Vue Router with navigation guards, lazy loading, and nested route patterns.",
    ["vue-router", "vue", "routing"]
  ),
  skill(
    "vueuse-functions",
    "antfu/skills",
    3600,
    "Use VueUse composables for common tasks including sensors, animations, and browser APIs.",
    ["vueuse", "vue", "composables"]
  ),
  skill(
    "web-artifacts-builder",
    "anthropics/skills",
    5900,
    "Build interactive web artifacts with HTML, CSS, and JavaScript for standalone experiences.",
    ["web", "artifacts", "frontend"]
  ),
  skill(
    "web-component-design",
    "wshobson/agents",
    1900,
    "Design and build web components with Shadow DOM, custom elements, and cross-framework compatibility.",
    ["web-components", "shadow-dom", "frontend"]
  ),
  skill(
    "web-design-guidelines",
    "vercel-labs/agent-skills",
    96100,
    "Audit and improve web UIs against 100+ rules covering accessibility, performance, and UX.",
    ["design", "accessibility", "ux", "audit"]
  ),
  skill(
    "web-design-guidelines",
    "antfu/skills",
    3400,
    "Web design guidelines and patterns from Anthony Fu's development philosophy.",
    ["design", "web", "guidelines"]
  ),
  skill(
    "webapp-testing",
    "anthropics/skills",
    9500,
    "Test web applications comprehensively with unit, integration, and end-to-end testing strategies.",
    ["testing", "webapp", "e2e"]
  ),
  skill(
    "writing-plans",
    "obra/superpowers",
    8700,
    "Write detailed implementation plans with clear objectives, milestones, and success criteria.",
    ["planning", "writing", "methodology"]
  ),
  skill(
    "writing-skills",
    "obra/superpowers",
    6100,
    "Create well-structured skills with clear instructions, examples, and edge case handling.",
    ["writing", "skills", "documentation"]
  ),
  skill(
    "xlsx",
    "anthropics/skills",
    10600,
    "Create and manipulate Excel spreadsheets with formulas, charts, formatting, and data validation.",
    ["xlsx", "excel", "spreadsheet", "docs"]
  ),
  skill(
    "baoyu-danger-gemini-web",
    "jimliu/baoyu-skills",
    2600,
    "Web interface for Gemini model integration with safety guardrails and content moderation.",
    ["gemini", "ai", "web"]
  ),
  skill(
    "baoyu-danger-x-to-markdown",
    "jimliu/baoyu-skills",
    3200,
    "Convert X (Twitter) threads and posts into clean, well-formatted markdown documents.",
    ["twitter", "markdown", "conversion"]
  ),
  skill(
    "baoyu-post-to-wechat",
    "jimliu/baoyu-skills",
    2900,
    "Format and publish content to WeChat Official Accounts with rich media and styling.",
    ["wechat", "social", "publishing"]
  ),
] as const;
