import { Skill, EcosystemStats } from "../types";
import { skillsAF } from "./skills-a-f";
import { skillsGR } from "./skills-g-r";
import { skillsSZ } from "./skills-s-z";

export const skills: readonly Skill[] = [
  ...skillsAF,
  ...skillsGR,
  ...skillsSZ,
];

export function getEcosystemStats(): EcosystemStats {
  const totalInstalls = skills.reduce((sum, s) => sum + s.installs, 0);
  const categories = [...new Set(skills.map((s) => s.category))].filter(
    (c) => c !== "all"
  );
  const topSkills = [...skills]
    .sort((a, b) => b.installs - a.installs)
    .slice(0, 10)
    .map(({ name, installs, source }) => ({ name, installs, source }));

  return {
    totalSkills: skills.length,
    totalInstalls,
    categories,
    topSkills,
  };
}
