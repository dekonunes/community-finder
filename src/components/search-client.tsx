"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { providers, getProviderSuburbs } from "@/lib/data";
import { ProviderCard } from "@/components/provider-card";
import { SearchFilters } from "@/components/search-filters";

export function SearchClient() {
  const searchParams = useSearchParams();
  let filtered = providers;

  const service = searchParams.get("service");
  const country = searchParams.get("country");
  const language = searchParams.get("language");
  const suburb = searchParams.get("suburb");

  if (service) filtered = filtered.filter((p) => p.service === service);
  if (country) filtered = filtered.filter((p) => p.country === country);
  if (language) filtered = filtered.filter((p) => p.languages.includes(language));
  if (suburb) filtered = filtered.filter((p) => getProviderSuburbs(p).includes(suburb));

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Search Providers</h1>
      <SearchFilters />
      <div className="mt-6">
        <p className="mb-4 text-sm text-zinc-400">{filtered.length} provider{filtered.length !== 1 ? "s" : ""} found</p>
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-zinc-400">No providers found matching your filters.</p>
            <p className="mt-2 text-sm text-zinc-500">Try broadening your search or browse all providers.</p>
            <Link href="/search" className="mt-4 inline-block text-blue-400 hover:underline">Clear all filters</Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (<ProviderCard key={p.slug} provider={p} />))}
          </div>
        )}
      </div>
    </div>
  );
}
