import type { NextConfig } from "next";
import { resolve } from "node:path";

const nextConfig: NextConfig = {
  webpack(config, { webpack }) {
    // Only standard Next builds use this config; Sites continues to use Vite.
    config.plugins.push(new webpack.NormalModuleReplacementPlugin(
      /^cloudflare:workers$/,
      resolve("lib/netlify-cloudflare-env.ts"),
    ));
    return config;
  },
};

export default nextConfig;
