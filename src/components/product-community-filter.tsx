"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { getAvailableProductCategories } from "@/lib/data";
import { usePathname, useRouter } from "@/i18n/navigation";

export function ProductCommunityFilter({
  currentCommunity,
  currentCategory,
}: {
  currentCommunity?: string;
  currentCategory?: string;
}) {
  const t = useTranslations("products");
  const categoriesT = useTranslations("productCategories");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const availableCategories = getAvailableProductCategories(currentCommunity);

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const nextQuery = params.toString();
    router.push(nextQuery ? `${pathname}?${nextQuery}` : pathname);
  }

  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={currentCategory ?? ""}
        onChange={(e) => update("category", e.target.value)}
        className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-200"
      >
        <option value="">{t("allCategories")}</option>
        {availableCategories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.icon} {categoriesT(c.slug as never)}
          </option>
        ))}
      </select>
    </div>
  );
}
