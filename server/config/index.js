/**
 * Kora Server — Central Configuration
 *
 * All environment-based config lives here.
 * Never access process.env directly elsewhere in the code.
 */

module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",

  // Database
  mongoUri:
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/kora_messenger",

  // JWT
  jwtSecret: process.env.JWT_SECRET || "dev_secret_change_in_production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "dev_refresh_secret",
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d",

  // OTP
  otpExpiresMinutes: parseInt(process.env.OTP_EXPIRES_MINUTES) || 5,
  otpMaxAttempts: parseInt(process.env.OTP_MAX_ATTEMPTS) || 5,

  // Email
  email: {
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT) || 587,
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASS || "",
  },

  // OAuth
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  },
  apple: {
    clientId: process.env.APPLE_CLIENT_ID || "",
    teamId: process.env.APPLE_TEAM_ID || "",
    keyId: process.env.APPLE_KEY_ID || "",
    privateKey: process.env.APPLE_PRIVATE_KEY || "",
  },

  // Payments
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || "",
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "",
  },

  // Cloud Storage
  cloudStorage: {
    provider: process.env.CLOUD_STORAGE_PROVIDER || "",
    key: process.env.CLOUD_STORAGE_KEY || "",
    secret: process.env.CLOUD_STORAGE_SECRET || "",
  },

  // Translation
  translation: {
    apiKey: process.env.TRANSLATION_API_KEY || "",
    apiUrl: process.env.TRANSLATION_API_URL || "",
  },

  // Client
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
};
