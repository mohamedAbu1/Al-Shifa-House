import type { NextConfig } from "next";

const isVercel = Boolean(process.env.VERCEL);

const nextConfig: NextConfig = {
  // Vercel is configured as a static deployment for this client-only page.
  // Keep the existing server build for the Cloudflare/Sites runtime.
  ...(isVercel
    ? {
        output: "export",
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
