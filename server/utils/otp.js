/**
 * Kora Server — OTP Utility
 *
 * Generates secure numeric OTP codes.
 * Never logs real OTPs in production.
 */

const crypto = require("crypto");
const config = require("../config");

function generateOtp() {
  // 6-digit code
  const buffer = crypto.randomBytes(3);
  const code = parseInt(buffer.toString("hex"), 16) % 1000000;
  return code.toString().padStart(6, "0");
}

module.exports = { generateOtp };
