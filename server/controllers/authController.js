/**
 * Kora Server — Auth Controller
 *
 * Register, login, forgot password, reset password.
 */

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const config = require("../config");
const User = require("../models/User");
const VerificationCode = require("../models/VerificationCode");
const { sendOtpEmail } = require("../services/emailService");
const { generateOtp } = require("../utils/otp");

// Generate JWT
function signToken(userId) {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
}

// Register
async function register(req, res, next) {
  try {
    const { fullName, username, email, phone, password } = req.body;

    // Check duplicates
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({ message: "Username already taken." });
    }

    // Create user
    const user = await User.create({
      fullName,
      username,
      email,
      phone: phone || "",
      password,
      isEmailVerified: false,
    });

    // Generate OTP
    const otp = generateOtp();
    await VerificationCode.create({
      email,
      code: otp,
      type: "registration",
      expiresAt: new Date(Date.now() + config.otpExpiresMinutes * 60 * 1000),
    });

    // Send OTP email
    await sendOtpEmail(email, otp);

    res.status(201).json({
      success: true,
      message: "Account created. Check your email for verification code.",
      userId: user._id,
    });
  } catch (err) {
    next(err);
  }
}

// Login
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = signToken(user._id);

    res.json({
      success: true,
      token,
      user: user.toJSON(),
    });
  } catch (err) {
    next(err);
  }
}

// Forgot password
async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No account found with that email." });
    }

    const otp = generateOtp();
    await VerificationCode.create({
      email,
      code: otp,
      type: "password_reset",
      expiresAt: new Date(Date.now() + config.otpExpiresMinutes * 60 * 1000),
    });

    await sendOtpEmail(email, otp);

    res.json({
      success: true,
      message: "Reset code sent to your email.",
    });
  } catch (err) {
    next(err);
  }
}

// Reset password
async function resetPassword(req, res, next) {
  try {
    const { email, code, newPassword } = req.body;

    const record = await VerificationCode.findOne({
      email,
      code,
      type: "password_reset",
      used: false,
    });

    if (!record || record.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired reset code." });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.password = newPassword;
    record.used = true;
    await Promise.all([user.save(), record.save()]);

    res.json({ success: true, message: "Password reset successfully." });
  } catch (err) {
    next(err);
  }
}

// Logout
async function logout(req, res, next) {
  try {
    res.json({ success: true, message: "Logged out." });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, forgotPassword, resetPassword, logout };
