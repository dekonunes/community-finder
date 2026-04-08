"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { categories, suburbs, getAllLanguages } from "@/lib/data";

export function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-3">
      <select value={searchParams.get("service") ?? ""} onChange={(e) => updateFilter("service", e.target.value)} className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white">
        <option value="">All Services</option>
        {categories.map((c) => (<option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>))}
      </select>
      <select value={searchParams.get("language") ?? ""} onChange={(e) => updateFilter("language", e.target.value)} className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white">
        <option value="">All Languages</option>
        {getAllLanguages().map((lang) => (<option key={lang} value={lang} className="capitalize">{lang}</option>))}
      </select>
      <select value={searchParams.get("suburb") ?? ""} onChange={(e) => updateFilter("suburb", e.target.value)} className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white">
        <option value="">All Suburbs</option>
        {suburbs.map((s) => (<option key={s.slug} value={s.slug}>{s.name}</option>))}
      </select>
    </div>
  );
}
