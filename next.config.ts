import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ancogvodbefbliicidpq.supabase.co", // your project ref
      },
    ],
  },
};

export default nextConfig;
