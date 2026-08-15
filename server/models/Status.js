/**
 * Kora Server — Status Model
 */

const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["text", "image", "video"],
      default: "text",
    },
    text: { type: String, default: "" },
    media: {
      url: { type: String, default: "" },
      thumbnail: { type: String, default: "" },
      duration: { type: Number, default: 0 },
    },
    background: { type: String, default: "" },
    fontColor: { type: String, default: "" },
    visibility: {
      type: String,
      enum: ["everyone", "contacts", "selected", "nobody"],
      default: "everyone",
    },
    visibleTo: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ],
    viewers: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        viewedAt: { type: Date, default: Date.now },
      },
    ],
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

statusSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Status", statusSchema);
