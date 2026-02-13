import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/Header";

const EXTERNAL_PAGES = {
  docs: {
    title: "skills.sh docs",
    url: "https://skills.sh/docs",
  },
  github: {
    title: "github.com/vercel-labs/skills",
    url: "https://github.com/vercel-labs/skills",
  },
  "skills-sh": {
    title: "skills.sh",
    url: "https://skills.sh",
  },
} as const;

type ExternalSlug = keyof typeof EXTERNAL_PAGES;

function isExternalSlug(value: string): value is ExternalSlug {
  return value in EXTERNAL_PAGES;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (!isExternalSlug(slug)) {
    return {
      title: "external page // skill_scout",
    };
  }

  return {
    title: `${EXTERNAL_PAGES[slug].title} // skill_scout`,
  };
}

export default async function ExternalEmbedPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isExternalSlug(slug)) {
    notFound();
  }

  const externalPage = EXTERNAL_PAGES[slug];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 flex flex-col p-6 gap-4">
        <div className="flex items-center justify-between border border-border-primary bg-bg-elevated px-4 py-3">
          <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
            <span className="text-green-primary">{"//"}</span>
            <span>embedded external page</span>
            <span className="text-text-tertiary">|</span>
            <span className="text-text-primary">{externalPage.title}</span>
          </div>
          <a
            href={externalPage.url}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-mono border border-border-primary px-3 py-1.5 text-text-secondary hover:text-text-primary transition-colors"
          >
            open in new tab
          </a>
        </div>

        <div className="flex-1 min-h-[70vh] border border-border-primary overflow-hidden">
          <iframe
            src={externalPage.url}
            title={`Embedded ${externalPage.title}`}
            className="w-full h-full bg-black"
            referrerPolicy="no-referrer"
          />
        </div>

        <p className="text-xs font-mono-body text-text-tertiary">
          Some external sites block iframe embedding. If you see a blank frame,
          use &quot;open in new tab&quot;.
        </p>
      </main>
    </div>
  );
}
