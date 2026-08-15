/**
 * Kora Messenger — Centralized Configuration
 *
 * All environment-specific values live here.
 * Switch between development and production by changing API_BASE_URL.
 * Never hard-code URLs, IPs, or secrets anywhere else in the app.
 */

// Use Expo env vars or fallback to local dev
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:5000";

export const CONFIG = {
  API_BASE_URL,
  SOCKET_URL: API_BASE_URL,

  // Feature flags — set to true when a service is configured
  GOOGLE_AUTH_ENABLED: false,
  APPLE_AUTH_ENABLED: false,
  PAYMENTS_ENABLED: false,
  TRANSLATION_ENABLED: false,
  CLOUD_STORAGE_ENABLED: false,
  CALLS_ENABLED: false,

  // API endpoints
  ENDPOINTS: {
    AUTH: {
      REGISTER: "/api/auth/register",
      LOGIN: "/api/auth/login",
      LOGOUT: "/api/auth/logout",
      REFRESH: "/api/auth/refresh",
      FORGOT_PASSWORD: "/api/auth/forgot-password",
      RESET_PASSWORD: "/api/auth/reset-password",
      VERIFY_OTP: "/api/otp/verify",
      RESEND_OTP: "/api/otp/resend",
    },
    USERS: "/api/users",
    CONVERSATIONS: "/api/conversations",
    MESSAGES: "/api/messages",
    STATUS: "/api/status",
    CHANNELS: "/api/channels",
    PREMIUM: "/api/premium",
    BUSINESS: "/api/business",
    MEDIA: "/api/media",
  },

  // App metadata
  APP_NAME: "Kora Messenger",
  APP_VERSION: "1.0.0",
};

export default CONFIG;
