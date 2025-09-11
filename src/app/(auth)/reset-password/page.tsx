"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import {  useSearchParams } from "next/navigation";
import { useResetPassword } from "@/hooks/api/useAuth";
import { RiseLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { errorToast, successToast } from "@/utils/customToast";

function ResetPassword() {
  
  const { loading, resetPassword } = useResetPassword();
  const token = useSearchParams().get("token")?? "";
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router= useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      errorToast("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      errorToast("Password must be at least 8 characters long");
      return;
    }
    const response = await resetPassword(
      newPassword,
      confirmPassword,
      token as string
    );
    if (!response.success) {
      errorToast(response.error)
      return;
    }
    successToast(response.message);
    router.push('/signin')
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="border border-violet-900 p-8 rounded-xl shadow-md max-w-md w-full  shadow-violet-950">
        <h1 className="text-2xl font-bold text-violet-200 text-center mb-6">
          Reset Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-violet-200 mb-1"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-black/80 border border-violet-900/50 text-violet-200 pl-3 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                placeholder="Enter new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-violet-200 hover:text-violet-700"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-violet-200 mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-black/80 border border-violet-900/50 text-violet-200 pl-3 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                placeholder="Confirm new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-violet-200 hover:text-violet-700"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-violet-900 text-white py-2 px-4 rounded-lg hover:bg-violet-950 transition duration-200 font-medium"
          >
            {loading ? <RiseLoader color="white" /> : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
