/**
 * Kora Server — Report Model
 */

const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reportedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reportedChannel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
    type: {
      type: String,
      enum: ["spam", "harassment", "inappropriate", "fake", "other"],
      default: "other",
    },
    description: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "reviewing", "resolved", "dismissed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
