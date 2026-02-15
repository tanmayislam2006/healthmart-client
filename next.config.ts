import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const authUrl = process.env.AUTH_URL;

    if (!authUrl) return [];

    return [
      {
        source: "/api/auth/:path*",
        destination: `${authUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
