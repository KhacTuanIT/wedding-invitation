import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
  // For GitHub Pages deployment - update this to your repo name
  basePath: "/wedding-invitation",
  assetPrefix: "/wedding-invitation/",
};

export default nextConfig;
