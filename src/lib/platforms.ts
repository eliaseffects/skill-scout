import { Platform } from "./types";

export const PLATFORMS: readonly { value: Platform; label: string }[] = [
  { value: "all", label: "all" },
  { value: "openclaw", label: "openclaw" },
  { value: "claude-code", label: "claude-code" },
];

export function inferPlatforms(
  name: string,
  source: string,
  tags: readonly string[]
): Platform[] {
  const haystack = `${name} ${source} ${tags.join(" ")}`.toLowerCase();
  const platforms = new Set<Platform>();

  if (haystack.includes("openclaw")) {
    platforms.add("openclaw");
  }

  if (haystack.includes("claude")) {
    platforms.add("claude-code");
  }

  if (platforms.size === 0) {
    platforms.add("openclaw");
  }

  return Array.from(platforms);
}
