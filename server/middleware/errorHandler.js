/**
 * Kora Server — Error Handler Middleware
 *
 * Centralized error handling. Never sends stack traces in production.
 */

function errorHandler(err, req, res, next) {
  console.error("Kora Server Error:", err.message);

  if (res.headersSent) {
    return next(err);
  }

  const status = err.statusCode || 500;
  const message = err.message || "Something went wrong.";

  res.status(status).json({
    message: config.isProduction ? (status === 500 ? "Internal server error." : message) : message,
    ...(config.isProduction ? {} : { stack: err.stack }),
  });
}

const config = require("../config");

module.exports = errorHandler;
