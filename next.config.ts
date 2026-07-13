import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Static export requires unoptimized images; we handle AVIF/WebP via public directory
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // Cache static assets for 1 year (immutable)
        source: "/:path*\\.{js,css,woff,woff2,ttf,ico,svg,png,jpg,jpeg,webp,avif,gif}",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // HTML pages: always revalidate
        source: "/:path*(html)?",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
