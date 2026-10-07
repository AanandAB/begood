import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages (project page).
 *
 * The live site is served from https://AanandAB.github.io/begood/ — every
 * absolute path in the built HTML/CSS must be prefixed with /begood, so we set
 * both `basePath` (Next's own asset/link prefixing) and `assetPrefix` (raw
 * static asset prefixing). If this ever moves to a custom domain, set both to
 * "" and the rest of the code keeps working (assets go through lib/site.ts's
 * `asset()` helper).
 */
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/begood",
  assetPrefix: "/begood",
  // GitHub Pages has no image optimizer — serve the files as-is.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
