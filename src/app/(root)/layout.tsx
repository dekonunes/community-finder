import type { ReactNode } from "react";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "BrazucaHubz – Redirecting",
};

export default function RedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta httpEquiv="refresh" content="0;url=/pt-BR" />
      </head>
      <body>{children}</body>
    </html>
  );
}
