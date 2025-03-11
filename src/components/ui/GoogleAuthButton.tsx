"use client";

import { signIn } from "next-auth/react";
import {  CircleDot } from "lucide-react";

export function GoogleAuthButton() {
  async function handleGoogleAuth() {
    signIn("google", { callbackUrl: "/interviewer/" });
  }

  return (
    <button
      onClick={handleGoogleAuth}
      className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-md text-gray-700 font-medium hover:bg-gray-100 transition-all"
    >
      <CircleDot size={24} className="text-red-500" />
      <span>Sign in with Google</span>
    </button>
  );
}
