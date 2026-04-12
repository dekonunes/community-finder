import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { categories, providers, parentCategories, getCategoriesByParent } from "@/lib/data";
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
  const parentCategoriesT = await getTranslations({ locale, namespace: "parentCategories" });
  const languagesT = await getTranslations({ locale, namespace: "languages" });
  const commonT = await getTranslations({ locale, namespace: "common" });

  const grouped = providers.reduce<Record<string, typeof providers>>((accumulator, provider) => {
    if (!accumulator[provider.service]) {
      accumulator[provider.service] = [];
    }

    accumulator[provider.service].push(provider);
    return accumulator;
  }, {});

  const activeParentCategories = parentCategories.filter((parent) =>
    getCategoriesByParent(parent.slug).some((cat) => grouped[cat.slug]),
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="mt-2 text-zinc-400">{t("subtitle")}</p>
      </div>

      {activeParentCategories.map((parent) => {
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
                      shareLabel={commonT("share")}
                      copiedLabel={commonT("copied")}
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
}
