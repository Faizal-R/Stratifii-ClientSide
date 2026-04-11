import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "static.vecteezy.com",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "stratifii-outsourcing-interview-platform-bucket.s3.ap-south-1.amazonaws.com",
    ],
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;