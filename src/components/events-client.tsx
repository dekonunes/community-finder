"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { getUpcomingEvents, communities } from "@/lib/data";
import { EventCard } from "@/components/event-card";

export function EventsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const community = searchParams.get("community") ?? undefined;
  const events = getUpcomingEvents(community);

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Community Events</h1>
      <p className="mb-6 text-zinc-400">Upcoming festivals, meetups, and celebrations in Sydney</p>
      <div className="mb-6">
        <select
          value={community ?? ""}
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
      </div>
      {events.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-zinc-400">No upcoming events found.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {events.map((e) => (<EventCard key={e.slug} event={e} />))}
        </div>
      )}
    </div>
  );
}
