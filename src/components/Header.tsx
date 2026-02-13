"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="flex items-center justify-between w-full h-16 px-16 border-b border-border-primary">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-green-primary text-xl font-bold font-mono">
          {">"}
        </span>
        <span className="text-text-primary text-base font-medium font-mono">
          skill_scout
        </span>
      </Link>
      <nav className="flex items-center gap-8">
        <Link
          href="/"
          className="text-text-primary text-[13px] font-mono hover:text-green-primary transition-colors"
        >
          explore
        </Link>
        <Link
          href="/for-agents"
          className="text-text-secondary text-[13px] font-mono hover:text-text-primary transition-colors"
        >
          for_agents
        </Link>
        <a
          href="https://skills.sh"
          target="_blank"
          rel="noreferrer"
          className="text-text-primary text-xs font-mono border border-border-primary px-3 py-1.5 hover:border-text-secondary transition-colors"
        >
          skills.sh
        </a>
      </nav>
    </header>
  );
}
