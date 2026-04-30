import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
  // For GitHub Pages deployment - update this to your repo name
  basePath: process.env.NODE_ENV === "production" ? "/wedding-invitation" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/wedding-invitation/" : "",
};

export default nextConfig;
