"use client";

import { ReactNode, useEffect } from "react";
import { useUserSocket } from "@/hooks/socket/useUserSocket";
import { useRouter } from "next/navigation";

export default function SocketProvider({ children }: { children: ReactNode }) {
  useUserSocket();
  const router = useRouter();

  useEffect(() => {
    const handleNavigation = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        router.push(customEvent.detail);
      }
    };

    window.addEventListener("app:navigate", handleNavigation);
    return () => {
      window.removeEventListener("app:navigate", handleNavigation);
    };
  }, [router]);

  return <>{children}</>;
}
