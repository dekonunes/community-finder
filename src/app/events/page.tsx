import type { Metadata } from "next";
import { getUpcomingEvents } from "@/lib/data";
import { EventCard } from "@/components/event-card";
import { EventCommunityFilter } from "@/components/event-community-filter";

export const metadata: Metadata = {
  title: "Community Events Sydney | Community Finder",
  description: "Upcoming multicultural community events, festivals, and celebrations in Sydney.",
};

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ community?: string }>;
}) {
  const params = await searchParams;
  const events = getUpcomingEvents(params.community);

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Community Events</h1>
      <p className="mb-6 text-zinc-400">Upcoming festivals, meetups, and celebrations in Sydney</p>
      <div className="mb-6">
        <EventCommunityFilter current={params.community} />
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
