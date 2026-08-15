/**
 * Kora Server — Socket.IO Setup
 *
 * Real-time: messages, typing, presence, delivery receipts.
 */

const jwt = require("jsonwebtoken");
const config = require("./config");
const User = require("./models/User");

// Track online users: socketId -> userId
const onlineUsers = new Map();

function setupSockets(io) {
  // Auth middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error("Authentication required."));
    }

    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      socket.userId = decoded.userId;
      next();
    } catch (err) {
      next(new Error("Invalid token."));
    }
  });

  io.on("connection", async (socket) => {
    const userId = socket.userId;
    console.log(`Socket connected: ${userId}`);

    // Mark user online
    onlineUsers.set(socket.id, userId);
    await User.findByIdAndUpdate(userId, {
      isOnline: true,
    });

    // Broadcast online status
    socket.broadcast.emit("user_online", { userId });

    // Join conversation rooms
    socket.on("join_conversation", (conversationId) => {
      socket.join(`conversation:${conversationId}`);
    });

    socket.on("leave_conversation", (conversationId) => {
      socket.leave(`conversation:${conversationId}`);
    });

    // Typing indicator
    socket.on("typing", ({ conversationId, isTyping }) => {
      socket.to(`conversation:${conversationId}`).emit("typing", {
        conversationId,
        userId,
        isTyping,
      });
    });

    // New message
    socket.on("send_message", (data) => {
      socket.to(`conversation:${data.conversationId}`).emit("new_message", {
        ...data,
        senderId: userId,
      });
    });

    // Message read
    socket.on("message_read", ({ conversationId, messageIds }) => {
      socket.to(`conversation:${conversationId}`).emit("messages_read", {
        conversationId,
        userId,
        messageIds,
      });
    });

    // Disconnect
    socket.on("disconnect", async () => {
      onlineUsers.delete(socket.id);

      // Check if user has other active sockets
      const stillOnline = [...onlineUsers.values()].includes(userId);
      if (!stillOnline) {
        await User.findByIdAndUpdate(userId, {
          isOnline: false,
          lastSeen: new Date(),
        });
        socket.broadcast.emit("user_offline", { userId });
      }
    });
  });
}

module.exports = setupSockets;
