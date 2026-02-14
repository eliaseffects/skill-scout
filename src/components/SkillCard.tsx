"use client";

import { Skill } from "@/lib/types";
import { CopyButton } from "./CopyButton";
import { formatInstalls } from "@/lib/format";

interface SkillCardProps {
  readonly skill: Skill;
}

const BADGE_STYLES = {
  official: {
    bg: "bg-green-muted",
    text: "text-green-primary",
    label: "[official]",
  },
  community: {
    bg: "bg-cyan-muted",
    text: "text-cyan-primary",
    label: "[community]",
  },
  verified: {
    bg: "bg-amber-muted",
    text: "text-amber-primary",
    label: "[verified]",
  },
} as const;

export function SkillCard({ skill }: SkillCardProps) {
  const badge = BADGE_STYLES[skill.badge];
  const isOpenclaw = skill.platforms.includes("openclaw");
  const primaryCommand = isOpenclaw
    ? skill.openclawInstallCommand
    : skill.installCommand;
  const primaryLabel = isOpenclaw ? "openclaw" : "npx";

  return (
    <div className="flex flex-col gap-4 p-6 bg-bg-elevated border border-border-primary hover:border-text-secondary/30 transition-colors animate-fade-in">
      <div className="flex items-center justify-between">
        <span className="text-text-primary text-sm font-mono font-medium">
          {skill.name}/
        </span>
        <span
          className={`${badge.bg} ${badge.text} text-[11px] font-mono px-2 py-1`}
        >
          {badge.label}
        </span>
      </div>

      <p className="text-text-secondary text-[13px] font-mono-body leading-relaxed">
        {skill.description}
      </p>

      <div className="flex items-center gap-3">
        <span className="text-green-primary text-[11px] font-mono font-medium">
          {formatInstalls(skill.installs)} installs
        </span>
        <span className="text-text-tertiary text-[11px] font-mono">
          {typeof skill.successRate === "number"
            ? `${Math.round(skill.successRate * 100)}% success`
            : "success: unknown"}
        </span>
        <div className="flex items-center gap-1.5">
          {skill.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-text-tertiary text-[11px] font-mono border border-border-primary px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
          {skill.platforms.map((platform) => (
            <span
              key={platform}
              className="text-text-tertiary text-[11px] font-mono border border-border-primary px-2 py-0.5"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-text-tertiary text-[11px] font-mono">
            {skill.source}
          </span>
          <span className="text-text-tertiary text-[10px] font-mono">
            {skill.installCommand}
          </span>
        </div>
        <CopyButton text={primaryCommand} label={primaryLabel} />
      </div>
    </div>
  );
}
