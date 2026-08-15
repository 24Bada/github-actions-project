/**
 * Kora Messenger — Socket.IO Client
 *
 * Real-time communication: messages, typing, presence, delivery receipts.
 */

import { io } from "socket.io-client";
import { CONFIG } from "../config/config";

let socket = null;

export function connectSocket(token) {
  if (socket && socket.connected) return socket;

  socket = io(CONFIG.SOCKET_URL, {
    transports: ["websocket"],
    autoConnect: true,
    auth: { token },
  });

  socket.on("connect", () => {
    console.log("Kora socket connected");
  });

  socket.on("disconnect", (reason) => {
    console.log("Kora socket disconnected:", reason);
  });

  socket.on("connect_error", (error) => {
    console.log("Kora socket connect error:", error.message);
  });

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function getSocket() {
  return socket;
}

// Event helpers
export function on(event, callback) {
  if (socket) socket.on(event, callback);
}

export function off(event, callback) {
  if (socket) socket.off(event, callback);
}

export function emit(event, data) {
  if (socket) socket.emit(event, data);
}

export default { connectSocket, disconnectSocket, getSocket, on, off, emit };
