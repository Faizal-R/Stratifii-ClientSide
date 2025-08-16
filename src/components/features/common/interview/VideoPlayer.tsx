import React from 'react';
import { Mic, MicOff, VideoOff } from 'lucide-react';

interface VideoPlayerProps {
  videoRef: React.RefObject<HTMLVideoElement> ;
  isLocal?: boolean;
  isRemote?: boolean;
  label: string;
  isAudioEnabled?: boolean;
  isVideoEnabled?: boolean;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoRef,
  isLocal = false,
  isRemote = false,
  label,
  isAudioEnabled = true,
  isVideoEnabled = true,
  className = ""
}) => {
  return (
    <div className={`relative group ${className}`}>
      <div className="relative overflow-hidden rounded-lg bg-gray-900 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          muted={isLocal}
          playsInline
          className={`w-full h-full object-cover ${!isVideoEnabled ? 'hidden' : ''}`}
        />
        
        {/* Video disabled overlay */}
        {!isVideoEnabled && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-semibold">
                {label.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        )}
        
        {/* Video label and status */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-2">
          <div className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-white text-sm flex items-center space-x-1">
            {!isAudioEnabled && <MicOff className="w-3 h-3 text-red-400" />}
            <span>{label}</span>
          </div>
        </div>

        {/* Video off indicator */}
        {!isVideoEnabled && (
          <div className="absolute top-3 right-3">
            <div className="bg-red-600 p-1 rounded-full">
              <VideoOff className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};