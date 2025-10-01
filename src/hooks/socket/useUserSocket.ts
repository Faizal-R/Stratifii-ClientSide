// hooks/useUserSocket.ts

"use client";
import { useEffect } from "react";
import { useSocketStore } from "@/features/socket/Socket";
import { useAuthStore } from "@/features/auth/authStore";
import { errorToast, successToast } from "@/utils/customToast";

export const useUserSocket = () => {
  const { user, updateStatus } = useAuthStore();
  const { socket } = useSocketStore();

  useEffect(() => {
    if (!user) return;

    if (!socket.connected) socket.connect();

    socket.emit("user:loggedIn", user.id);

    socket.on("user:status:updated", (data: { status: string }) => {
      updateStatus(data.status);

      if (data.status === "rejected") {
        errorToast(
          "Your account has been rejected. Please contact support for assistance."
        );
      } else {
        successToast(
          "Congratulations! Your account has been approved and is now active."
        );
      }
    });

    return () => {
      socket.off("user:status:updated");
    };
  }, [user,socket, updateStatus]);
};
