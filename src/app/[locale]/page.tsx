import { getTranslations, setRequestLocale } from "next-intl/server";
import { providers, products, getUpcomingEvents } from "@/lib/data";
import { getPathname, Link } from "@/i18n/navigation";
import { getPageAlternates, getPageOpenGraph } from "@/i18n/metadata";
import { isValidLocale } from "@/i18n/routing";
import { getSiteConfig, withBasePath } from "@/lib/site-config.mjs";
import Image from "next/image";
import { ProviderCard } from "@/components/provider-card";
import { ProductCard } from "@/components/product-card";
import { EventCard } from "@/components/event-card";
import { HomeSearchForm } from "@/components/home-search-form";
import { HomeTabs } from "@/components/home-tabs";
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
  const categoriesT = await getTranslations({
    locale,
    namespace: "categories",
  });
  const languagesT = await getTranslations({ locale, namespace: "languages" });
  const commonT = await getTranslations({ locale, namespace: "common" });
  const featuredProviders = providers.slice(0, 6);
  const featuredProducts = products.slice(0, 6);
  const upcomingEvents = getUpcomingEvents().slice(0, 6);

  const productsT = await getTranslations({ locale, namespace: "products" });
  const productCategoriesT = await getTranslations({
    locale,
    namespace: "productCategories",
  });
  const eventsT = await getTranslations({ locale, namespace: "events" });

  const searchPath = withBasePath(
    getPathname({ href: "/search", locale }),
    basePath,
  );

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
        <div className="relative mb-4 mx-auto h-[116px] w-[128px]">
          <Image
            src="/flag.png"
            alt="Brazilian flag"
            fill
            sizes="128px"
            priority
          />
        </div>
        <h1 className="text-3xl font-bold sm:text-4xl">{t("title")}</h1>
        <p className="mt-2 text-zinc-400">{t("subtitle")}</p>
      </section>

      <section className="mx-auto max-w-2xl">
        <HomeSearchForm searchPath={searchPath} />
      </section>

      <HomeTabs
        tabProviders={t("tabProviders")}
        tabProducts={t("tabProducts")}
        tabEvents={t("tabEvents")}
        providersContent={
          <>
            <h2 className="mb-4 text-base font-semibold">{t("featured")}</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProviders.map((provider) => (
                <ProviderCard
                  key={provider.slug}
                  provider={provider}
                  categoryLabel={categoriesT(provider.service as never)}
                  languageLabels={provider.languages.map((language) =>
                    languagesT(language as never),
                  )}
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
          </>
        }
        productsContent={
          <>
            <h2 className="mb-4 text-base font-semibold">
              {t("featuredProducts")}
            </h2>
            {featuredProducts.length > 0 ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {featuredProducts.map((product) => (
                  <ProductCard
                    key={product.slug}
                    product={product}
                    categoryLabel={productCategoriesT(
                      product.category as never,
                    )}
                    viewProductLabel={productsT("viewProduct")}
                  />
                ))}
              </div>
            ) : (
              <p className="text-zinc-400">{productsT("empty")}</p>
            )}
            <div className="mt-6 text-center">
              <Link href="/products" className="text-blue-400 hover:underline">
                {t("browseAllProducts")}
              </Link>
            </div>
          </>
        }
        eventsContent={
          <>
            <h2 className="mb-4 text-base font-semibold">
              {t("featuredEvents")}
            </h2>
            {upcomingEvents.length > 0 ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((event) => (
                  <EventCard
                    key={event.slug}
                    event={event}
                    formattedDate={new Date(event.date).toLocaleDateString(
                      locale,
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                    moreInfoLabel={commonT("moreInfo")}
                  />
                ))}
              </div>
            ) : (
              <p className="text-zinc-400">{eventsT("empty")}</p>
            )}
            <div className="mt-6 text-center">
              <Link href="/events" className="text-blue-400 hover:underline">
                {t("browseAllEvents")}
              </Link>
            </div>
          </>
        }
      />
    </div>
  );
}
