import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites: async () => [
    {
      source: "/",
      destination: "/dashboard",
    },
    {
      source: "/dashboard",
      destination: "/",
    },
  ],
};

export default nextConfig;
