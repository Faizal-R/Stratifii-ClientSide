"use client";
import { useSocketStore } from '@/features/socket/Socket';
import { useWebRTC } from '@/hooks/webRTC/useWebRTC';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { toast } from 'sonner';

const InterviewRoomPage = () => {
  const { socket } = useSocketStore();
  const [targetId, setTargetId] = useState('');

  const {
    initializeCall,
    initializeMedia,
    localStream,
    remoteStream,
  } = useWebRTC();

  const { room } = useParams();
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  // 🔁 Stream binding
  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
      localVideoRef.current.play().catch(console.error);
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
      remoteVideoRef.current.play().catch(console.error);
    }
  }, [remoteStream]);

  // ✅ Run media init ONCE
  useEffect(() => {
    if (room) {
      initializeMedia();
    }
  }, [room, initializeMedia]); // ✅ Added initializeMedia dependency

  // ✅ Call when target is set (and media is ready)
  useEffect(() => {
    if (targetId && localStream) { // ✅ Wait for localStream to be ready
      initializeCall(targetId);
    }
  }, [targetId, localStream, initializeCall]); // ✅ Added missing dependencies

  // ✅ Listen for peer joining - using useCallback to prevent stale closures
  const handleUserJoined = useCallback((data: { 
    user: { name: string; role: string }; 
    id: string 
  }) => {
    toast.success(`${data.user.role}: ${data.user.name} ${data.id} has joined the meet`, {
      className: "custom-error-toast",
      duration: 5000
    });
    setTargetId(data.id);
  }, []);

  useEffect(() => {
    if (!socket) return;
    
    socket.on('room:user:joined', handleUserJoined);
    
    return () => {
      socket.off('room:user:joined', handleUserJoined);
    };
  }, [socket, handleUserJoined]); // ✅ Added handleUserJoined dependency

  // ✅ Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clean up video elements
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null;
      }
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Interview Room: {room}</h2>
      <div className="flex gap-6 flex-wrap justify-center">
        <div className="w-72 h-48 bg-black rounded overflow-hidden shadow-md border border-gray-700">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <p className="text-center text-sm mt-1">You</p>
        </div>
        <div className="w-72 h-48 bg-black rounded overflow-hidden shadow-md border border-gray-700">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          <p className="text-center text-sm mt-1">Interviewer</p>
        </div>
      </div>
    </div>
  );
};

export default InterviewRoomPage;