"use client";

import { useRouter } from "next/navigation";
import { communities } from "@/lib/data";

export function EventCommunityFilter({ current }: { current?: string }) {
  const router = useRouter();

  return (
    <select
      value={current ?? ""}
      onChange={(e) => {
        const val = e.target.value;
        router.push(val ? `/events?community=${val}` : "/events");
      }}
      className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white"
    >
      <option value="">All Communities</option>
      {communities.map((c) => (
        <option key={c.slug} value={c.slug}>{c.flag} {c.name}</option>
      ))}
    </select>
  );
}
