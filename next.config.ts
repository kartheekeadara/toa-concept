import type { NextConfig } from "next";

const presentation = process.env.PRESENTATION === "true";

const nextConfig: NextConfig = {
  // hide the dev-mode corner badge so phone previews and screenshots look clean
  devIndicators: { appIsrStatus: false, buildActivity: false },
  // expose the flag to client components too (see lib/flags.ts)
  env: { PRESENTATION: presentation ? "true" : "false" },
  // separate build folder so the review server (3100) and presentation server (3101) can run side by side
  distDir: presentation ? ".next-present" : ".next",
};

export default nextConfig;
