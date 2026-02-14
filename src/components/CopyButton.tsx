"use client";

import { useState, useCallback } from "react";

interface CopyButtonProps {
  readonly text: string;
  readonly label?: string;
}

export function CopyButton({ text, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      throw new Error(`Failed to copy to clipboard: ${error}`);
    }
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 bg-green-primary text-bg-page text-[11px] font-mono font-medium px-3 py-1.5 hover:brightness-110 active:brightness-90 transition-all"
    >
      {copied ? "++ copied" : label ? `$ copy ${label}` : "$ copy"}
    </button>
  );
}
