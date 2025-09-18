import { KeyRound } from "lucide-react";
import { motion } from "framer-motion";

export default function ChangePasswordButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-violet-100 font-semibold px-5 py-2 rounded-lg shadow-lg
       hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
    >
      <KeyRound className="w-5 h-5" />
      Change Password
    </motion.button>
  );
}
