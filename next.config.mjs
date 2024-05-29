import createNextIntlPlugin from "next-intl/plugin";
import withBundleAnalyzer from "@next/bundle-analyzer";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withNextIntl = createNextIntlPlugin();

// const path = require("path");

// const withNextIntl = require("next-intl/plugin")();
/** @type {import('next').NextC(onfig} */
const nextConfig = {
  // distDir: "dist",
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.resolve.alias["@"] = path.join(__dirname, "src");
    // Important: return the modified config
    return config;
  },
  output: "standalone",
};

export default bundleAnalyzer(withNextIntl(nextConfig));
