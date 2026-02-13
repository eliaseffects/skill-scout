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
    "Instructions for AI agents to programmatically discover and install skills from the skills.sh ecosystem.",
};

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

      <main className="flex flex-col gap-12 px-16 py-16 w-full max-w-[900px] mx-auto">
        <section className="flex flex-col gap-4">
          <h1 className="text-text-primary text-3xl font-bold font-mono">
            agent discovery api
          </h1>
          <p className="text-text-secondary text-sm font-mono-body leading-relaxed">
            skill scout indexes{" "}
            {stats.totalSkills > 0 ? stats.totalSkills.toLocaleString() : "..."}{" "}
            skills from the live skills.sh ecosystem. agents can query this api
            to find and recommend skills to their users.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-text-primary text-lg font-bold font-mono">
            {"//"} quick start
          </h2>
          <div className="flex flex-col gap-3 p-6 bg-bg-elevated border border-border-primary">
            <div className="flex items-center gap-2">
              <span className="text-green-primary text-sm font-bold font-mono">
                1.
              </span>
              <span className="text-text-secondary text-sm font-mono-body">
                discover available capabilities:
              </span>
            </div>
            <code className="text-text-primary text-sm font-mono pl-6">
              GET /.well-known/skills.json
            </code>

            <div className="flex items-center gap-2 mt-4">
              <span className="text-green-primary text-sm font-bold font-mono">
                2.
              </span>
              <span className="text-text-secondary text-sm font-mono-body">
                search for skills matching a task:
              </span>
            </div>
            <code className="text-text-primary text-sm font-mono pl-6">
              GET /api/skills?q=react+testing&amp;category=testing
            </code>

            <div className="flex items-center gap-2 mt-4">
              <span className="text-green-primary text-sm font-bold font-mono">
                3.
              </span>
              <span className="text-text-secondary text-sm font-mono-body">
                install the skill for your user:
              </span>
            </div>
            <code className="text-text-primary text-sm font-mono pl-6">
              npx skills add &lt;owner/repo&gt; --skill &lt;skill-id&gt;
            </code>
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
