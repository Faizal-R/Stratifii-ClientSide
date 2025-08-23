"use client";
import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import SimplePeer from "simple-peer";
import { VideoPlayer } from "./VideoPlayer";
import { VideoControls } from "./VideoControls";
import { ChatPanel } from "./ChatPanel";
import { Copy, Users, Clock } from "lucide-react";
import { IMessage, Note } from "@/types/IInterviewRoom";
import { Modal } from "@/components/ui/Modals/ConfirmationModal";
import { useAuthStore } from "@/features/auth/authStore";
import { Roles } from "@/constants/enums/roles";
import { useRouter } from "next/navigation";
import InterviewFeedbackModal from "@/components/ui/Modals/InterviewFeedbackModal";
import { Socket } from "socket.io-client";

import { useUpdateInterviewWithFeedback } from "@/hooks/api/useInterview";
import { IInterviewFeedback } from "@/types/IInterview";
import { toast } from "sonner";

interface RoomPageProps {
  room: string;
  socket: Socket;
  interviewId?: string;
}

const RoomPage: React.FC<RoomPageProps> = ({ room, socket, interviewId }) => {
  const { user } = useAuthStore();
  const router = useRouter();

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteScreenRef = useRef<HTMLVideoElement | null>(null);
  const peerRef = useRef<SimplePeer.Instance | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [showSlotEndWarning, setShowSlotEndWarning] = useState(false);
  const [showIsEndCallModal, setShowIsEndCallModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showRemoteScreen, setShowRemoteScreen] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const { updateInterviewWithFeedback } = useUpdateInterviewWithFeedback();

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
      if (peerRef.current || !localStreamRef.current) return;
      const peer = new SimplePeer({
        initiator: true,
        trickle: false,
        stream: localStreamRef.current,
      });

      peer.on("signal", (data) => {
        socket.emit("signal", { roomId: room, data });
      });

      peer.on("track", (track, stream) => {
        setIsConnected(true);
        if (track.kind === "video") {
          if (!remoteVideoRef.current?.srcObject) {
            remoteVideoRef.current!.srcObject = stream;
            remoteVideoRef.current!.play().catch(console.error);
          } else if (remoteScreenRef.current) {
            remoteScreenRef.current.srcObject = stream;
            remoteScreenRef.current.play().catch(console.error);
            setShowRemoteScreen(true);
          }
        }
      });

      peerRef.current = peer;
    });

    socket.on("signal", ({ data }: any) => {
      if (!peerRef.current && localStreamRef.current) {
        const peer = new SimplePeer({
          initiator: false,
          trickle: false,
          stream: localStreamRef.current,
        });

        peer.on("signal", (signalData) => {
          socket.emit("signal", { roomId: room, data: signalData });
        });

        peer.on("track", (track, stream) => {
          setIsConnected(true);
          if (track.kind === "video") {
            if (!remoteVideoRef.current?.srcObject) {
              remoteVideoRef.current!.srcObject = stream;
              remoteVideoRef.current!.play().catch(console.error);
            } else if (remoteScreenRef.current) {
              remoteScreenRef.current.srcObject = stream;
              remoteScreenRef.current.play().catch(console.error);
              setShowRemoteScreen(true);
            }
          }
        });

        peer.signal(data);
        peerRef.current = peer;
      } else if (peerRef.current) {
        peerRef.current.signal(data);
      }
    });

    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => {
      isMounted = false;
      clearInterval(timer);
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

  const handleNewMessage = useCallback(({ message }: { message: IMessage }) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  useEffect(() => {
    socket.on("new:message", handleNewMessage);
    return () => {
      socket.off("new:message", handleNewMessage);
    };
  }, [socket, handleNewMessage]);

  const toggleLocalAudioTrack = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  const toggleLocalVideoTrack = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const terminateCallAndCleanup = () => {
    if (peerRef.current) {
      peerRef.current.destroy();
      peerRef.current = null;
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }
    socket.emit("leave:room", { roomId: room });
    router.push(`/${user?.role}`);
    setIsConnected(false);
  };

  const handleCallEndRequest = () => {
    if (user?.role === Roles.INTERVIEWER) {
      setShowFeedbackModal(true);
    } else {
      terminateCallAndCleanup();
    }
  };

  const openEndCallConfirmation = () => {
    if (user?.role === Roles.INTERVIEWER) {
      setShowIsEndCallModal(true);
    } else {
      handleCallEndRequest();
    }
  };

  const handleFeedbackSubmission = async (feedback: IInterviewFeedback) => {
    const response = await updateInterviewWithFeedback(interviewId!, feedback);
    if (response.success) {
      toast.success("Feedback submitted and interview ended");
    }
    setShowFeedbackModal(false);
    terminateCallAndCleanup();
  };

  const handleSendMessage = (content: string) => {
    const newMessage: IMessage = {
      id: Date.now().toString(),
      content,
      sender: socket.id!,
      timestamp: new Date(),
    };
    socket.emit("new:message", { roomId: room, message: newMessage });
  };

  const handleScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const screenTrack = screenStream.getVideoTracks()[0];
      const senderTrack = localStreamRef.current?.getVideoTracks()[0];

      if (peerRef.current && senderTrack) {
        // Replace camera feed with screen
        peerRef.current.replaceTrack(senderTrack, screenTrack, localStreamRef.current!);

        if (remoteScreenRef.current) {
          remoteScreenRef.current.srcObject = screenStream;
        }

        setIsScreenSharing(true);
        setShowRemoteScreen(true);

        // When user stops sharing, revert back
        screenTrack.onended = () => {
          if (peerRef.current && senderTrack) {
            peerRef.current.replaceTrack(screenTrack, senderTrack, localStreamRef.current!);
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = localStreamRef.current;
            }
          }
          setIsScreenSharing(false);
          setShowRemoteScreen(false);
        };
      }
    } catch (err) {
      console.error("Screen share error:", err);
    }
  };

  const handleSaveNote = (content: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      content,
      timestamp: new Date(),
      author: "local",
    };
    setNotes((prev) => [...prev, newNote]);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-violet-950 relative">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg">
              <Clock className="w-4 h-4 text-white" />
              <span className="text-white text-sm">
                {formatDuration(callDuration)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Screen share warning */}
      {showSlotEndWarning && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-40 animate-bounce">
          <div className="bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-lg">
            ⚠️ Interview ends in 10 minutes
          </div>
        </div>
      )}

      {/* Google Meet Style Video Layout */}
      <div
        className={`h-screen transition-all duration-300 ${
          isChatOpen ? "mr-96" : ""
        }`}
      >
        <div className="h-full p-4 pt-16">
          {showRemoteScreen ? (
            // Screen sharing layout: Main screen + sidebar with videos
            <div className="h-full flex gap-4">
              {/* Main screen share area */}
              <div className="flex-1 relative">
                <VideoPlayer
                  videoRef={remoteScreenRef as RefObject<HTMLVideoElement>}
                  label="Screen Share"
                  className="h-full w-full"
                />
              </div>
              
              {/* Right sidebar with video feeds */}
              <div className="w-64 flex flex-col gap-4">
                <VideoPlayer
                  videoRef={remoteVideoRef as RefObject<HTMLVideoElement>}
                  label="Remote"
                  className="h-1/2 w-full rounded-lg"
                />
                <VideoPlayer
                  videoRef={localVideoRef as RefObject<HTMLVideoElement>}
                  isLocal={true}
                  label="You"
                  isAudioEnabled={isAudioEnabled}
                  isVideoEnabled={isVideoEnabled}
                  className="h-1/2 w-full rounded-lg"
                />
              </div>
            </div>
          ) : (
            // Normal video call layout: Main remote + small local overlay
            <div className="h-full relative">
              {/* Main remote video */}
              <VideoPlayer
                videoRef={remoteVideoRef as RefObject<HTMLVideoElement>}
                label="Remote"
                className="h-full w-full"
              />
              
              {/* Local video overlay in bottom right */}
              <div className="absolute bottom-4 right-4 w-64 h-48 z-20">
                <VideoPlayer
                  videoRef={localVideoRef as RefObject<HTMLVideoElement>}
                  isLocal={true}
                  label="You"
                  isAudioEnabled={isAudioEnabled}
                  isVideoEnabled={isVideoEnabled}
                  className="h-full w-full rounded-lg shadow-lg border-2 border-white/20"
                />
              </div>
            </div>
          )}
          
          {!isConnected && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
              <h2 className="text-xl font-semibold mb-2 text-white">
                Waiting for others to join
              </h2>
              <p className="text-gray-300">
                Share the room ID with participants
              </p>
            </div>
          )}
        </div>
      </div>

      <VideoControls
        isAudioEnabled={isAudioEnabled}
        isVideoEnabled={isVideoEnabled}
        onToggleAudio={toggleLocalAudioTrack}
        onToggleVideo={toggleLocalVideoTrack}
        onEndCall={openEndCallConfirmation}
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
        isChatOpen={isChatOpen}
        onStartScreenShare={handleScreenShare}
        onToggleCompiler={() => {}}
        isCompilerOpen={false}
        onStopScreenShare={() => {}}
        isScreenSharing={isScreenSharing}
      />

      {isChatOpen && (
        <ChatPanel
          messages={messages}
          notes={notes}
          onSendMessage={handleSendMessage}
          onSaveNote={handleSaveNote}
          onClose={() => setIsChatOpen(false)}
        />
      )}

      <Modal
        isOpen={showIsEndCallModal}
        onClose={() => setShowIsEndCallModal(false)}
        title="End Call"
        description="Are you sure you want to end the call?"
        confirmText="End Call"
        onConfirm={handleCallEndRequest}
      />

      <InterviewFeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        onConfirm={handleFeedbackSubmission}
      />
    </div>
  );
};

export default RoomPage;