
import React from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, MoreVertical } from 'lucide-react';
import { Roles } from '@/constants/enums/roles';

interface VideoControlsProps {
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onEndCall: () => void;
  onToggleChat: () => void;
  isChatOpen: boolean;
  role?:Roles
}

export const VideoControls: React.FC<VideoControlsProps> = ({
  isAudioEnabled,
  isVideoEnabled,
  onToggleAudio,
  onToggleVideo,
  onEndCall,
  onToggleChat,
  isChatOpen,
}) => {

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center space-x-3 bg-gray-800/90 backdrop-blur-sm rounded-full px-6 py-4 shadow-2xl border border-gray-700">
        {/* Audio Toggle */}
        <button
          onClick={onToggleAudio}
          className={`p-3 rounded-full transition-all duration-200 ${
            isAudioEnabled 
              ? 'bg-gray-700 hover:bg-gray-600 text-white' 
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
          title={isAudioEnabled ? 'Mute microphone' : 'Unmute microphone'}
        >
          {isAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </button>
        
        {/* Video Toggle */}
        <button
          onClick={onToggleVideo}
          className={`p-3 rounded-full transition-all duration-200 ${
            isVideoEnabled 
              ? 'bg-gray-700 hover:bg-gray-600 text-white' 
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
          title={isVideoEnabled ? 'Turn off camera' : 'Turn on camera'}
        >
          {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </button>
        
        {/* Chat Toggle */}
        <button
          onClick={onToggleChat}
          className={`p-3 rounded-full transition-all duration-200 ${
            isChatOpen
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-700 hover:bg-gray-600 text-white'
          }`}
          title="Toggle chat"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
        
        {/* More Options */}
        <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200">
          <MoreVertical className="w-5 h-5" />
        </button>
        
        {/* End Call */}
        <button
          onClick={onEndCall}
          className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all duration-200 ml-2"
          title="Leave call"
        >
          <PhoneOff className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};


