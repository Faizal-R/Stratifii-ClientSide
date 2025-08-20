"use client";

import React, { useEffect, useState } from "react";
import { Lock, User, Shield } from "lucide-react";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAdminSignIn } from "@/hooks/api/useAdmin";
import { useAuthStore } from "@/features/auth/authStore";
import { Roles } from "@/constants/enums/roles";
import { RiseLoader } from "react-spinners";

function AdminSignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, signIn } = useAdminSignIn();
  const { user, setUser } = useAuthStore();
  useEffect(() => {
    if (!user || user.role !== Roles.ADMIN) {
      router.push("/admin-signin");
    }
  }, [router, user]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await signIn({ email, password });
    if (!response.success) {
      toast.error(response.error, {
        className: "custom-error-toast",
      });
      return;
    } else {
      toast(response.message);
      setUser({
        name:Roles.ADMIN,
        email,
        role: Roles.ADMIN,
      });
    }
    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 200);
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="border border-violet-900 rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 p-3 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-violet-400">Admin Login</h1>
          <p className="text-gray-600 mt-2">Please sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 block"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-violet-950 bg-violet-900 text-white rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent placeholder-gray-300"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 block"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-violet-950 bg-violet-900 text-white rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent placeholder-gray-300"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            {loading ? <RiseLoader color="white" /> : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminSignIn;
