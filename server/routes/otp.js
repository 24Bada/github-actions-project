/**
 * Kora Server — OTP Routes
 */

const express = require("express");
const router = express.Router();
const { authLimiter } = require("../middleware/rateLimiter");
const otpController = require("../controllers/otpController");

router.post("/verify", authLimiter, otpController.verifyOtp);
router.post("/resend", authLimiter, otpController.resendOtp);

module.exports = router;
