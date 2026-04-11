"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { parentCategories, getCategoriesByParent } from "@/lib/data";

export function HomeSearchForm({ searchPath }: { searchPath: string }) {
  const t = useTranslations("home");
  const categoriesT = useTranslations("categories");
  const parentCategoriesT = useTranslations("parentCategories");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [selectedParent, setSelectedParent] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const subcategories = selectedParent ? getCategoriesByParent(selectedParent) : [];

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
      <select
        value={selectedParent}
        onChange={(e) => {
          setSelectedParent(e.target.value);
          setSelectedService("");
        }}
        className="w-full min-w-0 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white sm:flex-1 sm:basis-40"
      >
        <option value="">{t("allCategories")}</option>
        {parentCategories.map((parent) => (
          <option key={parent.slug} value={parent.slug}>
            {parent.icon} {parentCategoriesT(parent.slug as never)}
          </option>
        ))}
      </select>
      <select
        value={selectedService}
        onChange={(e) => {
          const service = e.target.value;
          setSelectedService(service);
          if (service) {
            startTransition(() => {
              router.push(`${searchPath}?service=${encodeURIComponent(service)}`);
            });
          }
        }}
        disabled={!selectedParent}
        className="w-full min-w-0 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white disabled:opacity-50 sm:flex-1 sm:basis-40"
      >
        <option value="">{t("allServices")}</option>
        {subcategories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.icon} {categoriesT(category.slug as never)}
          </option>
        ))}
      </select>
      </div>
      {isPending && (
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span className="inline-block animate-bounce text-lg">⚽</span>
          {t("loading")}
        </div>
      )}
    </div>
  );
}
