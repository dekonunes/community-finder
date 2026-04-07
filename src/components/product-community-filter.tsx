"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { communities, productCategories } from "@/lib/data";

export function ProductCommunityFilter({
  currentCommunity,
  currentCategory,
}: {
  currentCommunity?: string;
  currentCategory?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/products?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={currentCommunity ?? ""}
        onChange={(e) => update("community", e.target.value)}
        className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-200"
      >
        <option value="">All Communities</option>
        {communities.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.flag} {c.name}
          </option>
        ))}
      </select>
      <select
        value={currentCategory ?? ""}
        onChange={(e) => update("category", e.target.value)}
        className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-200"
      >
        <option value="">All Categories</option>
        {productCategories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.icon} {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
