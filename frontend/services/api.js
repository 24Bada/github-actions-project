/**
 * Kora Messenger — API Service
 *
 * Centralized HTTP client using fetch.
 * All API calls go through this module.
 */

import { CONFIG } from "../config/config";

const BASE_URL = CONFIG.API_BASE_URL;

/**
 * Core fetch wrapper with auth header injection and error handling.
 */
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const token = await getStoredToken();

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: data.message || "Request failed",
        errors: data.errors,
      };
    }

    return { success: true, status: response.status, ...data };
  } catch (error) {
    return {
      success: false,
      status: 0,
      message: error.message || "Network error. Check your connection.",
    };
  }
}

// Simple token getter (AsyncStorage is async, so we cache it)
let _cachedToken = null;
async function getStoredToken() {
  if (_cachedToken) return _cachedToken;
  try {
    const AsyncStorage = require("@react-native-async-storage/async-storage").default;
    _cachedToken = await AsyncStorage.getItem("@kora_token");
    return _cachedToken;
  } catch {
    return null;
  }
}

export function setCachedToken(token) {
  _cachedToken = token;
}

// ====================== AUTH ======================

export const authAPI = {
  register: (data) =>
    request(CONFIG.ENDPOINTS.AUTH.REGISTER, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data) =>
    request(CONFIG.ENDPOINTS.AUTH.LOGIN, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  logout: () =>
    request(CONFIG.ENDPOINTS.AUTH.LOGOUT, { method: "POST" }),

  forgotPassword: (data) =>
    request(CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  resetPassword: (data) =>
    request(CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  verifyOTP: (data) =>
    request(CONFIG.ENDPOINTS.AUTH.VERIFY_OTP, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  resendOTP: (data) =>
    request(CONFIG.ENDPOINTS.AUTH.RESEND_OTP, {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// ====================== USERS ======================

export const userAPI = {
  getProfile: () => request(CONFIG.ENDPOINTS.USERS + "/me"),
  updateProfile: (data) =>
    request(CONFIG.ENDPOINTS.USERS + "/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  searchUsers: (query) =>
    request(`${CONFIG.ENDPOINTS.USERS}/search?q=${encodeURIComponent(query)}`),
  getUser: (id) => request(`${CONFIG.ENDPOINTS.USERS}/${id}`),
};

// ====================== CONVERSATIONS ======================

export const conversationAPI = {
  list: () => request(CONFIG.ENDPOINTS.CONVERSATIONS),
  create: (data) =>
    request(CONFIG.ENDPOINTS.CONVERSATIONS, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  get: (id) => request(`${CONFIG.ENDPOINTS.CONVERSATIONS}/${id}`),
};

// ====================== MESSAGES ======================

export const messageAPI = {
  list: (conversationId, page = 1) =>
    request(`${CONFIG.ENDPOINTS.MESSAGES}/${conversationId}?page=${page}`),
  send: (data) =>
    request(CONFIG.ENDPOINTS.MESSAGES, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  delete: (id) =>
    request(`${CONFIG.ENDPOINTS.MESSAGES}/${id}`, { method: "DELETE" }),
};

// ====================== STATUS ======================

export const statusAPI = {
  list: () => request(CONFIG.ENDPOINTS.STATUS),
  create: (data) =>
    request(CONFIG.ENDPOINTS.STATUS, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  delete: (id) =>
    request(`${CONFIG.ENDPOINTS.STATUS}/${id}`, { method: "DELETE" }),
};

// ====================== CHANNELS ======================

export const channelAPI = {
  list: () => request(CONFIG.ENDPOINTS.CHANNELS),
  create: (data) =>
    request(CONFIG.ENDPOINTS.CHANNELS, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  get: (id) => request(`${CONFIG.ENDPOINTS.CHANNELS}/${id}`),
  follow: (id) =>
    request(`${CONFIG.ENDPOINTS.CHANNELS}/${id}/follow`, { method: "POST" }),
  unfollow: (id) =>
    request(`${CONFIG.ENDPOINTS.CHANNELS}/${id}/follow`, { method: "DELETE" }),
};

// ====================== PREMIUM ======================

export const premiumAPI = {
  getPlans: () => request(CONFIG.ENDPOINTS.PREMIUM + "/plans"),
  getStatus: () => request(CONFIG.ENDPOINTS.PREMIUM + "/status"),
  subscribe: (planId) =>
    request(CONFIG.ENDPOINTS.PREMIUM + "/subscribe", {
      method: "POST",
      body: JSON.stringify({ planId }),
    }),
};

export default {
  auth: authAPI,
  user: userAPI,
  conversation: conversationAPI,
  message: messageAPI,
  status: statusAPI,
  channel: channelAPI,
  premium: premiumAPI,
};
