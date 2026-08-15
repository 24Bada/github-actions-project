/**
 * Kora Server — Channel Model
 */

const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const channelSchema = new mongoose.Schema(
  {
    channelId: {
      type: String,
      unique: true,
      default: () => nanoid(12),
    },
    name: { type: String, required: true, trim: true },
    handle: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: { type: String, default: "", maxlength: 500 },
    avatar: { type: String, default: "" },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    admins: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ],
    followers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ],
    followerCount: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    category: { type: String, default: "" },
  },
  { timestamps: true }
);

channelSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.followerCount = this.followers.length;
  return obj;
};

module.exports = mongoose.model("Channel", channelSchema);
