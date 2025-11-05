import { io } from "socket.io-client";

export const socket = io(process.env.EXPO_PUBLIC_BACKEND_URL!, {
  transports: ["websocket"],
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
});
