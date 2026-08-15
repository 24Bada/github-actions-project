/**
 * Kora Server — Subscription Model (Kora Premium)
 */

const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    planId: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled", "pending", "trialing"],
      default: "pending",
    },
    provider: {
      type: String,
      enum: ["stripe", "google_play", "apple", "manual", "none"],
      default: "none",
    },
    providerSubscriptionId: { type: String, default: "" },
    startDate: { type: Date },
    expirationDate: { type: Date },
    autoRenew: { type: Boolean, default: false },
    cancelledAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
