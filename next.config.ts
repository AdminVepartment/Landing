import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow Figma export URLs for asset references during dev
    remotePatterns: [
      {
        protocol: "https",
        hostname: "figma-alpha-api.s3.us-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**.figma.com",
      },
    ],
  },
};

export default nextConfig;
