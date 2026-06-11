import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: "cdn.jsdelivr.net",
        protocol: "https",
      },
      {
        hostname: "cdn.simpleicons.org",
        protocol: "https",
      },
      {
        hostname: "github-readme-stats.vercel.app",
        protocol: "https",
      },
      {
        hostname: "streak-stats.demolab.com",
        protocol: "https",
      },
      {
        hostname: "komarev.com",
        protocol: "https",
      },
    ],
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
