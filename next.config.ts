import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["loremflickr.com"],
  },
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
