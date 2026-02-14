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

export const skillsGR: readonly Skill[] = [
  skill(
    "git-advanced-workflows",
    "wshobson/agents",
    2000,
    "Master advanced Git workflows including rebasing, cherry-picking, bisecting, and worktrees.",
    ["git", "workflow", "version-control"]
  ),
  skill(
    "github-actions-templates",
    "wshobson/agents",
    2300,
    "Create GitHub Actions workflows for CI/CD, testing, deployment, and automation.",
    ["github-actions", "ci-cd", "devops"]
  ),
  skill(
    "golang-pro",
    "jeffallan/claude-skills",
    2100,
    "Write production Go code following idiomatic patterns for concurrency, error handling, and testing.",
    ["go", "golang", "backend"]
  ),
  skill(
    "humanizer-zh",
    "op7418/humanizer-zh",
    2600,
    "Transform AI-generated Chinese text into natural, human-like writing with cultural nuance.",
    ["writing", "chinese", "humanizer"]
  ),
  skill(
    "implement-design",
    "figma/mcp-server-guide",
    1800,
    "Convert Figma designs to code with accurate layout, spacing, and component implementation.",
    ["figma", "design-to-code", "frontend"]
  ),
  skill(
    "instaclaw",
    "napoleond/instaclaw",
    4300,
    "Instant agent setup and configuration for rapid prototyping and development workflows.",
    ["agent", "setup", "prototyping"]
  ),
  skill(
    "interaction-design",
    "wshobson/agents",
    2000,
    "Design intuitive user interactions with micro-animations, feedback patterns, and gesture support.",
    ["interaction", "ux", "design", "animation"]
  ),
  skill(
    "interface-design",
    "dammyjay93/interface-design",
    3100,
    "Design clean, functional user interfaces following proven UI patterns and accessibility standards.",
    ["ui", "design", "interface", "a11y"]
  ),
  skill(
    "internal-comms",
    "anthropics/skills",
    5100,
    "Draft internal communications including memos, announcements, and team updates.",
    ["writing", "communications", "business"]
  ),
  skill(
    "javascript-testing-patterns",
    "wshobson/agents",
    2200,
    "Write comprehensive JavaScript tests with Jest, Vitest, and testing best practices.",
    ["javascript", "testing", "jest", "vitest"]
  ),
  skill(
    "langchain-architecture",
    "wshobson/agents",
    2000,
    "Build LLM-powered applications with LangChain using chains, agents, and retrieval patterns.",
    ["langchain", "ai", "llm", "rag"]
  ),
  skill(
    "laravel-specialist",
    "jeffallan/claude-skills",
    1900,
    "Build Laravel applications with Eloquent, middleware, queues, and testing best practices.",
    ["laravel", "php", "backend"]
  ),
  skill(
    "launch-strategy",
    "coreyhaines31/marketingskills",
    6400,
    "Plan and execute product launches with timeline, channels, messaging, and post-launch analysis.",
    ["marketing", "launch", "strategy"]
  ),
  skill(
    "marketing-ideas",
    "coreyhaines31/marketingskills",
    7700,
    "Generate creative marketing ideas tailored to your product, audience, and growth stage.",
    ["marketing", "ideas", "brainstorming"]
  ),
  skill(
    "marketing-psychology",
    "coreyhaines31/marketingskills",
    9800,
    "Apply behavioral psychology principles to marketing for better engagement and conversion.",
    ["marketing", "psychology", "conversion"]
  ),
  skill(
    "mcp-builder",
    "anthropics/skills",
    8600,
    "Build Model Context Protocol (MCP) servers with tool definitions, resources, and transport setup.",
    ["mcp", "ai", "tools", "server"]
  ),
  skill(
    "microservices-patterns",
    "wshobson/agents",
    1900,
    "Design microservices architectures with service discovery, messaging, and distributed patterns.",
    ["microservices", "architecture", "backend"]
  ),
  skill(
    "mobile-android-design",
    "wshobson/agents",
    2300,
    "Design Android applications following Material Design guidelines and platform conventions.",
    ["android", "mobile", "material-design"]
  ),
  skill(
    "mobile-ios-design",
    "wshobson/agents",
    2600,
    "Design iOS applications following Human Interface Guidelines and Apple platform patterns.",
    ["ios", "mobile", "apple", "design"]
  ),
  skill(
    "modern-javascript-patterns",
    "wshobson/agents",
    2100,
    "Write modern JavaScript with ES2024+ features, async patterns, and functional programming.",
    ["javascript", "es2024", "patterns"]
  ),
  skill(
    "monorepo-management",
    "wshobson/agents",
    2000,
    "Manage monorepos with Turborepo, Nx, or pnpm workspaces for efficient multi-package development.",
    ["monorepo", "turborepo", "pnpm"]
  ),
  skill(
    "native-data-fetching",
    "expo/skills",
    6100,
    "Implement efficient data fetching in React Native with caching, offline support, and pagination.",
    ["react-native", "data-fetching", "expo"]
  ),
  skill(
    "nblm",
    "magicseek/nblm",
    5000,
    "Natural language task management and planning for complex multi-step agent operations.",
    ["agent", "planning", "nlp"]
  ),
  skill(
    "nestjs-best-practices",
    "kadajett/agent-nestjs-skills",
    3100,
    "Build NestJS applications with dependency injection, modules, guards, and testing patterns.",
    ["nestjs", "backend", "typescript", "api"]
  ),
  skill(
    "next-best-practices",
    "vercel-labs/next-skills",
    11200,
    "Build Next.js applications following Vercel's recommended patterns for performance and DX.",
    ["nextjs", "react", "frontend", "vercel"]
  ),
  skill(
    "next-cache-components",
    "vercel-labs/next-skills",
    3400,
    "Implement advanced caching strategies in Next.js with server components and ISR patterns.",
    ["nextjs", "caching", "performance"]
  ),
  skill(
    "next-upgrade",
    "vercel-labs/next-skills",
    2500,
    "Upgrade Next.js applications between major versions with automated codemods and migration guides.",
    ["nextjs", "upgrade", "migration"]
  ),
  skill(
    "nextjs-app-router-patterns",
    "wshobson/agents",
    3400,
    "Master Next.js App Router patterns including layouts, loading states, and parallel routes.",
    ["nextjs", "app-router", "frontend"]
  ),
  skill(
    "nodejs-backend-patterns",
    "wshobson/agents",
    4200,
    "Build scalable Node.js backends with Express/Fastify, middleware, and production patterns.",
    ["nodejs", "backend", "express", "api"]
  ),
  skill(
    "nuxt",
    "antfu/skills",
    3100,
    "Build Nuxt 3 applications with Vue composition API, auto-imports, and server engine.",
    ["nuxt", "vue", "frontend", "ssr"]
  ),
  skill(
    "onboarding-cro",
    "coreyhaines31/marketingskills",
    6000,
    "Optimize user onboarding flows for activation, retention, and time-to-value metrics.",
    ["onboarding", "cro", "marketing", "ux"]
  ),
  skill(
    "page-cro",
    "coreyhaines31/marketingskills",
    6400,
    "Optimize landing page conversion rates with layout, copy, and CTA placement strategies.",
    ["cro", "landing-page", "marketing"]
  ),
  skill(
    "paid-ads",
    "coreyhaines31/marketingskills",
    5900,
    "Create and manage paid advertising campaigns across Google, Meta, and other platforms.",
    ["ads", "marketing", "paid-media"]
  ),
  skill(
    "paywall-upgrade-cro",
    "coreyhaines31/marketingskills",
    5400,
    "Optimize paywall and upgrade flows to maximize free-to-paid conversion rates.",
    ["paywall", "cro", "marketing", "monetization"]
  ),
  skill(
    "pdf",
    "anthropics/skills",
    13900,
    "Create, edit, and manipulate PDF documents with text, images, tables, and form fields.",
    ["pdf", "docs", "document"]
  ),
  skill(
    "pinia",
    "antfu/skills",
    3500,
    "Manage Vue application state with Pinia using stores, getters, and actions patterns.",
    ["pinia", "vue", "state-management"]
  ),
  skill(
    "planning-with-files",
    "othmanadi/planning-with-files",
    2500,
    "Organize and execute complex plans using file-based tracking with structured task management.",
    ["planning", "files", "organization"]
  ),
  skill(
    "pnpm",
    "antfu/skills",
    3600,
    "Master pnpm package manager with workspaces, strict dependencies, and monorepo patterns.",
    ["pnpm", "package-manager", "devops"]
  ),
  skill(
    "popup-cro",
    "coreyhaines31/marketingskills",
    5200,
    "Design high-converting popups and modals with timing, targeting, and A/B testing strategies.",
    ["popup", "cro", "marketing"]
  ),
  skill(
    "postgresql-table-design",
    "wshobson/agents",
    3200,
    "Design efficient PostgreSQL schemas with proper indexing, constraints, and normalization.",
    ["postgresql", "database", "schema"]
  ),
  skill(
    "pptx",
    "anthropics/skills",
    11500,
    "Create professional PowerPoint presentations with slides, charts, images, and animations.",
    ["pptx", "powerpoint", "presentation", "docs"]
  ),
  skill(
    "pricing-strategy",
    "coreyhaines31/marketingskills",
    7100,
    "Develop optimal pricing strategies with tiers, packaging, and value-based pricing models.",
    ["pricing", "strategy", "marketing"]
  ),
  skill(
    "product-marketing-context",
    "coreyhaines31/marketingskills",
    8200,
    "Build product marketing foundations with positioning, messaging, and competitive differentiation.",
    ["marketing", "positioning", "messaging"]
  ),
  skill(
    "programmatic-seo",
    "coreyhaines31/marketingskills",
    8500,
    "Build programmatic SEO pages at scale with templates, structured data, and keyword targeting.",
    ["seo", "marketing", "programmatic"]
  ),
  skill(
    "prompt-engineering-patterns",
    "wshobson/agents",
    3100,
    "Write effective prompts with chain-of-thought, few-shot, and structured output techniques.",
    ["prompt", "ai", "engineering"]
  ),
  skill(
    "python-packaging",
    "wshobson/agents",
    1800,
    "Package and distribute Python libraries with pyproject.toml, build tools, and PyPI publishing.",
    ["python", "packaging", "distribution"]
  ),
  skill(
    "python-performance-optimization",
    "wshobson/agents",
    3800,
    "Optimize Python code performance with profiling, caching, concurrency, and algorithmic improvements.",
    ["python", "performance", "optimization"]
  ),
  skill(
    "python-testing-patterns",
    "wshobson/agents",
    3000,
    "Write comprehensive Python tests with pytest, fixtures, mocking, and coverage strategies.",
    ["python", "testing", "pytest"]
  ),
  skill(
    "rag-implementation",
    "wshobson/agents",
    1900,
    "Build Retrieval-Augmented Generation systems with vector stores, embeddings, and chunking.",
    ["rag", "ai", "llm", "embeddings"]
  ),
  skill(
    "ralph-tui-create-beads",
    "subsy/ralph-tui",
    3100,
    "Create bead components for the Ralph TUI framework with interactive terminal interfaces.",
    ["tui", "terminal", "components"]
  ),
  skill(
    "ralph-tui-create-beads-rust",
    "subsy/ralph-tui",
    3100,
    "Build Rust-based bead components for Ralph TUI with performance and type safety.",
    ["rust", "tui", "terminal"]
  ),
  skill(
    "ralph-tui-create-json",
    "subsy/ralph-tui",
    3500,
    "Generate JSON configurations for Ralph TUI applications with schema validation.",
    ["json", "tui", "configuration"]
  ),
  skill(
    "ralph-tui-prd",
    "subsy/ralph-tui",
    4000,
    "Create product requirement documents for Ralph TUI projects with structured specifications.",
    ["prd", "requirements", "planning"]
  ),
  skill(
    "react-native-architecture",
    "wshobson/agents",
    2100,
    "Architect React Native applications with navigation, state, and native module patterns.",
    ["react-native", "architecture", "mobile"]
  ),
  skill(
    "react-native-best-practices",
    "callstackincubator/agent-skills",
    5000,
    "Build performant React Native apps following Callstack's production-tested best practices.",
    ["react-native", "mobile", "performance"]
  ),
  skill(
    "react-native-design",
    "wshobson/agents",
    2100,
    "Design React Native interfaces with platform-adaptive layouts and native feel.",
    ["react-native", "design", "mobile"]
  ),
  skill(
    "react-state-management",
    "wshobson/agents",
    2000,
    "Choose and implement React state management with Context, Zustand, Jotai, or Redux patterns.",
    ["react", "state", "frontend"]
  ),
  skill(
    "react:components",
    "google-labs-code/stitch-skills",
    5000,
    "Build reusable React components with proper composition, accessibility, and testing patterns.",
    ["react", "components", "frontend"]
  ),
  skill(
    "receiving-code-review",
    "obra/superpowers",
    5900,
    "Process and respond to code review feedback effectively with structured revision workflows.",
    ["code-review", "workflow", "collaboration"]
  ),
  skill(
    "referral-program",
    "coreyhaines31/marketingskills",
    6000,
    "Design and implement referral programs with incentives, tracking, and viral loop optimization.",
    ["referral", "marketing", "growth"]
  ),
  skill(
    "release-skills",
    "jimliu/baoyu-skills",
    2700,
    "Manage skill releases with versioning, changelogs, and distribution across the ecosystem.",
    ["release", "versioning", "distribution"]
  ),
  skill(
    "remembering-conversations",
    "obra/episodic-memory",
    4800,
    "Persist and recall conversation context across sessions for continuity and personalization.",
    ["memory", "context", "agent"]
  ),
  skill(
    "remotion-best-practices",
    "remotion-dev/skills",
    88000,
    "Create programmatic videos with Remotion following best practices for composition and rendering.",
    ["remotion", "video", "react"]
  ),
  skill(
    "requesting-code-review",
    "obra/superpowers",
    7100,
    "Prepare and submit code review requests with proper context, scope, and review guidance.",
    ["code-review", "workflow", "collaboration"]
  ),
  skill(
    "responsive-design",
    "wshobson/agents",
    2900,
    "Build responsive layouts that adapt seamlessly across mobile, tablet, and desktop viewports.",
    ["responsive", "css", "design", "frontend"]
  ),
  skill(
    "rust-async-patterns",
    "wshobson/agents",
    1800,
    "Write async Rust code with tokio, futures, and concurrent programming patterns.",
    ["rust", "async", "backend"]
  ),
] as const;
