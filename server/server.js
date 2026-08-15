/**
 * Kora Server — Main Entry Point
 *
 * Express + Socket.IO server.
 * Loads env vars, connects to MongoDB, mounts routes, starts listening.
 */

require("dotenv").config();

const http = require("http");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const config = require("./config");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/auth");
const otpRoutes = require("./routes/otp");
const userRoutes = require("./routes/users");
const conversationRoutes = require("./routes/conversations");
const messageRoutes = require("./routes/messages");
const statusRoutes = require("./routes/status");
const channelRoutes = require("./routes/channels");
const premiumRoutes = require("./routes/premium");
const businessRoutes = require("./routes/business");
const mediaRoutes = require("./routes/media");

// Middleware
const errorHandler = require("./middleware/errorHandler");
const requestLogger = require("./middleware/requestLogger");

// Socket setup
const setupSockets = require("./sockets");

async function startServer() {
  // Connect to MongoDB
  await connectDB();

  const app = express();
  const server = http.createServer(app);

  // Socket.IO
  const io = new Server(server, {
    cors: {
      origin: config.clientUrl || "*",
      methods: ["GET", "POST"],
    },
  });

  setupSockets(io);

  // Global middleware
  app.use(helmet());
  app.use(
    cors({
      origin: config.clientUrl || "*",
      credentials: true,
    })
  );
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));
  app.use(requestLogger);

  // Static files for uploads
  app.use("/uploads", express.static(require("path").join(__dirname, "uploads")));

  // Health check
  app.get("/health", (req, res) => {
    res.json({ status: "ok", service: "kora-server", version: "1.0.0" });
  });

  // API Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/otp", otpRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/conversations", conversationRoutes);
  app.use("/api/messages", messageRoutes);
  app.use("/api/status", statusRoutes);
  app.use("/api/channels", channelRoutes);
  app.use("/api/premium", premiumRoutes);
  app.use("/api/business", businessRoutes);
  app.use("/api/media", mediaRoutes);

  // Error handler (must be last)
  app.use(errorHandler);

  const PORT = config.port || 5000;
  server.listen(PORT, () => {
    console.log(`✅ Kora server running on port ${PORT}`);
    console.log(`   Environment: ${config.nodeEnv}`);
    console.log(`   Socket.IO: ready`);
  });
}

startServer().catch((err) => {
  console.error("❌ Failed to start Kora server:", err);
  process.exit(1);
});
