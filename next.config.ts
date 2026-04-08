import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { getSiteConfig } from "./src/lib/site-config.mjs";

const { basePath } = getSiteConfig(process.env);
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  ...(basePath ? { basePath } : {}),
};

export default withNextIntl(nextConfig);
