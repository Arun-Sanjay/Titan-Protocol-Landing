import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/download/[platform]": ["./private/downloads/**/*"],
  },
};

export default nextConfig;
