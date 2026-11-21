import type { NextConfig } from "next";

const presentation = process.env.PRESENTATION === "true";
// GitHub Pages build: static export under /<repo>. Set by .github/workflows/pages.yml.
const pages = process.env.GITHUB_PAGES === "true";
const basePath = pages ? process.env.BASE_PATH ?? "" : "";

const nextConfig: NextConfig = {
  // hide the dev-mode corner badge so phone previews and screenshots look clean
  devIndicators: { appIsrStatus: false, buildActivity: false },
  // expose the flags to client components too (see lib/flags.ts)
  env: { PRESENTATION: presentation ? "true" : "false", NEXT_PUBLIC_BASE_PATH: basePath },
  // NEXT_DIST_DIR lets a check build run without clobbering a running dev server.
  // separate build folder so the review server (3100) and presentation server (3101) can run side by side
  distDir: process.env.NEXT_DIST_DIR || (presentation ? ".next-present" : ".next"),
  ...(pages
    ? {
        output: "export" as const,
        basePath,
        trailingSlash: true,
        images: { loader: "custom" as const, loaderFile: "./lib/image-loader.ts" },
      }
    : {}),
};

export default nextConfig;
