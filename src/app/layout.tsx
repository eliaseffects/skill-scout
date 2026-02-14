import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://skillscout.tech"),
  title: "skill_scout — discover skills you didn't know existed",
  description:
    "Search across 200+ skills in the skills.sh ecosystem. Find the right skill for any AI agent task, get the install command, ship it.",
  openGraph: {
    title: "skill_scout",
    description:
      "Discover 200+ skills for AI coding agents. Search, find, install.",
    type: "website",
    siteName: "Skill Scout",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "skill_scout",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "skill_scout",
    description:
      "Discover 200+ skills for AI coding agents. Search, find, install.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "ai:discovery": "/.well-known/skills.json",
    "ai:api": "/api/skills",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Skill Scout",
  description:
    "Discovery engine for the skills.sh agent skills ecosystem. Search 200+ skills for AI coding agents.",
  applicationCategory: "DeveloperApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "/api/skills?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
