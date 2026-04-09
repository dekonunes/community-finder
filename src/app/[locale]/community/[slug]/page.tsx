import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  communities,
  getCategoryBySlug,
  getCommunityBySlug,
  getProvidersByCommunity,
  getUpcomingEvents,
  getProductsByCommunity,
  parentCategories,
  getCategoriesByParent,
} from "@/lib/data";
import { EventCard } from "@/components/event-card";
import { ProductCard } from "@/components/product-card";
import { ProviderCard } from "@/components/provider-card";
import { getPageAlternates, getPageOpenGraph } from "@/i18n/metadata";
import { Link } from "@/i18n/navigation";
import { isValidLocale, routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    communities.map((community) => ({ locale, slug: community.slug })),
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

  const community = getCommunityBySlug(slug);

  if (!community) {
    return {};
  }

  const communitiesT = await getTranslations({ locale, namespace: "communities" });
  const t = await getTranslations({ locale, namespace: "community" });
  const communityName = communitiesT(slug as never);

  return {
    title: t("metadataTitle", { name: communityName }),
    description: t("metadataDescription", { name: communityName }),
    alternates: getPageAlternates(locale, `/community/${slug}`),
    openGraph: getPageOpenGraph(locale, {
      title: t("metadataTitle", { name: communityName }),
      description: t("metadataDescription", { name: communityName }),
      pathname: `/community/${slug}`,
    }),
  };
}

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const community = getCommunityBySlug(slug);

  if (!community) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "community" });
  const communitiesT = await getTranslations({ locale, namespace: "communities" });
  const categoriesT = await getTranslations({ locale, namespace: "categories" });
  const parentCategoriesT = await getTranslations({ locale, namespace: "parentCategories" });
  const languagesT = await getTranslations({ locale, namespace: "languages" });
  const commonT = await getTranslations({ locale, namespace: "common" });
  const productCategoriesT = await getTranslations({ locale, namespace: "productCategories" });
  const productsT = await getTranslations({ locale, namespace: "products" });
  const communityName = communitiesT(slug as never);

  const communityProviders = getProvidersByCommunity(slug);
  const upcomingEvents = getUpcomingEvents(slug);
  const communityProducts = getProductsByCommunity(slug);

  const grouped = communityProviders.reduce<Record<string, typeof communityProviders>>(
    (accumulator, provider) => {
      if (!accumulator[provider.service]) {
        accumulator[provider.service] = [];
      }

      accumulator[provider.service].push(provider);
      return accumulator;
    },
    {},
  );

  const activeParentCategories = parentCategories.filter((parent) =>
    getCategoriesByParent(parent.slug).some((cat) => grouped[cat.slug]),
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {community.flag} {t("title", { name: communityName })}
        </h1>
        <p className="mt-2 text-zinc-400">{t("subtitle", { name: communityName })}</p>
      </div>

      {communityProviders.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-zinc-400">{t("empty", { name: communityName })}</p>
          <Link href="/list-your-business" className="mt-2 inline-block text-blue-400 hover:underline">
            {t("cta")}
          </Link>
        </div>
      ) : (
        activeParentCategories.map((parent) => {
          const subcategories = getCategoriesByParent(parent.slug).filter((cat) => grouped[cat.slug]);
          return (
            <section key={parent.slug} className="mb-10">
              <h2 className="mb-4 text-xl font-semibold">
                {parent.icon} {parentCategoriesT(parent.slug as never)}
              </h2>
              {subcategories.map((subcategory) => (
                <div key={subcategory.slug} className="mb-6 ml-2">
                  <h3 className="mb-3 text-lg font-medium text-zinc-300">
                    {subcategory.icon} {categoriesT(subcategory.slug as never)}
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {grouped[subcategory.slug].map((provider) => (
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
                </div>
              ))}
            </section>
          );
        })
      )}

      {communityProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-lg font-semibold">{t("products")}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {communityProducts.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                categoryLabel={productCategoriesT(product.category as never)}
                viewProductLabel={productsT("viewProduct")}
              />
            ))}
          </div>
        </section>
      )}

      {upcomingEvents.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-lg font-semibold">{t("upcomingEvents")}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
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
        </section>
      )}
    </div>
  );
}
