/**
 * Kora Server — Auth Routes
 */

const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { authLimiter } = require("../middleware/rateLimiter");
const authController = require("../controllers/authController");

router.post("/register", authLimiter, authController.register);
router.post("/login", authLimiter, authController.login);
router.post("/logout", auth, authController.logout);
router.post("/forgot-password", authLimiter, authController.forgotPassword);
router.post("/reset-password", authLimiter, authController.resetPassword);

module.exports = router;
