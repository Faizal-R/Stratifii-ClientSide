"use client";

import { ReactNode } from "react";
import { useUserSocket } from "@/hooks/socket/useUserSocket";

export default function SocketProvider({ children }: { children: ReactNode }) {
  useUserSocket();

  return <>{children}</>;
}
