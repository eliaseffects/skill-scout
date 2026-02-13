"use client";

import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { FilterChips } from "@/components/FilterChips";
import { SkillCard } from "@/components/SkillCard";
import { TerminalPreview } from "@/components/TerminalPreview";
import { Footer } from "@/components/Footer";
import { CATEGORIES } from "@/lib/categories";
import { Category, Skill, SkillApiResponse } from "@/lib/types";

const VALID_CATEGORIES = new Set<string>(
  CATEGORIES.map((category) => category.value)
);

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("all");
  const [results, setResults] = useState<readonly Skill[]>([]);
  const [totalSkills, setTotalSkills] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sourceLabel, setSourceLabel] = useState<"skills.sh" | "local-fallback">(
    "skills.sh"
  );

  const totalSkillsText =
    typeof totalSkills === "number" ? totalSkills.toLocaleString() : "...";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q")?.trim();
    const cat = params.get("cat");
    if (q) setQuery(q);
    if (cat && VALID_CATEGORIES.has(cat)) {
      setCategory(cat as Category);
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category !== "all") params.set("cat", category);
    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState({}, "", newUrl);
  }, [isReady, query, category]);

  useEffect(() => {
    if (!isReady) return;

    const controller = new AbortController();
    const trimmedQuery = query.trim();
    const limit = trimmedQuery.length >= 2 ? 120 : 90;
    const params = new URLSearchParams({
      category,
      limit: String(limit),
      view: "all-time",
    });
    if (trimmedQuery.length > 0) {
      params.set("q", trimmedQuery);
    }

    const debounceMs = trimmedQuery.length >= 2 ? 180 : 0;
    const timerId = window.setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/skills?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Search failed (${response.status})`);
        }
        const payload = (await response.json()) as SkillApiResponse;
        setResults(payload.data);
        setSourceLabel(payload.meta.source ?? "skills.sh");
        setTotalSkills((previous) => {
          if (typeof payload.meta.sourceTotal === "number") {
            return payload.meta.sourceTotal;
          }
          return previous ?? payload.meta.total;
        });
        setError(null);
      } catch (fetchError) {
        if (
          fetchError instanceof Error &&
          fetchError.name === "AbortError"
        ) {
          return;
        }
        setError("Live catalog request failed. Try again in a moment.");
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);

    return () => {
      controller.abort();
      window.clearTimeout(timerId);
    };
  }, [isReady, query, category]);

  const statusText = useMemo(() => {
    if (isLoading) return "syncing";
    if (sourceLabel === "local-fallback") return "fallback";
    return "live";
  }, [isLoading, sourceLabel]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <section className="flex flex-col items-center gap-10 px-16 py-20">
        <div className="flex items-center gap-2 border border-border-primary px-4 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-primary" />
          <span className="text-text-secondary text-xs font-mono">
            {"//"} {totalSkillsText} skills &middot; {statusText} index
          </span>
        </div>

        <div className="flex flex-col items-center gap-4">
          <h1 className="text-text-primary text-5xl font-bold font-mono text-center leading-tight max-w-[900px]">
            find the right skill,
            <br />
            instantly.
          </h1>
          <p className="text-text-secondary text-base font-mono-body text-center leading-relaxed max-w-[700px]">
            search across {totalSkillsText}+ skills from the skills.sh
            ecosystem. type what you want to do, get the install command, ship
            it.
          </p>
        </div>

        <SearchBar query={query} onQueryChange={setQuery} />
      </section>

      <section className="flex flex-col gap-8 px-16 py-12">
        <div className="flex items-center justify-between">
          <span className="text-text-white text-sm font-mono">
            {"//"} showing {results.length} of {totalSkillsText} skills
          </span>
          <span className="text-green-primary text-xs font-mono">
            {query ? "$ sort --relevance" : "$ sort --installs"}
          </span>
        </div>

        <FilterChips
          activeCategory={category}
          onCategoryChange={setCategory}
        />

        {isLoading && results.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20">
            <span className="text-text-secondary text-sm font-mono">
              {"//"} loading live skills catalog...
            </span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-4 py-20">
            <span className="text-text-secondary text-sm font-mono">
              {"//"} {error}
            </span>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-20">
            <span className="text-text-secondary text-sm font-mono">
              {"//"} no skills found for &quot;{query}&quot;
            </span>
            <span className="text-text-tertiary text-xs font-mono-body">
              try: react, design, testing, docker, marketing, security
            </span>
          </div>
        )}
      </section>

      <TerminalPreview />
      <Footer totalSkills={totalSkills} />
    </div>
  );
}
