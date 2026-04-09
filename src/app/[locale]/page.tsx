import { getTranslations, setRequestLocale } from "next-intl/server";
import { providers } from "@/lib/data";
import { getPathname, Link } from "@/i18n/navigation";
import { getPageAlternates, getPageOpenGraph } from "@/i18n/metadata";
import { isValidLocale } from "@/i18n/routing";
import { getSiteConfig, withBasePath } from "@/lib/site-config.mjs";
import Image from "next/image";
import { ProviderCard } from "@/components/provider-card";
import { HomeSearchForm } from "@/components/home-search-form";
import { notFound } from "next/navigation";

const { basePath } = getSiteConfig(process.env);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: `${t("title")} | Brazuca Hubz`,
    description: t("subtitle"),
    alternates: getPageAlternates(locale),
    openGraph: getPageOpenGraph(locale, {
      title: t("title"),
      description: t("subtitle"),
    }),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });
  const categoriesT = await getTranslations({ locale, namespace: "categories" });
  const languagesT = await getTranslations({ locale, namespace: "languages" });
  const commonT = await getTranslations({ locale, namespace: "common" });
  const featured = providers.slice(0, 6);
  const searchPath = withBasePath(getPathname({ href: "/search", locale }), basePath);

  const { siteUrl } = getSiteConfig(process.env);
  const pageUrl = `${siteUrl}/${locale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Brazuca Hubz",
        url: siteUrl,
        description: t("subtitle"),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "Brazuca Hubz",
        url: pageUrl,
        publisher: { "@id": `${siteUrl}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/${locale}/search?q={search_term}`,
          },
          "query-input": "required name=search_term",
        },
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-4 text-center">
        <div className="mb-4 flex justify-center">
          <Image src="/flag.png" alt="Brazilian flag" width={128} height={90} priority />
        </div>
        <h1 className="text-3xl font-bold sm:text-4xl">{t("title")}</h1>
        <p className="mt-2 text-zinc-400">{t("subtitle")}</p>
      </section>

      <section className="mx-auto max-w-2xl">
        <HomeSearchForm searchPath={searchPath} />
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold">{t("featured")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((provider) => (
            <ProviderCard
              key={provider.slug}
              provider={provider}
              categoryLabel={categoriesT(provider.service as never)}
              languageLabels={provider.languages.map((language) => languagesT(language as never))}
              websiteLabel={commonT("website")}
              instagramLabel={commonT("instagram")}
            />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/all" className="text-blue-400 hover:underline">
            {t("browseAll")}
          </Link>
        </div>
      </section>
    </div>
  );
}
