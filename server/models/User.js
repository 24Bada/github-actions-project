/**
 * Kora Server — User Model
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { nanoid } = require("nanoid");

const userSchema = new mongoose.Schema(
  {
    koraId: {
      type: String,
      unique: true,
      default: () => nanoid(12),
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    avatar: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      maxlength: 200,
      default: "",
    },
    status: {
      type: String,
      default: "Hey there! I'm using Kora Messenger.",
    },
    // Badge system
    isOfficial: { type: Boolean, default: false },    // Purple badge
    isPremium: { type: Boolean, default: false },      // Blue badge
    isBusiness: { type: Boolean, default: false },     // Gold badge
    // Privacy
    privacy: {
      phoneVisible: { type: String, enum: ["everyone", "contacts", "nobody"], default: "everyone" },
      avatarVisible: { type: String, enum: ["everyone", "contacts", "nobody"], default: "everyone" },
      lastSeen: { type: String, enum: ["everyone", "contacts", "nobody"], default: "everyone" },
      onlineStatus: { type: String, enum: ["everyone", "contacts", "nobody"], default: "everyone" },
      readReceipts: { type: Boolean, default: true },
      statusVisibility: { type: String, enum: ["everyone", "contacts", "selected", "nobody"], default: "everyone" },
    },
    // Verification
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    // Status
    isOnline: { type: Boolean, default: false },
    lastSeen: { type: Date, default: Date.now },
    // Device
    fcmToken: { type: String, default: "" },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("User", userSchema);
