/**
 * Kora Server — Conversation Model
 */

const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["direct", "group"],
      default: "direct",
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    name: { type: String, default: "" }, // For group chats
    avatar: { type: String, default: "" },
    description: { type: String, default: "" },
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    lastMessageText: { type: String, default: "" },
    lastMessageAt: { type: Date, default: Date.now },
    // Per-user settings
    settings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        muted: { type: Boolean, default: false },
        pinned: { type: Boolean, default: false },
        unreadCount: { type: Number, default: 0 },
        archived: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

conversationSchema.index({ participants: 1 });

module.exports = mongoose.model("Conversation", conversationSchema);
