import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing, type AppLocale } from "@/i18n/routing";
import { getSiteConfig } from "@/lib/site-config.mjs";

const { siteUrl } = getSiteConfig(process.env);

const openGraphLocales: Record<AppLocale, string> = {
  "pt-BR": "pt_BR",
  en: "en_AU",
  es: "es_ES",
};

function getOpenGraphAlternateLocales(currentLocale: AppLocale): string[] {
  return routing.locales
    .filter((locale) => locale !== currentLocale)
    .map((locale) => openGraphLocales[locale]);
}

function normalizePathname(pathname = "") {
  if (!pathname) {
    return "";
  }

  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function getLocalizedPath(locale: AppLocale, pathname = "") {
  const normalizedPathname = normalizePathname(pathname);
  return normalizedPathname ? `/${locale}${normalizedPathname}` : `/${locale}`;
}

export function getLocalizedUrl(locale: AppLocale, pathname = "") {
  return `${siteUrl}${getLocalizedPath(locale, pathname)}`;
}

export function getLanguageAlternates(pathname = "") {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, getLocalizedUrl(locale, pathname)]),
  );
}

export function getPageAlternates(locale: AppLocale, pathname = ""): Metadata["alternates"] {
  return {
    canonical: getLocalizedUrl(locale, pathname),
    languages: getLanguageAlternates(pathname),
  };
}

export function getPageOpenGraph(
  locale: AppLocale,
  overrides: { title: string; description: string; pathname?: string; type?: "website" | "profile" },
): Metadata["openGraph"] {
  return {
    title: overrides.title,
    description: overrides.description,
    url: getLocalizedUrl(locale, overrides.pathname),
    siteName: "Brazuca Hubz",
    locale: openGraphLocales[locale],
    alternateLocale: getOpenGraphAlternateLocales(locale),
    type: overrides.type ?? "website",
  };
}

export async function getBaseMetadata(locale: AppLocale): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: {
      default: t("siteTitle"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    alternates: getPageAlternates(locale),
    openGraph: getPageOpenGraph(locale, {
      title: t("siteTitle"),
      description: t("openGraphDescription"),
    }),
  };
}
