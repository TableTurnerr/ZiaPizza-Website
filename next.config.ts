import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Keep generated variants small and cacheable while retaining suitable
    // widths for the site’s actual card and hero layouts.
    deviceSizes: [360, 640, 750, 1080, 1440, 1920],
    imageSizes: [96, 128, 160, 240, 320, 480],
    qualities: [70, 75],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31_536_000,
    localPatterns: [
      { pathname: "/products/**", search: "" },
      { pathname: "/photos/**", search: "" },
      { pathname: "/logo.webp", search: "" },
      { pathname: "/rewards-qr.webp", search: "" },
    ],
  },
};

export default nextConfig;
