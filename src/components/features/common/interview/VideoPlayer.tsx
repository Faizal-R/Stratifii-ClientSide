import React, { RefObject } from 'react';
import { Mic, MicOff, Video, VideoOff, User } from 'lucide-react';

interface VideoPlayerProps {
  videoRef?: RefObject<HTMLVideoElement>;
  label?: string;
  isLocal?: boolean;
  isAudioEnabled?: boolean;
  isVideoEnabled?: boolean;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoRef,
  label,
  isLocal = false,
  isAudioEnabled = true,
  isVideoEnabled = true,
  className = "",
}) => {
  return (
    <div className={`relative bg-gray-900 rounded-xl overflow-hidden ${className}`}>
      {/* Video Element */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isLocal}
        className={`w-full h-full object-cover ${!isVideoEnabled ? 'invisible' : ''}`}
      />

      {/* Video Disabled Overlay */}
      {!isVideoEnabled && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-gray-700 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-300 text-sm font-medium">{label}</p>
          </div>
        </div>
      )}

      {/* Status Indicators */}
      <div className="absolute top-3 left-3 flex space-x-2">
        {/* Audio Status */}
        <div className={`p-2 rounded-lg backdrop-blur-sm ${
          isAudioEnabled 
            ? 'bg-green-600/70 border border-green-500/50' 
            : 'bg-red-600/70 border border-red-500/50'
        }`}>
          {isAudioEnabled ? (
            <Mic className="w-4 h-4 text-white" />
          ) : (
            <MicOff className="w-4 h-4 text-white" />
          )}
        </div>

        {/* Video Status */}
        <div className={`p-2 rounded-lg backdrop-blur-sm ${
          isVideoEnabled 
            ? 'bg-blue-600/70 border border-blue-500/50' 
            : 'bg-red-600/70 border border-red-500/50'
        }`}>
          {isVideoEnabled ? (
            <Video className="w-4 h-4 text-white" />
          ) : (
            <VideoOff className="w-4 h-4 text-white" />
          )}
        </div>
      </div>

      {/* Label */}
      {label && (
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/20">
          <span className="text-white text-sm font-medium">{label}</span>
        </div>
      )}

      {/* Connection Quality Indicator */}
      <div className="absolute top-3 right-3">
        <div className="flex space-x-1">
          <div className="w-1 h-3 bg-green-500 rounded-full"></div>
          <div className="w-1 h-4 bg-green-500 rounded-full"></div>
          <div className="w-1 h-5 bg-green-400 rounded-full"></div>
          <div className="w-1 h-3 bg-gray-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;