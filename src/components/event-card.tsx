import { getCommunityBySlug, type CommunityEvent } from "@/lib/data";

export function EventCard({
  event,
  formattedDate,
  moreInfoLabel,
}: {
  event: CommunityEvent;
  formattedDate: string;
  moreInfoLabel: string;
}) {
  const community = getCommunityBySlug(event.community);

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold">{event.title}</h3>
          <p className="mt-1 text-sm text-zinc-400">{formattedDate}</p>
        </div>
        {community && <span className="text-xl">{community.flag}</span>}
      </div>
      <p className="mt-2 text-sm text-zinc-300">{event.description}</p>
      <p className="mt-2 text-sm text-zinc-400">📍 {event.location}</p>
      {event.link && (
        <a href={event.link} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-blue-400 hover:underline">
          {moreInfoLabel}
        </a>
      )}
    </div>
  );
}
