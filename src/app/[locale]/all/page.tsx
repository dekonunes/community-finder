import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { categories, providers } from "@/lib/data";
import { ProviderCard } from "@/components/provider-card";
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

  const t = await getTranslations({ locale, namespace: "all" });

  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
    alternates: getPageAlternates(locale, "/all"),
    openGraph: getPageOpenGraph(locale, {
      title: t("metadataTitle"),
      description: t("metadataDescription"),
      pathname: "/all",
    }),
  };
}

export default async function AllProvidersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "all" });
  const categoriesT = await getTranslations({ locale, namespace: "categories" });
  const languagesT = await getTranslations({ locale, namespace: "languages" });
  const commonT = await getTranslations({ locale, namespace: "common" });

  const grouped = providers.reduce<Record<string, typeof providers>>((accumulator, provider) => {
    if (!accumulator[provider.service]) {
      accumulator[provider.service] = [];
    }

    accumulator[provider.service].push(provider);
    return accumulator;
  }, {});

  const orderedCategories = categories.filter((category) => grouped[category.slug]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="mt-2 text-zinc-400">{t("subtitle")}</p>
      </div>

      {orderedCategories.map((category) => (
        <section key={category.slug} className="mb-10">
          <h2 className="mb-4 text-lg font-semibold">
            {category.icon} {categoriesT(category.slug as never)}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {grouped[category.slug].map((provider) => (
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
        </section>
      ))}
    </div>
  );
}
