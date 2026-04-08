"use client";

import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { getUpcomingEvents } from "@/lib/data";
import { EventCard } from "@/components/event-card";
import { EventCommunityFilter } from "@/components/event-community-filter";

export function EventsClient() {
  const locale = useLocale();
  const t = useTranslations("events");
  const commonT = useTranslations("common");
  const searchParams = useSearchParams();
  const community = searchParams.get("community") ?? undefined;
  const events = getUpcomingEvents(community);

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">{t("title")}</h1>
      <p className="mb-6 text-zinc-400">{t("subtitle")}</p>
      <div className="mb-6">
        <EventCommunityFilter current={community} />
      </div>
      {events.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-zinc-400">{t("empty")}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {events.map((event) => (
            <EventCard
              key={event.slug}
              event={event}
              formattedDate={new Intl.DateTimeFormat(locale, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }).format(new Date(event.date + "T00:00:00"))}
              moreInfoLabel={commonT("moreInfo")}
            />
          ))}
        </div>
      )}
    </div>
  );
}
