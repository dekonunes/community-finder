import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  getCommunityBySlug,
  getProviderBySlug,
  getProviderSuburbs,
  getProviderSuburbsDisplay,
  providers,
  type Provider,
} from "@/lib/data";
import { getPageAlternates, getPageOpenGraph } from "@/i18n/metadata";
import { isValidLocale, routing } from "@/i18n/routing";
import { getSiteConfig, withBasePath } from "@/lib/site-config.mjs";
import { ProviderDetail } from "@/components/provider-detail";

const schemaTypeByService: Record<string, string> = {
  dentist: "Dentist",
  orthodontist: "Dentist",
};

function isNationalProvider(provider: Provider) {
  return getProviderSuburbs(provider).includes("australia-wide");
}

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

  const category = categoriesT(provider.service as never);
  const suburb = getProviderSuburbsDisplay(provider);
  const scope = isNationalProvider(provider) ? "national" : "local";

  const title = t("metadataTitle", { name: provider.name, category, suburb, scope });
  const description = t("metadataDescription", {
    community: communitiesT(provider.country as never),
    category,
    suburb,
    scope,
    bio: provider.bio,
  });

  return {
    title,
    description,
    alternates: getPageAlternates(locale, `/provider/${slug}`),
    openGraph: getPageOpenGraph(locale, {
      title,
      description,
      pathname: `/provider/${slug}`,
      type: "profile",
    }),
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

  const { siteUrl, basePath } = getSiteConfig(process.env);
  const pageUrl = `${siteUrl}/${locale}/provider/${slug}`;
  const addressRegion = (provider.states ?? [])
    .filter((state) => state !== "all")
    .map((state) => state.toUpperCase())
    .join(" / ");

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": schemaTypeByService[provider.service] ?? "ProfessionalService",
    name: provider.name,
    description: provider.bio,
    url: pageUrl,
    address: {
      "@type": "PostalAddress",
      ...(isNationalProvider(provider)
        ? {}
        : { addressLocality: getProviderSuburbsDisplay(provider) }),
      ...(addressRegion ? { addressRegion } : {}),
      addressCountry: "AU",
    },
  };

  if (provider.photo) {
    jsonLd.image = `${siteUrl}${withBasePath(provider.photo, basePath)}`;
  }

  if (provider.phone) {
    jsonLd.telephone = provider.phone;
  }

  if (provider.email) {
    jsonLd.email = provider.email;
  }

  const sameAs = [provider.website, provider.instagram].filter(Boolean);

  if (sameAs.length > 0) {
    jsonLd.sameAs = sameAs;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProviderDetail provider={provider} community={community} />
    </>
  );
}
