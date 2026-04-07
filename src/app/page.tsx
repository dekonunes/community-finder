import Link from "next/link";
import { categories, communities, providers } from "@/lib/data";
import { ProviderCard } from "@/components/provider-card";
import { CommunityPill } from "@/components/community-pill";

export default function HomePage() {
  const featured = providers.slice(0, 6);

  return (
    <div>
      <section className="py-12 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Services from your community</h1>
        <p className="mt-2 text-zinc-400">
          Connect with professionals who share your culture and language in Sydney
        </p>
      </section>

      <section className="mx-auto max-w-2xl">
        <form action="/search" className="flex gap-2">
          <select name="service" defaultValue="" className="flex-1 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white">
            <option value="">All Services</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>
            ))}
          </select>
          <select name="country" defaultValue="" className="flex-1 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white">
            <option value="">All Communities</option>
            {communities.map((c) => (
              <option key={c.slug} value={c.slug}>{c.flag} {c.name}</option>
            ))}
          </select>
          <button type="submit" className="rounded-md bg-blue-600 px-6 py-2 text-sm font-medium hover:bg-blue-500">
            Search
          </button>
        </form>
      </section>

      <section className="mt-8 flex flex-wrap justify-center gap-2">
        {communities.map((c) => (
          <CommunityPill key={c.slug} community={c} />
        ))}
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold">Featured Providers</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProviderCard key={p.slug} provider={p} />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/search" className="text-blue-400 hover:underline">
            Browse all providers →
          </Link>
        </div>
      </section>
    </div>
  );
}
