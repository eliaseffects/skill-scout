"use client";

import { Category } from "@/lib/types";
import { CATEGORIES } from "@/lib/categories";

interface FilterChipsProps {
  readonly activeCategory: Category;
  readonly onCategoryChange: (category: Category) => void;
}

export function FilterChips({
  activeCategory,
  onCategoryChange,
}: FilterChipsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map(({ value, label }) => {
        const isActive = activeCategory === value;
        return (
          <button
            key={value}
            onClick={() => onCategoryChange(value)}
            className={`px-3.5 py-1.5 text-xs font-mono transition-colors whitespace-nowrap shrink-0 ${
              isActive
                ? "bg-green-primary text-bg-page font-medium"
                : "border border-border-primary text-text-secondary hover:text-text-primary hover:border-text-secondary"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
