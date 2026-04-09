import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/site-config.mjs";

export const dynamic = "force-static";

const { siteUrl } = getSiteConfig(process.env);

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
