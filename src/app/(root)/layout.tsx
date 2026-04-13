import type { ReactNode } from "react";
import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/site-config.mjs";
import "../globals.css";

const { siteUrl } = getSiteConfig(process.env);
const CANONICAL_URL = `${siteUrl}/pt-BR`;

export const metadata: Metadata = {
  title: "BrazucaHubz – Redirecting",
  robots: { index: false, follow: true },
  alternates: { canonical: CANONICAL_URL },
};

export default function RedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <meta httpEquiv="refresh" content={`0;url=${CANONICAL_URL}`} />
      </head>
      <body>{children}</body>
    </html>
  );
}
