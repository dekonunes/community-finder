"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { getProviderSuburbs, providers } from "@/lib/data";
import { ProviderCard } from "@/components/provider-card";
import { SearchFilters } from "@/components/search-filters";
import { Link } from "@/i18n/navigation";

export function SearchClient() {
  const t = useTranslations("search");
  const categoriesT = useTranslations("categories");
  const languagesT = useTranslations("languages");
  const commonT = useTranslations("common");
  const searchParams = useSearchParams();
  let filtered = providers;

  const service = searchParams.get("service");
  const language = searchParams.get("language");
  const suburb = searchParams.get("suburb");

  if (service) filtered = filtered.filter((p) => p.service === service);
  if (language) filtered = filtered.filter((p) => p.languages.includes(language));
  if (suburb) filtered = filtered.filter((p) => getProviderSuburbs(p).includes(suburb));

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">{t("title")}</h1>
      <SearchFilters />
      <div className="mt-6">
        <p className="mb-4 text-sm text-zinc-400">{t("results", { count: filtered.length })}</p>
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-zinc-400">{t("emptyTitle")}</p>
            <p className="mt-2 text-sm text-zinc-500">{t("emptyDescription")}</p>
            <Link href="/search" className="mt-4 inline-block text-blue-400 hover:underline">
              {t("clear")}
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((provider) => (
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
        )}
      </div>
    </div>
  );
}
