import { providers } from "@/lib/data";
import { ProviderCard } from "@/components/provider-card";
import { SearchFilters } from "@/components/search-filters";
import Link from "next/link";
import { Suspense } from "react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; country?: string; language?: string; suburb?: string }>;
}) {
  const params = await searchParams;
  let filtered = providers;

  if (params.service) filtered = filtered.filter((p) => p.service === params.service);
  if (params.country) filtered = filtered.filter((p) => p.country === params.country);
  if (params.language) filtered = filtered.filter((p) => p.languages.includes(params.language!));
  if (params.suburb) filtered = filtered.filter((p) => p.suburb === params.suburb);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Search Providers</h1>
      <Suspense fallback={null}>
        <SearchFilters />
      </Suspense>
      <div className="mt-6">
        <p className="mb-4 text-sm text-zinc-400">{filtered.length} provider{filtered.length !== 1 ? "s" : ""} found</p>
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-zinc-400">No providers found matching your filters.</p>
            <p className="mt-2 text-sm text-zinc-500">Try broadening your search or browse all providers.</p>
            <Link href="/search" className="mt-4 inline-block text-blue-400 hover:underline">Clear all filters</Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((p) => (<ProviderCard key={p.slug} provider={p} />))}
          </div>
        )}
      </div>
    </div>
  );
}
