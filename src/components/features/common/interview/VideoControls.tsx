import React from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageSquare,
  ScreenShare,
  Terminal,
  MoreVertical,
} from "lucide-react";
import { Roles } from "@/constants/enums/roles";

interface VideoControlsProps {
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onEndCall: () => void;
  onToggleChat: () => void;
  isChatOpen: boolean;
  role?: Roles;
  onStartScreenShare: () => void;
  onToggleCompiler: () => void;
  isCompilerOpen: boolean;
  isScreenSharing?: boolean;
  onStopScreenShare: () => void;
}

export const VideoControls: React.FC<VideoControlsProps> = ({
  isAudioEnabled,
  isVideoEnabled,
  onToggleAudio,
  onToggleVideo,
  onEndCall,
  onToggleChat,
  isChatOpen,
  onStartScreenShare,
  onToggleCompiler,
  isCompilerOpen,
  isScreenSharing,
  onStopScreenShare,
}) => {
  return (
    <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-2xl border border-white/10">
        {/* Audio Toggle */}
        <button
          onClick={onToggleAudio}
          className={`relative p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
            isAudioEnabled
              ? "bg-gray-700/80 hover:bg-gray-600/80 text-white shadow-lg"
              : "bg-red-600/90 hover:bg-red-700/90 text-white shadow-lg animate-pulse"
          } border border-white/10 backdrop-blur-sm`}
          title={isAudioEnabled ? "Mute microphone" : "Unmute microphone"}
        >
          {isAudioEnabled ? (
            <Mic className="w-5 h-5" />
          ) : (
            <MicOff className="w-5 h-5" />
          )}
          {!isAudioEnabled && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
          )}
        </button>

        {/* Video Toggle */}
        <button
          onClick={onToggleVideo}
          className={`relative p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
            isVideoEnabled
              ? "bg-gray-700/80 hover:bg-gray-600/80 text-white shadow-lg"
              : "bg-red-600/90 hover:bg-red-700/90 text-white shadow-lg animate-pulse"
          } border border-white/10 backdrop-blur-sm`}
          title={isVideoEnabled ? "Turn off camera" : "Turn on camera"}
        >
          {isVideoEnabled ? (
            <Video className="w-5 h-5" />
          ) : (
            <VideoOff className="w-5 h-5" />
          )}
          {!isVideoEnabled && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
          )}
        </button>

        {/* Screen Share Toggle */}
        <button
          onClick={isScreenSharing ? onStopScreenShare : onStartScreenShare}
          className={`relative p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
            isScreenSharing
              ? "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg animate-pulse"
              : "bg-gray-700/80 hover:bg-gray-600/80 text-white shadow-lg"
          } border border-white/10 backdrop-blur-sm`}
          title={isScreenSharing ? "Stop sharing screen" : "Share screen"}
        >
          <ScreenShare className={`w-5 h-5 ${isScreenSharing ? 'animate-pulse' : ''}`} />
          {isScreenSharing && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-ping"></div>
          )}
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-white/20 mx-2"></div>

        {/* Chat Toggle */}
        <button
          onClick={onToggleChat}
          className={`relative p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
            isChatOpen
              ? "bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg"
              : "bg-gray-700/80 hover:bg-gray-600/80 text-white shadow-lg"
          } border border-white/10 backdrop-blur-sm`}
          title="Toggle chat"
        >
          <MessageSquare className="w-5 h-5" />
          {isChatOpen && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
          )}
        </button>

        {/* Compiler Toggle */}
        <button
          onClick={onToggleCompiler}
          className={`relative p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
            isCompilerOpen
              ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
              : "bg-gray-700/80 hover:bg-gray-600/80 text-white shadow-lg"
          } border border-white/10 backdrop-blur-sm`}
          title="Toggle compiler"
        >
          <Terminal className="w-5 h-5" />
        </button>

    
       

        {/* Divider */}
        <div className="w-px h-8 bg-white/20 mx-2"></div>

        {/* End Call */}
        <button
          onClick={onEndCall}
          className="relative p-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transition-all duration-300 transform hover:scale-110 shadow-2xl border border-red-400/30 backdrop-blur-sm group"
          title="End call"
        >
          <PhoneOff className="w-5 h-5 group-hover:animate-pulse" />
          <div className="absolute inset-0 bg-red-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
        </button>
      </div>
      
      {/* Controls hint */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-xs text-gray-400 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
          Press space to toggle mute
        </p>
      </div>
    </div>
  );
};