import type { Metadata } from "next";
import { Suspense } from "react";
import { EventsClient } from "@/components/events-client";

export const metadata: Metadata = {
  title: "Community Events Sydney | Community Finder",
  description: "Upcoming multicultural community events, festivals, and celebrations in Sydney.",
};

export default function EventsPage() {
  return (
    <Suspense>
      <EventsClient />
    </Suspense>
  );
}
