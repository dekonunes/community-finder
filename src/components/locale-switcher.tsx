"use client";

import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { startTransition } from "react";
import { routing, type AppLocale } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

const localeFlags: Record<AppLocale, string> = {
  "pt-BR": "🇧🇷",
  en: "🇦🇺",
  es: "🇪🇸",
};

export function LocaleSwitcher() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("localeSwitcher");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  function onChange(nextLocale: AppLocale) {
    const query = Object.fromEntries(searchParams.entries());

    startTransition(() => {
      router.replace({ pathname, query }, { locale: nextLocale });
    });
  }

  return (
    <div>
      <label className="sr-only" htmlFor="locale-switcher">
        {t("label")}
      </label>
      <select
        id="locale-switcher"
        value={locale}
        onChange={(event) => onChange(event.target.value as AppLocale)}
        className="rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 text-sm text-zinc-300"
      >
        {routing.locales.map((option) => (
          <option key={option} value={option}>
            {localeFlags[option]} {t(option)}
          </option>
        ))}
      </select>
    </div>
  );
}
