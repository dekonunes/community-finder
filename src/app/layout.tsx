import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Brazuca Hubz — Find services from your community in Australia",
    template: "%s | Brazuca Hubz",
  },
  description:
    "Find GPs, accountants, lawyers, migration agents, childcare, and restaurants from your cultural community across Australia.",
  openGraph: {
    title: "Brazuca Hubz",
    description: "Find services from your cultural community across Australia",
    url: "https://dekonunes.github.io/community-finder",
    siteName: "Brazuca Hubz",
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans bg-zinc-950 text-white antialiased`}>
        <Nav />
        <main className="mx-auto max-w-7xl px-2 py-8 sm:px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
