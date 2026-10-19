import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fotos provisórias do Unsplash até chegarem as fotos oficiais
    remotePatterns: [new URL("https://images.unsplash.com/**")],
  },
};

export default nextConfig;
