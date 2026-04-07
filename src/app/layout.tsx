import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Community Finder — Find services from your community in Sydney",
    template: "%s | Community Finder",
  },
  description:
    "Find GPs, accountants, lawyers, migration agents, childcare, and restaurants from your cultural community in Sydney, Australia.",
  openGraph: {
    title: "Community Finder",
    description: "Find services from your cultural community in Sydney",
    url: "https://communityfinder.com.au",
    siteName: "Community Finder",
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
