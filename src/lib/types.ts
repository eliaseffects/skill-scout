export interface Skill {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly homepage: string;
  readonly repoUrl: string;
  readonly tags: readonly string[];
  readonly category: Category;
  readonly installCommand: string;
  readonly updatedAt: string;
  readonly source: string;
  readonly badge: "official" | "community" | "verified";
  readonly installs: number;
  readonly owner: string;
}

export type Category =
  | "all"
  | "frontend"
  | "backend"
  | "design"
  | "testing"
  | "marketing"
  | "devops"
  | "mobile"
  | "ai-ml"
  | "docs"
  | "security"
  | "utilities";

export interface SearchState {
  readonly query: string;
  readonly category: Category;
  readonly results: readonly Skill[];
}

export interface SkillApiResponse {
  readonly success: boolean;
  readonly data: readonly Skill[];
  readonly meta: {
    readonly total: number;
    readonly query: string;
    readonly category: string;
    readonly format: "json" | "text";
    readonly view?: "all-time" | "trending" | "hot";
    readonly page?: number;
    readonly hasMore?: boolean;
    readonly sourceTotal?: number;
    readonly source?: "skills.sh" | "local-fallback";
  };
}

export interface EcosystemStats {
  readonly totalSkills: number;
  readonly totalInstalls: number;
  readonly categories: readonly string[];
  readonly topSkills: readonly Pick<Skill, "name" | "installs" | "source">[];
}
