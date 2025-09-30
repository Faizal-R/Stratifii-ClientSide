"use client";
import { Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-black to-violet-950 text-white px-4">
      <div className="text-center max-w-md">
        {/* Animated Lock Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -90, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="mx-auto mb-6 bg-violet-900/30 p-6 rounded-full border border-violet-700 shadow-xl"
        >
          <Lock className="w-16 h-16 text-violet-400" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold mb-3"
        >
          Unauthorized Access
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-300 mb-8"
        >
          You don’t have permission to view this page.  
          Please sign in with the correct account.
        </motion.p>

        {/* Button */}
        <motion.button
          onClick={() => router.push("/signin")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-2xl shadow-lg shadow-violet-900/40 text-lg font-semibold"
        >
          Go to Sign In <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
