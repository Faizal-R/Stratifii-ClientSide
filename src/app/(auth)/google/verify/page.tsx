"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/authStore";
import { Roles } from "@/constants/roles";
import { useFetchInterviewerProfile } from "@/hooks/useInterviewer";
import { toast } from "sonner";

export default function VerifyPage() {
  const { data: session, status } = useSession();
  const { setUser } = useAuthStore();
  const { interviewerProfile } = useFetchInterviewerProfile();
  // Get the setUser function from your store
  const router = useRouter();

useEffect(() => {
  if (status === "loading") return;

  if (status === "unauthenticated") {
    router.push("/signin");
    return;
  }

  if (status === "authenticated") {
    // ⚠️ Show toast and sign out if there's a session error from backend
    if (session.error) {
      toast.error(session.error,{
        className:"custom-error-toast"
      });
      setTimeout(() => {
        signOut({ callbackUrl: "/signin" }); // Sign out and redirect
      }, 4000);
      return;
    }

    setUser({
      id: session.user.id,
      email: session.user.email!,
      name: session.user.name!,
      token: session.accessToken!,
      role: Roles.INTERVIEWER,
    });

    const fetchInterviewer = async () => {
      const response = await interviewerProfile();

      if (!response.success) {
        toast.error(response.error);
        return;
      }

      const data = response.data;

      if (data.isVerified) {
        router.push("/interviewer");
      } else {
        router.push(
          `/register/interviewer?isGoogleVerified=true&&id=${session.user.id}`
        );
      }
    };

    fetchInterviewer();
  }
}, [status, session, router, setUser, interviewerProfile]);


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
