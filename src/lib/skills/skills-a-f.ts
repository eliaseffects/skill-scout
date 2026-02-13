import { Skill } from "../types";
import { inferCategory } from "../categories";

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
    updatedAt: "2026-02-13",
    source,
    badge: isOfficial ? "official" : isVerified ? "verified" : "community",
    installs,
    owner,
  };
}

export const skillsAF: readonly Skill[] = [
  skill(
    "ab-test-setup",
    "coreyhaines31/marketingskills",
    5200,
    "Set up and manage A/B tests with statistical significance tracking and variant analysis.",
    ["marketing", "analytics", "testing"]
  ),
  skill(
    "accessibility-compliance",
    "wshobson/agents",
    1900,
    "Audit and fix accessibility issues following WCAG guidelines and best practices.",
    ["a11y", "accessibility", "compliance"]
  ),
  skill(
    "agent-browser",
    "vercel-labs/agent-browser",
    33600,
    "Browse the web programmatically from your agent. Navigate, extract data, and interact with pages.",
    ["browser", "automation", "scraping"]
  ),
  skill(
    "agent-tools",
    "1nfsh/skills",
    2500,
    "Essential toolkit of agent utilities for common development tasks and workflows.",
    ["agent", "tools", "utilities"]
  ),
  skill(
    "agentation",
    "benjitaylor/agentation",
    3100,
    "Framework for building multi-agent systems with coordination and task delegation.",
    ["agent", "multi-agent", "orchestration"]
  ),
  skill(
    "ai-sdk",
    "vercel/ai",
    4600,
    "Build AI-powered applications with Vercel's AI SDK. Streaming, tool use, and model integration.",
    ["ai", "sdk", "vercel", "llm"]
  ),
  skill(
    "algorithmic-art",
    "anthropics/skills",
    5500,
    "Generate algorithmic and generative art using code. Create visualizations, fractals, and patterns.",
    ["art", "creative", "generative"]
  ),
  skill(
    "analytics-tracking",
    "coreyhaines31/marketingskills",
    6200,
    "Implement and configure analytics tracking across your application with proper event taxonomies.",
    ["analytics", "tracking", "marketing"]
  ),
  skill(
    "antfu",
    "antfu/skills",
    3600,
    "Development patterns and conventions from Anthony Fu's open source projects.",
    ["conventions", "tooling", "patterns"]
  ),
  skill(
    "api-design-principles",
    "wshobson/agents",
    4300,
    "Design RESTful and GraphQL APIs following industry best practices for scalability and consistency.",
    ["api", "rest", "graphql", "backend"]
  ),
  skill(
    "architecture-decision-records",
    "wshobson/agents",
    1800,
    "Create and maintain Architecture Decision Records (ADRs) to document technical decisions.",
    ["architecture", "documentation", "adr"]
  ),
  skill(
    "architecture-patterns",
    "wshobson/agents",
    3500,
    "Apply proven software architecture patterns for building scalable, maintainable systems.",
    ["architecture", "patterns", "backend"]
  ),
  skill(
    "async-python-patterns",
    "wshobson/agents",
    2500,
    "Write efficient async Python code with asyncio, concurrent patterns, and best practices.",
    ["python", "async", "backend"]
  ),
  skill(
    "audit-website",
    "squirrelscan/skills",
    18700,
    "Run comprehensive website audits covering performance, SEO, accessibility, and security.",
    ["audit", "seo", "performance", "security"]
  ),
  skill(
    "auth-implementation-patterns",
    "wshobson/agents",
    1800,
    "Implement authentication and authorization patterns including OAuth, JWT, and session management.",
    ["auth", "security", "jwt", "oauth"]
  ),
  skill(
    "backlink-analyzer",
    "aaron-he-zhu/seo-geo-claude-skills",
    1900,
    "Analyze backlink profiles and discover link-building opportunities for SEO improvement.",
    ["seo", "backlinks", "marketing"]
  ),
  skill(
    "baoyu-article-illustrator",
    "jimliu/baoyu-skills",
    3300,
    "Generate custom illustrations for articles and blog posts with AI-powered image creation.",
    ["illustration", "content", "creative"]
  ),
  skill(
    "baoyu-comic",
    "jimliu/baoyu-skills",
    2900,
    "Create comic strips and visual narratives with automated panel layout and dialogue.",
    ["comic", "creative", "visual"]
  ),
  skill(
    "baoyu-compress-image",
    "jimliu/baoyu-skills",
    2700,
    "Optimize and compress images for web delivery while maintaining visual quality.",
    ["image", "compression", "optimization"]
  ),
  skill(
    "baoyu-cover-image",
    "jimliu/baoyu-skills",
    3200,
    "Design professional cover images for articles, social posts, and marketing content.",
    ["design", "cover", "image"]
  ),
  skill(
    "baoyu-image-gen",
    "jimliu/baoyu-skills",
    2700,
    "Generate images from text descriptions using AI models with style and composition control.",
    ["ai", "image", "generation"]
  ),
  skill(
    "baoyu-infographic",
    "jimliu/baoyu-skills",
    2600,
    "Create data-driven infographics with automated chart generation and visual layouts.",
    ["infographic", "data-viz", "design"]
  ),
  skill(
    "baoyu-post-to-x",
    "jimliu/baoyu-skills",
    3400,
    "Compose and publish posts to X (Twitter) with formatting, media attachments, and scheduling.",
    ["social", "twitter", "posting"]
  ),
  skill(
    "baoyu-slide-deck",
    "jimliu/baoyu-skills",
    3300,
    "Build presentation slide decks with automated layout, styling, and content organization.",
    ["slides", "presentation", "docs"]
  ),
  skill(
    "baoyu-url-to-markdown",
    "jimliu/baoyu-skills",
    2500,
    "Convert any web page URL into clean, well-structured markdown for documentation.",
    ["markdown", "conversion", "docs"]
  ),
  skill(
    "baoyu-xhs-images",
    "jimliu/baoyu-skills",
    3100,
    "Create optimized image content for Xiaohongshu (Little Red Book) social platform.",
    ["social", "image", "content"]
  ),
  skill(
    "better-auth-best-practices",
    "better-auth/skills",
    10900,
    "Implement authentication with Better Auth following security best practices and patterns.",
    ["auth", "security", "better-auth"]
  ),
  skill(
    "brainstorming",
    "obra/superpowers",
    18400,
    "Structured brainstorming sessions with divergent thinking, idea clustering, and prioritization.",
    ["ideation", "creativity", "planning"]
  ),
  skill(
    "brand-guidelines",
    "anthropics/skills",
    5400,
    "Create and maintain brand guidelines covering visual identity, voice, and usage rules.",
    ["brand", "design", "identity"]
  ),
  skill(
    "browser-use",
    "browser-use/browser-use",
    28500,
    "Control web browsers programmatically for automation, testing, and data extraction.",
    ["browser", "automation", "scraping"]
  ),
  skill(
    "building-native-ui",
    "expo/skills",
    9500,
    "Build native user interfaces with Expo and React Native following platform conventions.",
    ["react-native", "mobile", "expo", "ui"]
  ),
  skill(
    "canvas-design",
    "anthropics/skills",
    7400,
    "Design and manipulate HTML5 Canvas elements for interactive graphics and visualizations.",
    ["canvas", "design", "visualization"]
  ),
  skill(
    "clawdirect",
    "napoleond/clawdirect",
    4300,
    "Direct agent communication and task management for streamlined multi-step workflows.",
    ["agent", "workflow", "productivity"]
  ),
  skill(
    "clawdirect-dev",
    "napoleond/clawdirect",
    4200,
    "Development environment setup and configuration for ClawDirect agent framework.",
    ["agent", "dev", "framework"]
  ),
  skill(
    "code-review-excellence",
    "wshobson/agents",
    3300,
    "Perform thorough code reviews following industry standards for quality, security, and performance.",
    ["code-review", "quality", "best-practices"]
  ),
  skill(
    "code-reviewer",
    "google-gemini/gemini-cli",
    1900,
    "Automated code review with detailed feedback on style, bugs, security, and performance.",
    ["code-review", "quality", "automation"]
  ),
  skill(
    "competitor-alternatives",
    "coreyhaines31/marketingskills",
    6000,
    "Analyze competitor positioning and create differentiated alternative comparison pages.",
    ["marketing", "competitive", "analysis"]
  ),
  skill(
    "content-strategy",
    "coreyhaines31/marketingskills",
    8400,
    "Develop comprehensive content strategies with editorial calendars and topic clustering.",
    ["content", "strategy", "marketing"]
  ),
  skill(
    "context7",
    "intellectronica/agent-skills",
    2100,
    "Retrieve up-to-date library documentation directly from source for accurate code generation.",
    ["documentation", "context", "ai"]
  ),
  skill(
    "convex",
    "waynesutton/convexskills",
    1800,
    "Build reactive backends with Convex including real-time sync, serverless functions, and schemas.",
    ["backend", "database", "convex", "serverless"]
  ),
  skill(
    "copy-editing",
    "coreyhaines31/marketingskills",
    7300,
    "Polish marketing copy for clarity, tone, grammar, and brand voice consistency.",
    ["copywriting", "editing", "marketing"]
  ),
  skill(
    "copywriting",
    "coreyhaines31/marketingskills",
    12900,
    "Write compelling marketing copy for landing pages, ads, emails, and product descriptions.",
    ["copywriting", "marketing", "content"]
  ),
  skill(
    "create-auth-skill",
    "better-auth/skills",
    4600,
    "Scaffold complete authentication flows with login, registration, and session management.",
    ["auth", "security", "scaffolding"]
  ),
  skill(
    "database-migration",
    "wshobson/agents",
    1800,
    "Plan and execute database schema migrations safely with rollback strategies.",
    ["database", "migration", "backend"]
  ),
  skill(
    "debugging-strategies",
    "wshobson/agents",
    1900,
    "Systematic debugging approaches for identifying and fixing complex software issues.",
    ["debugging", "testing", "troubleshooting"]
  ),
  skill(
    "design-md",
    "google-labs-code/stitch-skills",
    4800,
    "Generate design specifications in markdown format from UI requirements and wireframes.",
    ["design", "markdown", "specification"]
  ),
  skill(
    "design-system-patterns",
    "wshobson/agents",
    2200,
    "Build and maintain scalable design systems with tokens, components, and documentation.",
    ["design-system", "components", "tokens"]
  ),
  skill(
    "dispatching-parallel-agents",
    "obra/superpowers",
    5600,
    "Coordinate multiple agents working in parallel on different aspects of a complex task.",
    ["agent", "parallel", "orchestration"]
  ),
  skill(
    "doc-coauthoring",
    "anthropics/skills",
    6200,
    "Collaboratively write and edit documents with AI assistance for structure and content.",
    ["docs", "writing", "collaboration"]
  ),
  skill(
    "docker-expert",
    "sickn33/antigravity-awesome-skills",
    2100,
    "Master Docker containerization with multi-stage builds, compose, and optimization patterns.",
    ["docker", "containers", "devops"]
  ),
  skill(
    "docx",
    "anthropics/skills",
    10700,
    "Create and edit Word documents programmatically with formatting, tables, and images.",
    ["docx", "word", "docs"]
  ),
  skill(
    "e2e-testing-patterns",
    "wshobson/agents",
    2600,
    "Write reliable end-to-end tests with Playwright or Cypress following proven patterns.",
    ["e2e", "testing", "playwright"]
  ),
  skill(
    "email-best-practices",
    "resend/email-best-practices",
    2100,
    "Send transactional and marketing emails with deliverability best practices using Resend.",
    ["email", "marketing", "deliverability"]
  ),
  skill(
    "email-sequence",
    "coreyhaines31/marketingskills",
    5900,
    "Design automated email sequences for onboarding, nurture, and conversion campaigns.",
    ["email", "marketing", "automation"]
  ),
  skill(
    "enhance-prompt",
    "google-labs-code/stitch-skills",
    3500,
    "Improve and optimize prompts for better AI model outputs with structured techniques.",
    ["prompt", "ai", "optimization"]
  ),
  skill(
    "error-handling-patterns",
    "wshobson/agents",
    2700,
    "Implement robust error handling with retry logic, circuit breakers, and graceful degradation.",
    ["error-handling", "resilience", "patterns"]
  ),
  skill(
    "executing-plans",
    "obra/superpowers",
    7700,
    "Execute multi-step implementation plans with progress tracking and adaptive adjustments.",
    ["planning", "execution", "workflow"]
  ),
  skill(
    "expo-api-routes",
    "expo/skills",
    4900,
    "Build API routes in Expo Router for server-side functionality in React Native apps.",
    ["expo", "api", "react-native"]
  ),
  skill(
    "expo-cicd-workflows",
    "expo/skills",
    4400,
    "Set up CI/CD pipelines for Expo and React Native apps with automated builds and deployments.",
    ["expo", "ci-cd", "mobile", "devops"]
  ),
  skill(
    "expo-deployment",
    "expo/skills",
    5300,
    "Deploy Expo apps to App Store and Google Play with OTA updates and release management.",
    ["expo", "deployment", "mobile"]
  ),
  skill(
    "expo-dev-client",
    "expo/skills",
    5300,
    "Configure custom Expo dev clients with native module support for local development.",
    ["expo", "dev-client", "mobile"]
  ),
  skill(
    "expo-tailwind-setup",
    "expo/skills",
    5300,
    "Integrate Tailwind CSS with Expo and React Native using NativeWind for consistent styling.",
    ["expo", "tailwind", "react-native"]
  ),
  skill(
    "fastapi-templates",
    "wshobson/agents",
    2800,
    "Scaffold FastAPI applications with structured project templates, middleware, and database setup.",
    ["fastapi", "python", "backend", "api"]
  ),
  skill(
    "find-skills",
    "vercel-labs/skills",
    208400,
    "Discover and search across the entire skills ecosystem. Find the right skill for any task.",
    ["discovery", "search", "ecosystem"]
  ),
  skill(
    "find-skills",
    "vercel-labs/add-skill",
    8700,
    "Alternative skill finder for discovering and adding skills from the ecosystem registry.",
    ["discovery", "search", "registry"]
  ),
  skill(
    "finishing-a-development-branch",
    "obra/superpowers",
    5200,
    "Clean up and finalize development branches with proper commits, tests, and merge preparation.",
    ["git", "workflow", "branch"]
  ),
  skill(
    "firecrawl",
    "firecrawl/cli",
    3000,
    "Crawl and scrape websites at scale with structured data extraction and markdown conversion.",
    ["scraping", "crawling", "data-extraction"]
  ),
  skill(
    "flutter-animations",
    "madteacher/mad-agents-skills",
    5800,
    "Create smooth, performant animations in Flutter with implicit and explicit animation patterns.",
    ["flutter", "animation", "mobile"]
  ),
  skill(
    "flutter-expert",
    "jeffallan/claude-skills",
    2100,
    "Build production Flutter applications following best practices for architecture and performance.",
    ["flutter", "mobile", "dart"]
  ),
  skill(
    "form-cro",
    "coreyhaines31/marketingskills",
    6100,
    "Optimize form conversion rates with UX patterns, validation, and progressive disclosure.",
    ["forms", "cro", "marketing", "ux"]
  ),
  skill(
    "free-tool-strategy",
    "coreyhaines31/marketingskills",
    5600,
    "Build free tools as marketing channels to drive organic traffic and user acquisition.",
    ["marketing", "growth", "tools"]
  ),
  skill(
    "frontend-design",
    "anthropics/skills",
    65600,
    "Design and build polished frontend interfaces following modern web standards and patterns.",
    ["frontend", "design", "ui", "web"]
  ),
  skill(
    "frontend-design",
    "anthropics/claude-code",
    3400,
    "Frontend design principles and patterns optimized for Claude Code agent workflows.",
    ["frontend", "design", "claude"]
  ),
] as const;
