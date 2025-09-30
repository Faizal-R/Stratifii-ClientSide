// src/app/not-found.tsx
"use client";

import { useAuthStore } from "@/features/auth/authStore";
import { motion } from "framer-motion";
import { Home, Rocket } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  const { user } = useAuthStore();

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black via-black to-violet-950 text-white overflow-hidden">
      {/* Animated Stars Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px] opacity-30 animate-pulse pointer-events-none"></div>

      {/* Floating Rocket */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 20 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute top-20 right-10 pointer-events-none"
      >
        <Rocket size={80} className="text-violet-400 drop-shadow-lg" />
      </motion.div>

      {/* 404 Title */}
      <motion.h1
        className="text-9xl font-extrabold tracking-widest"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        404
      </motion.h1>

      {/* Funny Subtitle */}
      <motion.p
        className="mt-6 text-lg md:text-xl text-gray-300 max-w-md text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        🚀 Oops! Looks like this page drifted off into space.  
        Don’t worry, we’ll teleport you back safely.
      </motion.p>

      {/* Back Home Button */}
      <motion.div
        className="mt-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href={`/${user?.role}/dashboard`}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-700 transition shadow-lg shadow-violet-600/30"
        >
          <Home size={20} />
          Go Back Home
        </Link>
      </motion.div>

      {/* Floating Glow Effect */}
      <motion.div
        className="absolute -bottom-20 w-[500px] h-[500px] bg-violet-500/30 blur-3xl rounded-full pointer-events-none"
        animate={{ y: [0, 20, 0], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
    </div>
  );
}
