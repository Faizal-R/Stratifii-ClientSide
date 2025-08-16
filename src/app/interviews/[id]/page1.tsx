"use client";
import React, { useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import { useParams } from "next/navigation";
import { useSocketStore } from "@/features/socket/Socket";

const RoomPage = () => {
  const { room } = useParams();
  const { socket } = useSocketStore();

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerRef = useRef<SimplePeer.Instance | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (!isMounted) return;

        localStreamRef.current = stream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          localVideoRef.current.play().catch(console.error);
        }

        socket.emit("join-room", { roomId: room });
      } catch (err) {
        console.error("Error accessing media devices.", err);
      }
    };

    initUserMedia();

    // Handle when another user joins
    socket.on("user-joined", () => {
      if (peerRef.current) return; // Already have peer

      if (!localStreamRef.current) return;

      const peer = new SimplePeer({
        initiator: true,
        trickle: false,
        stream: localStreamRef.current,
      });

      peer.on("signal", (data) => {
        socket.emit("signal", { roomId: room, data });
      });

      peer.on("stream", (remoteStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      });

      peerRef.current = peer;
    });

    // Handle incoming signals
    socket.on("signal", ({ data }) => {
      if (!peerRef.current) {
        if (!localStreamRef.current) return;

        const peer = new SimplePeer({
          initiator: false,
          trickle: false,
          stream: localStreamRef.current,
        });

        peer.on("signal", (signalData) => {
          socket.emit("signal", { roomId: room, data: signalData });
        });

        peer.on("stream", (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });

        peer.signal(data);
        peerRef.current = peer;
      } else {
        peerRef.current.signal(data);
      }
    });

    return () => {
      isMounted = false;

      socket.off("user-joined");
      socket.off("signal");

      if (peerRef.current) {
        peerRef.current.destroy();
        peerRef.current = null;
      }

      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
        localStreamRef.current = null;
      }
    };
  }, [room, socket]);

  return (
    <div className="flex bg-white">
      <div>
        <h1>Local Video</h1>
        <video ref={localVideoRef} autoPlay muted className="w-1/2 h-screen" />
      </div>
      <div>
        <h1>Remote Video</h1>
        <video ref={remoteVideoRef} autoPlay className="w-1/2 h-screen" />
      </div>
    </div>
  );
};

export default RoomPage