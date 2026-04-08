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

export async function getBaseMetadata(locale: AppLocale): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: {
      default: t("siteTitle"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    alternates: getPageAlternates(locale),
    openGraph: {
      title: t("siteTitle"),
      description: t("openGraphDescription"),
      url: getLocalizedUrl(locale),
      siteName: t("siteTitle"),
      locale: openGraphLocales[locale],
      type: "website",
    },
  };
}
