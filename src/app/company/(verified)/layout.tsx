"use client";

import { useAuthStore } from "@/features/auth/authStore";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserSocket } from "@/hooks/socket/useUserSocket";

const CompanyVerifiedLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user?.status === "pending") {
      router.push("/company/profile");
    }
  }, [user, router]);

  if (user?.status === "pending") {
    return null;
  }
 
  return <>{children}</>;
};

export default CompanyVerifiedLayout;
