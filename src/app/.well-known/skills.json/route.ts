import { NextResponse } from "next/server";

export function GET(): NextResponse {
  return NextResponse.json(
    {
      name: "skill_scout",
      description:
        "Live discovery API for skills.sh, with search, category filtering, and install command generation.",
      website: "https://skills.sh",
      endpoints: {
        search: "/api/skills",
        docs: "/for-agents",
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
