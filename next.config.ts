import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel is configured as a static deployment for this client-only page.
  // Keep the existing server build for the Cloudflare/Sites runtime.
  ...(process.env.VERCEL ? { output: "export" } : {}),
};

export default nextConfig;
