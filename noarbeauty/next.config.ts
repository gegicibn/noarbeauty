import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  serverExternalPackages: ["@react-pdf/renderer", "canvas"],
  experimental: {
    serverActions: {
      bodySizeLimit: "32mb", // 3 fotografije po 10MB
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "replicate.delivery" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.qoves.com" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/py/:path*",
        destination: `${process.env.PYTHON_API_URL || "http://localhost:8000"}/:path*`,
      },
    ];
  },
};

export default nextConfig;
