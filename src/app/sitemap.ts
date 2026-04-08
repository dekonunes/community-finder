import type { MetadataRoute } from "next";
import { providers, communities } from "@/lib/data";
import { getSiteConfig } from "@/lib/site-config.mjs";

export const dynamic = "force-static";

const { siteUrl: BASE_URL } = getSiteConfig(process.env);

export default function sitemap(): MetadataRoute.Sitemap {
  const providerUrls = providers.map((p) => ({
    url: `${BASE_URL}/provider/${p.slug}`,
    lastModified: new Date(),
  }));

  const communityUrls = communities.map((c) => ({
    url: `${BASE_URL}/community/${c.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/search`, lastModified: new Date() },
    { url: `${BASE_URL}/events`, lastModified: new Date() },
    { url: `${BASE_URL}/list-your-business`, lastModified: new Date() },
    { url: `${BASE_URL}/products`, lastModified: new Date() },
    ...providerUrls,
    ...communityUrls,
  ];
}
