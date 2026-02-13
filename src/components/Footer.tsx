"use client";

import Link from "next/link";

interface FooterProps {
  readonly totalSkills: number | null;
}

export function Footer({ totalSkills }: FooterProps) {
  const skillsText =
    typeof totalSkills === "number" ? totalSkills.toLocaleString() : "...";

  return (
    <footer className="flex flex-col gap-8 w-full px-16 py-12 border-t border-border-primary">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-green-primary text-base font-bold font-mono">
              {">"}
            </span>
            <span className="text-text-primary text-sm font-medium font-mono">
              skill_scout
            </span>
          </div>
          <span className="text-text-tertiary text-xs font-mono-body">
            discover skills you didn&apos;t know existed.
          </span>
        </div>

        <div className="flex gap-16">
          <div className="flex flex-col gap-3">
            <span className="text-text-white text-xs font-mono">
              {"//"} product
            </span>
            <Link
              href="/"
              className="text-text-secondary text-xs font-mono hover:text-text-primary transition-colors"
            >
              explore
            </Link>
            <Link
              href="/for-agents"
              className="text-text-secondary text-xs font-mono hover:text-text-primary transition-colors"
            >
              for_agents
            </Link>
            <a
              href="https://skills.sh/docs"
              className="text-text-secondary text-xs font-mono hover:text-text-primary transition-colors"
            >
              docs
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-text-white text-xs font-mono">
              {"//"} community
            </span>
            <a
              href="https://github.com/vercel-labs/skills"
              className="text-text-secondary text-xs font-mono hover:text-text-primary transition-colors"
            >
              github
            </a>
            <a
              href="https://skills.sh"
              className="text-text-secondary text-xs font-mono hover:text-text-primary transition-colors"
            >
              skills.sh
            </a>
            <Link
              href="/api/skills"
              className="text-text-secondary text-xs font-mono hover:text-text-primary transition-colors"
            >
              api
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-border-primary" />

      <div className="flex justify-between items-center">
        <span className="text-text-tertiary text-[11px] font-mono">
          2026 skill_scout. open source under mit.
        </span>
        <span className="text-text-tertiary text-[11px] font-mono">
          index v3.0.0 {"//"} {skillsText} skills indexed
        </span>
      </div>
    </footer>
  );
}
