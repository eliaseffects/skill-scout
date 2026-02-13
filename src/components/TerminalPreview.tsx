"use client";

export function TerminalPreview() {
  return (
    <section className="flex flex-col items-center gap-8 w-full px-16 py-16 border-t border-border-primary">
      <span className="text-text-white text-sm font-mono">
        {"//"} one command to install any skill
      </span>

      <div className="flex flex-col gap-3 w-[700px] max-w-full p-6 bg-bg-elevated border border-border-primary">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
          <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
        </div>

        <div className="w-full h-px bg-border-primary" />

        <div className="flex items-center gap-2">
          <span className="text-green-primary text-sm font-bold font-mono">
            $
          </span>
          <span className="text-text-primary text-sm font-mono">
            npx skills add vercel-labs/agent-skills
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-green-primary text-sm font-bold font-mono">
            ++
          </span>
          <span className="text-text-secondary text-sm font-mono-body">
            skill installed successfully. ready to use.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-green-primary text-sm font-bold font-mono">
            $
          </span>
          <span className="w-2 h-[18px] bg-green-primary animate-blink" />
        </div>
      </div>
    </section>
  );
}
