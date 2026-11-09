import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pg"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gbdzrzxxgvomtoqywvmw.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/education",
        permanent: true,
      },
      {
        source: "/education/home",
        destination: "/education",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;