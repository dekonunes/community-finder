import type { CommunityEvent } from "@/lib/data";

export function EventCard({
  event,
  formattedDate,
  moreInfoLabel,
}: {
  event: CommunityEvent;
  formattedDate: string;
  moreInfoLabel: string;
}) {
  return (
    <div className="relative ml-14 transition-transform duration-300 ease-out hover:-translate-y-2">
      <div className="absolute -left-12 top-5 flex h-24 w-24 items-center justify-center rounded-xl bg-zinc-800 text-3xl ring-2 ring-zinc-700 shadow-lg">
        📅
      </div>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 py-5 pr-5 pl-16">
        <div>
          <h3 className="font-semibold">{event.title}</h3>
          <p className="mt-1 text-sm text-zinc-400">{formattedDate}</p>
        </div>
        <p className="mt-2 text-sm text-zinc-300">{event.description}</p>
        <p className="mt-2 text-sm text-zinc-400">📍 {event.location}</p>
        {event.link && (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-blue-400 hover:underline"
          >
            {moreInfoLabel}
          </a>
        )}
      </div>
    </div>
  );
}
