import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //  images: {
  //   domains: ["ancogvodbefbliicidpq.supabase.co"], // replace with your Supabase project domain
  // },
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
