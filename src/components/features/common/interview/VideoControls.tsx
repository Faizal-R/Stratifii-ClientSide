import React from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageCircle, Code2, ScreenShare, ScreenShareOff } from 'lucide-react';

interface VideoControlsProps {
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  isScreenSharing?: boolean;
  isChatOpen: boolean;
  isCompilerOpen: boolean;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onToggleChat: () => void;
  onToggleCompiler: () => void;
  onStartScreenShare: () => void;
  onStopScreenShare: () => void;
  onEndCall: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  isAudioEnabled,
  isVideoEnabled,
  isScreenSharing = false,
  isChatOpen,
  isCompilerOpen,
  onToggleAudio,
  onToggleVideo,
  onToggleChat,
  onToggleCompiler,
  onStartScreenShare,
  onStopScreenShare,
  onEndCall,
}) => {
  const controlButtonClass = "p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg backdrop-blur-md border";
  
  return (
    <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-30">
      <div className="flex items-center space-x-4 bg-black/40 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-2xl">
        {/* Audio Toggle */}
        <button
          onClick={onToggleAudio}
          className={`${controlButtonClass} ${
            isAudioEnabled
              ? 'bg-white/20 border-white/30 text-white hover:bg-white/30'
              : 'bg-red-600/80 border-red-500/50 text-white hover:bg-red-500/90'
          }`}
          title={isAudioEnabled ? 'Mute Audio' : 'Unmute Audio'}
        >
          {isAudioEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
        </button>

        {/* Video Toggle */}
        <button
          onClick={onToggleVideo}
          className={`${controlButtonClass} ${
            isVideoEnabled
              ? 'bg-white/20 border-white/30 text-white hover:bg-white/30'
              : 'bg-red-600/80 border-red-500/50 text-white hover:bg-red-500/90'
          }`}
          title={isVideoEnabled ? 'Turn Off Video' : 'Turn On Video'}
        >
          {isVideoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
        </button>

        {/* Screen Share */}
        <button
          onClick={isScreenSharing ? onStopScreenShare : onStartScreenShare}
          className={`${controlButtonClass} ${
            isScreenSharing
              ? 'bg-blue-600/80 border-blue-500/50 text-white hover:bg-blue-500/90'
              : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
          }`}
          title={isScreenSharing ? 'Stop Screen Share' : 'Start Screen Share'}
        >
          {isScreenSharing ? <ScreenShareOff className="w-6 h-6" /> : <ScreenShare className="w-6 h-6" />}
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-white/20"></div>

        {/* Compiler Toggle */}
        <button
          onClick={onToggleCompiler}
          className={`${controlButtonClass} ${
            isCompilerOpen
              ? 'bg-violet-600/80 border-violet-500/50 text-white hover:bg-violet-500/90'
              : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
          }`}
          title={isCompilerOpen ? 'Close Compiler' : 'Open Compiler'}
        >
          <Code2 className="w-6 h-6" />
        </button>

        {/* Chat Toggle */}
        <button
          onClick={onToggleChat}
          className={`${controlButtonClass} relative ${
            isChatOpen
              ? 'bg-green-600/80 border-green-500/50 text-white hover:bg-green-500/90'
              : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
          }`}
          title={isChatOpen ? 'Close Chat' : 'Open Chat'}
        >
          <MessageCircle className="w-6 h-6" />
          {/* Chat notification dot */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-white/20"></div>

        {/* End Call */}
        <button
          onClick={onEndCall}
          className={`${controlButtonClass} bg-red-600/90 border-red-500/50 text-white hover:bg-red-500 hover:scale-110`}
          title="End Call"
        >
          <PhoneOff className="w-6 h-6" />
        </button>

       
       
      </div>
    </div>
  );
};

export default VideoControls;