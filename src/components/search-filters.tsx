"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { categories, suburbs, getAllLanguages, parentCategories, getCategoriesByParent } from "@/lib/data";
import { usePathname, useRouter } from "@/i18n/navigation";
import { trackFilter } from "@/lib/analytics";

export function SearchFilters() {
  const t = useTranslations("search.filters");
  const categoriesT = useTranslations("categories");
  const parentCategoriesT = useTranslations("parentCategories");
  const languagesT = useTranslations("languages");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
      trackFilter(key, value);
    } else {
      params.delete(key);
    }
    const nextQuery = params.toString();
    router.push(nextQuery ? `${pathname}?${nextQuery}` : pathname);
  }

  return (
    <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
      <select value={searchParams.get("service") ?? ""} onChange={(e) => updateFilter("service", e.target.value)} className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white">
        <option value="">{t("service")}</option>
        {parentCategories.map((parent) => (
          <optgroup key={parent.slug} label={`${parent.icon} ${parentCategoriesT(parent.slug as never)}`}>
            {getCategoriesByParent(parent.slug).map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.icon} {categoriesT(category.slug as never)}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <select value={searchParams.get("language") ?? ""} onChange={(e) => updateFilter("language", e.target.value)} className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white">
        <option value="">{t("language")}</option>
        {getAllLanguages().map((language) => (
          <option key={language} value={language} className="capitalize">
            {languagesT(language as never)}
          </option>
        ))}
      </select>
      <select value={searchParams.get("suburb") ?? ""} onChange={(e) => updateFilter("suburb", e.target.value)} className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white">
        <option value="">{t("suburb")}</option>
        {suburbs.map((suburb) => <option key={suburb.slug} value={suburb.slug}>{suburb.name}</option>)}
      </select>
    </div>
  );
}
