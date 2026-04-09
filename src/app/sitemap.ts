import type { MetadataRoute } from "next";
import { communities, providers } from "@/lib/data";
import { routing } from "@/i18n/routing";
import { getSiteConfig } from "@/lib/site-config.mjs";

export const dynamic = "force-static";

const { siteUrl: BASE_URL } = getSiteConfig(process.env);

const BUILD_DATE = new Date();

type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

const staticPathConfig: Record<string, { changeFrequency: ChangeFrequency; priority: number }> = {
  "": { changeFrequency: "weekly", priority: 1.0 },
  "/search": { changeFrequency: "weekly", priority: 0.6 },
  "/events": { changeFrequency: "weekly", priority: 0.6 },
  "/products": { changeFrequency: "weekly", priority: 0.6 },
  "/all": { changeFrequency: "weekly", priority: 0.6 },
  "/list-your-business": { changeFrequency: "monthly", priority: 0.5 },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = Object.keys(staticPathConfig);

  return routing.locales.flatMap((locale) => {
    const localizedStaticUrls = staticPaths.map((pathname) => ({
      url: `${BASE_URL}/${locale}${pathname}`,
      lastModified: BUILD_DATE,
      changeFrequency: staticPathConfig[pathname].changeFrequency,
      priority: staticPathConfig[pathname].priority,
    }));

    const providerUrls = providers.map((provider) => ({
      url: `${BASE_URL}/${locale}/provider/${provider.slug}`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as ChangeFrequency,
      priority: 0.8,
    }));

    const communityUrls = communities.map((community) => ({
      url: `${BASE_URL}/${locale}/community/${community.slug}`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as ChangeFrequency,
      priority: 0.7,
    }));

    return [...localizedStaticUrls, ...providerUrls, ...communityUrls];
  });
}
