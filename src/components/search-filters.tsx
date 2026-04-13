"use client";

import { useEffect, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  states,
  getAllLanguages,
  parentCategories,
  getCategoriesByParent,
  getSuburbsForServiceAndState,
} from "@/lib/data";
import { usePathname, useRouter } from "@/i18n/navigation";
import { trackFilter } from "@/lib/analytics";

export function SearchFilters({
  onPendingChange,
}: {
  onPendingChange?: (pending: boolean) => void;
}) {
  const t = useTranslations("search.filters");
  const categoriesT = useTranslations("categories");
  const parentCategoriesT = useTranslations("parentCategories");
  const languagesT = useTranslations("languages");
  const statesT = useTranslations("states");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    onPendingChange?.(isPending);
  }, [isPending, onPendingChange]);

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
      trackFilter(key, value);
    } else {
      params.delete(key);
    }
    const nextQuery = params.toString();
    startTransition(() => {
      router.push(nextQuery ? `${pathname}?${nextQuery}` : pathname);
    });
  }

  const selectedService = searchParams.get("service") ?? "";
  const selectedState = searchParams.get("state") ?? "";
  const availableSuburbs = getSuburbsForServiceAndState(
    selectedService || null,
    selectedState || null,
  );

  const selectedSuburb = searchParams.get("suburb") ?? "";

  // Clear suburb filter if it's no longer in the available list
  useEffect(() => {
    if (
      selectedSuburb &&
      !availableSuburbs.some((s) => s.slug === selectedSuburb)
    ) {
      updateFilter("suburb", "");
    }
  }, [selectedService, selectedState]);

  return (
    <div className="grid w-full grid-cols-12 gap-3 sm:flex sm:flex-wrap sm:justify-start">
      <select
        value={selectedService}
        onChange={(e) => updateFilter("service", e.target.value)}
        className="col-span-12 w-full min-w-0 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white sm:col-auto sm:w-auto"
      >
        <option value="">{t("service")}</option>
        {parentCategories.map((parent) => (
          <optgroup
            key={parent.slug}
            label={`${parent.icon} ${parentCategoriesT(parent.slug as never)}`}
          >
            {getCategoriesByParent(parent.slug).map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.icon} {categoriesT(category.slug as never)}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <select
        value={searchParams.get("language") ?? ""}
        onChange={(e) => updateFilter("language", e.target.value)}
        className="col-span-6 w-full min-w-0 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white sm:col-auto sm:w-auto"
      >
        <option value="">{t("language")}</option>
        {getAllLanguages().map((language) => (
          <option key={language} value={language} className="capitalize">
            {languagesT(language as never)}
          </option>
        ))}
      </select>
      <select
        value={selectedState}
        onChange={(e) => updateFilter("state", e.target.value)}
        className="col-span-6 w-full min-w-0 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white sm:col-auto sm:w-auto"
      >
        <option value="">{t("state")}</option>
        {states.map((state) => (
          <option key={state.slug} value={state.slug}>
            {statesT(state.slug as never)}
          </option>
        ))}
      </select>
      <select
        value={selectedSuburb}
        onChange={(e) => updateFilter("suburb", e.target.value)}
        className="col-span-6 w-full min-w-0 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white sm:col-auto sm:w-auto"
      >
        <option value="">{t("suburb")}</option>
        {availableSuburbs.map((suburb) => (
          <option key={suburb.slug} value={suburb.slug}>
            {suburb.name}
          </option>
        ))}
      </select>
    </div>
  );
}
