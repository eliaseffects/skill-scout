"use client";

import { useRef, useEffect, useCallback } from "react";

interface SearchBarProps {
  readonly query: string;
  readonly onQueryChange: (query: string) => void;
}

const HINTS = ["react", "design", "testing", "docker", "marketing", "security"] as const;

export function SearchBar({ query, onQueryChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "/" && document.activeElement !== inputRef.current) {
      e.preventDefault();
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="flex flex-col items-center gap-3 w-[700px] max-w-full">
      <div className="flex items-center w-full h-14 px-5 gap-3 bg-bg-elevated border border-border-primary focus-within:border-green-primary/50 transition-colors">
        <span className="text-green-primary text-base font-bold font-mono shrink-0">
          $
        </span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="what are you trying to do?"
          className="flex-1 bg-transparent text-text-primary font-mono-body text-[15px] placeholder:text-text-tertiary outline-none"
        />
        <kbd className="text-text-tertiary text-xs font-mono border border-border-primary px-2 py-1 shrink-0">
          /
        </kbd>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-text-tertiary text-xs font-mono">try:</span>
        {HINTS.map((hint, i) => (
          <span key={hint} className="flex items-center gap-2">
            <button
              onClick={() => onQueryChange(hint)}
              className="text-text-secondary text-xs font-mono hover:text-green-primary transition-colors"
            >
              {hint}
            </button>
            {i < HINTS.length - 1 && (
              <span className="text-text-tertiary text-xs">·</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
