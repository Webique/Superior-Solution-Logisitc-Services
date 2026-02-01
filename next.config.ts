import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
    output: "export",
    images: {
        unoptimized: true,
        // Optimize image formats for static export
        formats: ["image/avif", "image/webp"]
    },
    // Enable compression
    compress: true,
    // Optimize production builds
    poweredByHeader: false,
    // Generate ETags for caching
    generateEtags: true
};

export default withNextIntl(nextConfig);
