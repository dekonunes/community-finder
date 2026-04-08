import type { NextConfig } from "next";
import { getSiteConfig } from "./src/lib/site-config.mjs";

const { basePath } = getSiteConfig(process.env);

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
