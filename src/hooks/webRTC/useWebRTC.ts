import { useSocketStore } from "@/features/socket/Socket";
import { useEffect, useRef, useState, useCallback } from "react";

const WebRTCConfig = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302", "stun:stun4.l.google.com:5349"],
    },
  ],
};

export const useWebRTC = () => {
  const { socket } = useSocketStore();
  const [callerId, setCallerId] = useState<string | null>(null);
  const [recipientId, setRecipientId] = useState<string | null>(null);

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  const initializeMedia = useCallback(async () => {
    if (!localStream) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
        console.log("Local Stream: ", stream);
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    }
  }, [localStream]);

  const createPeerConnection = useCallback(() => {
    // ✅ Always close existing connection first
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    try {
      const pc = new RTCPeerConnection(WebRTCConfig);
      peerConnectionRef.current = pc;

      // ✅ Only add tracks if localStream exists
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          console.log("Adding local track:", track);
          pc.addTrack(track, localStream);
        });
      }

      pc.ontrack = (event) => {
        console.log("Received remote track:", event);
        if (event.streams && event.streams[0]) {
          setRemoteStream(event.streams[0]);
        }
      };

      pc.onicecandidate = (event) => {
        if (event.candidate && socket) {
          const targetId = recipientId || callerId;
          if (targetId) {
            console.log("Sending ICE candidate:", event.candidate);
            socket.emit("ice-candidate", {
              candidate: event.candidate,
              recipientId: targetId,
            });
          }
        }
      };

      // ✅ Add connection state monitoring
      pc.onconnectionstatechange = () => {
        console.log("Connection state:", pc.connectionState);
      };

      pc.oniceconnectionstatechange = () => {
        console.log("ICE connection state:", pc.iceConnectionState);
      };

    } catch (error) {
      console.error("Error creating peer connection:", error);
    }
  }, [localStream, socket, recipientId, callerId]);

  const initializeCall = useCallback(async (targetPeerId: string) => {
    if (!socket || !localStream) {
      console.warn("Cannot initialize call: missing socket or localStream");
      return;
    }

    console.log("Initializing call to:", targetPeerId);
    setRecipientId(targetPeerId);
    
    // ✅ Create peer connection with existing localStream
    createPeerConnection();
    
    try {
      const offer = await peerConnectionRef.current?.createOffer();
      if (offer) {
        await peerConnectionRef.current?.setLocalDescription(offer);
        socket.emit("offer", {
          to: targetPeerId,
          offer,
        });
        console.log("Offer sent:", offer);
      }
    } catch (error) {
      console.error("Error creating/sending offer:", error);
      console.error("Error creating/sending offer:", error);

    }
  }, [socket, localStream, createPeerConnection]);

  const handleOffer = async (data: {
    from: string;
    offer: RTCSessionDescriptionInit;
  }) => {
    const { offer, from } = data; 
    console.log("Received offer from:", from,offer);
    console.log("res")
    
    if (!localStream) {
      console.warn("Cannot handle offer: localStream not available");
      return;
    }

    setCallerId(from);
    
    // ✅ Create peer connection with existing localStream
    createPeerConnection();
    
    try {
      await peerConnectionRef.current?.setRemoteDescription(offer);
      const answer = await peerConnectionRef.current?.createAnswer();
      if (answer) {
        await peerConnectionRef.current?.setLocalDescription(answer);
        socket?.emit("answer", { to: from, answer });
        console.log("Answer sent:", answer);
      }
    } catch (error) {
      console.error("Error handling offer:", error);
    }
  };

  const handleAnswer = useCallback(async (data: {
    answer: RTCSessionDescriptionInit;
    from: string;
  }) => {
    console.log("Received answer from:", data.from);
    
    if (!peerConnectionRef.current) {
      console.warn("Cannot handle answer: no peer connection");
      return;
    }
      
    try {
      await peerConnectionRef.current.setRemoteDescription(data.answer);
      console.log("Answer processed successfully");
    } catch (error) {
      console.error("Error handling answer:", error);
    }
  }, []);

  const handleNewICECandidate = useCallback(async (data: { candidate: RTCIceCandidateInit }) => {
    console.log("Received ICE candidate:", data.candidate);
    
    try {
      if (peerConnectionRef.current && peerConnectionRef.current.remoteDescription) {
        await peerConnectionRef.current.addIceCandidate(
          new RTCIceCandidate(data.candidate)
        );
        console.log("ICE candidate added successfully");
      } else {
        console.warn("Cannot add ICE candidate: no peer connection or remote description");
      }
    } catch (error) {
      console.error("Error adding ICE candidate:", error);
    }
  }, []);

  // ✅ Socket event listeners with proper dependencies
  useEffect(() => {
    
    socket.on("incomming:call", handleOffer);
    socket.on("answer", handleAnswer);
    socket.on("ice-candidate", handleNewICECandidate);
    
    return () => {
      socket.off("incomming:call", handleOffer);
      socket.off("answer", handleAnswer);
      socket.off("ice-candidate", handleNewICECandidate);
    };
  }, [socket, handleOffer, handleAnswer, handleNewICECandidate]);

  // ✅ Cleanup on unmount
  useEffect(() => {
    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
      }
    };
  }, [localStream]);

  return {
    localStream,
    remoteStream,
    initializeMedia,
    initializeCall,
    recipientId,
    callerId,
  };
};