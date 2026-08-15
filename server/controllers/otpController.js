/**
 * Kora Server — OTP Controller
 *
 * Verify OTP, resend OTP.
 */

const config = require("../config");
const VerificationCode = require("../models/VerificationCode");
const User = require("../models/User");
const { sendOtpEmail } = require("../services/emailService");
const { generateOtp } = require("../utils/otp");

async function verifyOtp(req, res, next) {
  try {
    const { email, code, userId } = req.body;

    const record = await VerificationCode.findOne({
      email,
      code,
      type: "registration",
      used: false,
    });

    if (!record) {
      return res.status(400).json({ message: "Invalid verification code." });
    }

    if (record.expiresAt < new Date()) {
      return res.status(400).json({ message: "Verification code expired." });
    }

    if (record.attempts >= record.maxAttempts) {
      return res.status(429).json({ message: "Too many attempts. Request a new code." });
    }

    record.used = true;
    await record.save();

    // Verify user email
    if (userId) {
      await User.findByIdAndUpdate(userId, { isEmailVerified: true });
    }

    res.json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (err) {
    next(err);
  }
}

async function resendOtp(req, res, next) {
  try {
    const { email } = req.body;

    // Invalidate previous codes
    await VerificationCode.updateMany(
      { email, used: false },
      { used: true }
    );

    const otp = generateOtp();
    await VerificationCode.create({
      email,
      code: otp,
      type: "registration",
      expiresAt: new Date(Date.now() + config.otpExpiresMinutes * 60 * 1000),
    });

    await sendOtpEmail(email, otp);

    res.json({ success: true, message: "New code sent." });
  } catch (err) {
    next(err);
  }
}

module.exports = { verifyOtp, resendOtp };
