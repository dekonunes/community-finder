import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  getCommunityBySlug,
  getProviderBySlug,
  getProviderSuburbsDisplay,
  providers,
} from "@/lib/data";
import { getPageAlternates } from "@/i18n/metadata";
import { isValidLocale, routing } from "@/i18n/routing";
import { ProviderDetail } from "@/components/provider-detail";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    providers.map((provider) => ({ locale, slug: provider.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const provider = getProviderBySlug(slug);

  if (!provider) {
    return {};
  }

  const communitiesT = await getTranslations({ locale, namespace: "communities" });
  const categoriesT = await getTranslations({ locale, namespace: "categories" });
  const t = await getTranslations({ locale, namespace: "provider" });

  return {
    title: `${provider.name} — ${categoriesT(provider.service as never)}`,
    description: t("metadataDescription", {
      community: communitiesT(provider.country as never),
      category: categoriesT(provider.service as never).toLowerCase(),
      suburb: getProviderSuburbsDisplay(provider),
      bio: provider.bio,
    }),
    alternates: getPageAlternates(locale, `/provider/${slug}`),
  };
}

export default async function ProviderPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const provider = getProviderBySlug(slug);

  if (!provider) {
    notFound();
  }

  const community = getCommunityBySlug(provider.country);

  return <ProviderDetail provider={provider} community={community} />;
}
