// src/store/socketStore.ts
import { create } from "zustand";
import { io, type Socket } from "socket.io-client";

interface SocketState {
  socket: Socket;
}

export const useSocketStore = create<SocketState>(() => ({
  socket: io(process.env.NEXT_PUBLIC_SOCKET_URL),
}));
