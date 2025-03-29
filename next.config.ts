import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    useCache: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.ganjoor.net',
      },
    ],
  },
};

export default nextConfig;
