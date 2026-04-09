import { getTranslations, setRequestLocale } from "next-intl/server";
import { categories, providers } from "@/lib/data";
import { getPathname, Link } from "@/i18n/navigation";
import { getPageAlternates, getPageOpenGraph } from "@/i18n/metadata";
import { isValidLocale } from "@/i18n/routing";
import { getSiteConfig, withBasePath } from "@/lib/site-config.mjs";
import { ProviderCard } from "@/components/provider-card";
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
    title: t("title"),
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

  return (
    <div>
      <section className="py-12 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">🇧🇷 {t("title")}</h1>
        <p className="mt-2 text-zinc-400">{t("subtitle")}</p>
      </section>

      <section className="mx-auto max-w-2xl">
        <form action={searchPath} className="flex gap-2">
          <select
            name="service"
            defaultValue=""
            className="flex-1 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white"
          >
            <option value="">{t("allServices")}</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.icon} {categoriesT(category.slug as never)}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-6 py-2 text-sm font-medium hover:bg-blue-500"
          >
            {t("search")}
          </button>
        </form>
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
