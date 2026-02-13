import Fuse from "fuse.js";
import { Skill, Category } from "./types";
import { skills } from "./skills";

const fuse = new Fuse([...skills], {
  keys: [
    { name: "name", weight: 0.35 },
    { name: "description", weight: 0.25 },
    { name: "tags", weight: 0.2 },
    { name: "category", weight: 0.1 },
    { name: "owner", weight: 0.1 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
});

export function searchSkills(
  query: string,
  category: Category
): readonly Skill[] {
  const filtered =
    category === "all"
      ? skills
      : skills.filter((s) => s.category === category);

  if (!query.trim()) {
    return [...filtered].sort((a, b) => b.installs - a.installs);
  }

  const results = fuse.search(query);

  if (category === "all") {
    return results.map((r) => r.item);
  }

  return results
    .filter((r) => r.item.category === category)
    .map((r) => r.item);
}

export function getSkillCount(): number {
  return skills.length;
}
