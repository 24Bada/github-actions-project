/**
 * Kora Server — Auth Middleware
 *
 * Verifies JWT token from Authorization header.
 * Attaches user document to req.user.
 */

const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/User");

async function auth(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication required." });
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, config.jwtSecret);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Invalid or expired token." });
    }
    next(err);
  }
}

// Optional auth — continues even without token
async function optionalAuth(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return next();
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(decoded.userId);
    if (user) {
      req.user = user;
      req.token = token;
    }
    next();
  } catch {
    next();
  }
}

module.exports = { auth, optionalAuth };
