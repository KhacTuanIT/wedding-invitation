import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === "production" ? "/wedding-invitation" : "",
  assetPrefix:
    process.env.NODE_ENV === "production" ? "/wedding-invitation/" : "",
  trailingSlash: true, // Ensure trailing slashes for GitHub Pages compatibility
};

export default nextConfig;
