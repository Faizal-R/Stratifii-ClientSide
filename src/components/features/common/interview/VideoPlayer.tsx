import React from 'react';
import { Mic, MicOff, VideoOff, User } from 'lucide-react';

interface VideoPlayerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isLocal?: boolean;
  isRemote?: boolean;
  label: string;
  isAudioEnabled?: boolean;
  isVideoEnabled?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoRef,
  isLocal = false,
  isRemote = false,
  label,
  isAudioEnabled = true,
  isVideoEnabled = true,
  className = "",
  variant = 'primary'
}) => {
  const isPrimary = variant === 'primary';

  return (
    <div className={`relative group ${className}`}>
      <div className={`relative overflow-hidden bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm w-full h-full ${
        isPrimary 
          ? 'rounded-2xl border-2 border-white/10 shadow-2xl' 
          : 'rounded-xl border border-white/20 shadow-xl'
      }`}>
        <video
          ref={videoRef}
          autoPlay
          muted={isLocal}
          playsInline
          className={`w-full h-full object-cover ${!isVideoEnabled ? 'hidden' : ''} ${
            isPrimary ? 'rounded-2xl' : 'rounded-xl'
          }`}
        />
        
        {/* Video disabled overlay */}
        {!isVideoEnabled && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className={`bg-gradient-to-br from-purple-600 to-violet-700 rounded-full flex items-center justify-center shadow-2xl ${
                isPrimary ? 'w-32 h-32' : 'w-16 h-16'
              }`}>
                <User className={`text-white ${isPrimary ? 'w-16 h-16' : 'w-8 h-8'}`} />
              </div>
              <div className={`absolute inset-0 bg-gradient-to-br from-purple-600 to-violet-700 rounded-full opacity-20 animate-pulse`}></div>
            </div>
          </div>
        )}
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 rounded-xl"></div>
        
        {/* Video label and status */}
        <div className={`absolute bottom-0 left-0 right-0 p-3 ${isPrimary ? 'p-4' : 'p-2'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-white flex items-center space-x-2 border border-white/20 ${
                isPrimary ? 'text-sm' : 'text-xs'
              }`}>
                {!isAudioEnabled && <MicOff className={`text-red-400 ${isPrimary ? 'w-4 h-4' : 'w-3 h-3'}`} />}
                <span className="font-medium">{label}</span>
              </div>
            </div>
            
            {/* Connection quality indicator */}
            <div className="flex items-center space-x-1">
              <div className="w-1 h-3 bg-green-500 rounded-full opacity-80"></div>
              <div className="w-1 h-4 bg-green-500 rounded-full opacity-60"></div>
              <div className="w-1 h-2 bg-green-500 rounded-full opacity-40"></div>
            </div>
          </div>
        </div>

        {/* Video off indicator */}
        {!isVideoEnabled && (
          <div className={`absolute top-3 right-3 ${isPrimary ? 'top-4 right-4' : ''}`}>
            <div className="bg-red-600/90 backdrop-blur-sm p-2 rounded-full border border-red-400/30 shadow-lg">
              <VideoOff className={`text-white ${isPrimary ? 'w-5 h-5' : 'w-3 h-3'}`} />
            </div>
          </div>
        )}

        {/* Local video indicator */}
        {isLocal && (
          <div className={`absolute top-3 left-3 ${isPrimary ? 'top-4 left-4' : ''}`}>
            <div className="bg-blue-600/90 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs font-medium border border-blue-400/30 shadow-lg">
              You
            </div>
          </div>
        )}

        {/* Hover overlay for secondary videos */}
        {!isPrimary && (
          <div className="absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/10 transition-all duration-300 rounded-xl border-2 border-transparent group-hover:border-purple-400/50"></div>
        )}
      </div>
    </div>
  );
};