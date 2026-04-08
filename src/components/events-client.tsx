"use client";

import { useSearchParams } from "next/navigation";
import { getUpcomingEvents } from "@/lib/data";
import { EventCard } from "@/components/event-card";

export function EventsClient() {
  const searchParams = useSearchParams();
  const community = searchParams.get("community") ?? undefined;
  const events = getUpcomingEvents(community);

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Brazilian Events</h1>
      <p className="mb-6 text-zinc-400">Upcoming festivals, meetups, and celebrations for Brazilians across Australia</p>
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
