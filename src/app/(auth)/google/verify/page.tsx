"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { Roles } from "@/constants/roles";

export default function VerifyPage() {
  const { data: session, status} = useSession(); 

  const setUser = useAuthStore((state) => state.setUser); // Get the setUser function from your store
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      return; // Still loading, show the loading screen
    }

    if (status === "unauthenticated") {
      // Redirect to login page if the user is not authenticated
      router.push("/signin");
      return;
    }

    if (status === "authenticated") {
      // Store the user in the state management system
      setUser({
        id: session.user.id,
        email: session.user.email!,
        token: session.accessToken!,
        role: Roles.INTERVIEWER,
      });
       signOut()
     
      router.push("/interviewer");
    }
  }, [status, session, router, setUser]);

  // Show a loading screen while verifying the session
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Verifying Authentication...</h1>
        <p className="mt-4">Please wait while we verify your session.</p>
      </div>
    </div>
  );
}