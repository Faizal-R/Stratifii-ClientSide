"use client"
import { useAuthStore } from "@/features/auth/authStore";
import { useSocketStore } from "@/features/socket/Socket";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const InterviewsPage = () => {
  const { socket } = useSocketStore();
  const { user } = useAuthStore();
  const router = useRouter();
  const handleJoinRoom = () => {
    socket.emit("room:join", {
      user: { name: user?.name, role: user?.role },
      room: "INT-H42KH",
    });
  };
  useEffect(() => {
    const handleRoomJoined = (data: {
      user: { name: string; role: string };
      room: string;
    }) => {
      router.push(`/candidate/interviews/${data.room}`);
    };
    socket.on("room:join", handleRoomJoined);
    return () => {
      socket.off("room:join", handleRoomJoined);
    };
  }, [socket]);
  return (
    <div className="text-white">
      InterviewsPage
      <button
        onClick={handleJoinRoom}
        className="bg-green-700  text-white px-10 py-4"
      >
        Join Room
      </button>
    </div>
  );
};

export default InterviewsPage;
