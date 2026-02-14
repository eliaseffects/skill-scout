import { NextResponse } from "next/server";

export function GET(): NextResponse {
  return NextResponse.json(
    {
      name: "skill_scout",
      description:
        "Agent-first discovery API for live skills.sh search, category filtering, and deterministic install commands.",
      website: "https://skillscout.dev",
      endpoints: {
        search: "/api/skills",
        docs: "/for-agents",
        manifest: "/.well-known/skills.json",
      },
      install: {
        requiresOwnerApproval: true,
        commandTemplate: "npx skills add <owner/repo> --skill <skill-id>",
      },
      rateLimit: {
        limit: 120,
        windowSeconds: 60,
        headers: true,
      },
      response: {
        formats: ["json", "text"],
        views: ["all-time", "trending", "hot"],
        categories: [
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
        ],
      },
      cache: {
        publicSeconds: 300,
      },
      examples: [
        "/api/skills?q=react&limit=20",
        "/api/skills?view=trending&limit=20",
        "/api/skills?q=testing&category=testing&format=text",
      ],
      source: "skills.sh",
      protocol: "agent-skills-discovery-v1",
    },
    {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=300",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
