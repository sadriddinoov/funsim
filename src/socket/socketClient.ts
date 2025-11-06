import { io, Socket } from "socket.io-client";

const SOCKET_URL = "wss://api.happytel.uz";

export const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
  path: "/socket.io/",
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
});
