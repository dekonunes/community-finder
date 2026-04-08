import Link from "next/link";
import { categories, providers } from "@/lib/data";
import { ProviderCard } from "@/components/provider-card";
import { getSiteConfig, withBasePath } from "@/lib/site-config.mjs";

const { basePath } = getSiteConfig(process.env);

export default function HomePage() {
  const featured = providers.slice(0, 6);

  return (
    <div>
      <section className="py-12 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">🇧🇷 Brazilian services in Australia</h1>
        <p className="mt-2 text-zinc-400">
          Connect with Brazilian professionals across Australia
        </p>
      </section>

      <section className="mx-auto max-w-2xl">
        <form action={withBasePath("/search", basePath)} className="flex gap-2">
          <select name="service" defaultValue="" className="flex-1 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white">
            <option value="">All Services</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>
            ))}
          </select>
          <button type="submit" className="rounded-md bg-blue-600 px-6 py-2 text-sm font-medium hover:bg-blue-500">
            Search
          </button>
        </form>
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold">Featured Providers</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProviderCard key={p.slug} provider={p} />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/all" className="text-blue-400 hover:underline">
            Browse all providers →
          </Link>
        </div>
      </section>
    </div>
  );
}
