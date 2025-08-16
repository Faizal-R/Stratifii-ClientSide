export interface IMessage {
  id:string;
  content: string;
  sender: string;
  timestamp: Date;
}

export interface Note {
  id: string;
  content: string;
  timestamp: Date;
  author: 'local' | 'remote';
}

export interface VideoCallState {
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  isConnected: boolean;
  roomId: string;
}