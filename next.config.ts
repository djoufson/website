import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    // /gallery and /artwork are aliases for the canonical /art route (both locales).
    return [
      { source: "/gallery", destination: "/art", permanent: true },
      { source: "/artwork", destination: "/art", permanent: true },
      { source: "/fr/gallery", destination: "/fr/art", permanent: true },
      { source: "/fr/artwork", destination: "/fr/art", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
