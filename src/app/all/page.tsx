import type { Metadata } from "next";
import { categories, providers, getCategoryBySlug } from "@/lib/data";
import { ProviderCard } from "@/components/provider-card";

export const metadata: Metadata = {
  title: "All Providers — Brazilian Services in Australia",
  description: "Browse all Brazilian service providers across Australia, organised by category.",
};

export default function AllProvidersPage() {
  const grouped = providers.reduce<Record<string, typeof providers>>((acc, p) => {
    if (!acc[p.service]) acc[p.service] = [];
    acc[p.service].push(p);
    return acc;
  }, {});

  const orderedCategories = categories.filter((c) => grouped[c.slug]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">All Providers</h1>
        <p className="mt-2 text-zinc-400">
          Browse all Brazilian service providers across Australia
        </p>
      </div>

      {orderedCategories.map((category) => (
        <section key={category.slug} className="mb-10">
          <h2 className="mb-4 text-lg font-semibold">
            {category.icon} {category.name}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {grouped[category.slug].map((p) => (
              <ProviderCard key={p.slug} provider={p} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
