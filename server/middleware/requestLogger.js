/**
 * Kora Server — Request Logger
 *
 * Logs incoming requests in development mode.
 */

const config = require("../config");

function requestLogger(req, res, next) {
  if (config.isProduction) return next();

  const start = Date.now();
  const { method, url } = req;

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${method} ${url} ${res.statusCode} ${duration}ms`);
  });

  next();
}

module.exports = requestLogger;
