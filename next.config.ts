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
};

export default nextConfig;