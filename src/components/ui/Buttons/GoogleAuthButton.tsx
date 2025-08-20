"use client";

import { FcGoogle } from "react-icons/fc";

interface IGoogleAuthButtonProps {
  handleGoogleAuth: () => void;
}

export const GoogleAuthButton: React.FC<IGoogleAuthButtonProps> = ({
  handleGoogleAuth,
}) => {
  return (
    <button
      onClick={handleGoogleAuth}
      className="flex items-center justify-center gap-3 px-6 py-3 w-full sm:w-auto  border border-violet-950 rounded-xl shadow-sm text-gray-600 font-medium hover:bg-violet-dark focus:ring-2 focus:ring-gray-300 focus:outline-none transition-all mx-auto"
    >
      <FcGoogle size={24} />
      <span className="text-base ">Sign in with Google</span>
    </button>
  );
};
