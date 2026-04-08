import type { Metadata } from "next";
import { Suspense } from "react";
import { EventsClient } from "@/components/events-client";

export const metadata: Metadata = {
  title: "Brazilian Events Australia",
  description: "Upcoming Brazilian community events, festivals, and celebrations across Australia.",
};

export default function EventsPage() {
  return (
    <Suspense>
      <EventsClient />
    </Suspense>
  );
}
