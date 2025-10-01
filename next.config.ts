import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "images.unsplash.com",
      "static.vecteezy.com",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "outsourcing-interview-platform.s3.ap-south-1.amazonaws.com",
    ],
  },
  eslint:{
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
