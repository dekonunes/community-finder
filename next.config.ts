import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/community-finder",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
