import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { EventsClient } from "@/components/events-client";
import { getPageAlternates, getPageOpenGraph } from "@/i18n/metadata";
import { isValidLocale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "events" });

  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
    alternates: getPageAlternates(locale, "/events"),
    openGraph: getPageOpenGraph(locale, {
      title: t("metadataTitle"),
      description: t("metadataDescription"),
      pathname: "/events",
    }),
  };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <Suspense>
      <EventsClient />
    </Suspense>
  );
}
