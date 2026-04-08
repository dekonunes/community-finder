import type { MetadataRoute } from "next";
import { communities, providers } from "@/lib/data";
import { routing } from "@/i18n/routing";
import { getSiteConfig } from "@/lib/site-config.mjs";

export const dynamic = "force-static";

const { siteUrl: BASE_URL } = getSiteConfig(process.env);

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/search", "/events", "/products", "/all", "/list-your-business"];

  return routing.locales.flatMap((locale) => {
    const localizedStaticUrls = staticPaths.map((pathname) => ({
      url: `${BASE_URL}/${locale}${pathname}`,
      lastModified: new Date(),
    }));

    const providerUrls = providers.map((provider) => ({
      url: `${BASE_URL}/${locale}/provider/${provider.slug}`,
      lastModified: new Date(),
    }));

    const communityUrls = communities.map((community) => ({
      url: `${BASE_URL}/${locale}/community/${community.slug}`,
      lastModified: new Date(),
    }));

    return [...localizedStaticUrls, ...providerUrls, ...communityUrls];
  });
}
