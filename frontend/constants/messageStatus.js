/**
 * Kora Messenger — Message Status Constants
 */

export const MESSAGE_STATUS = {
  SENDING: "sending",
  SENT: "sent",
  DELIVERED: "delivered",
  READ: "read",
  FAILED: "failed",
};

export const MESSAGE_TYPES = {
  TEXT: "text",
  IMAGE: "image",
  VIDEO: "video",
  VOICE: "voice",
  DOCUMENT: "document",
  LOCATION: "location",
};

export const DELIVERY_STATUS = {
  PENDING: "pending",
  DELIVERED: "delivered",
  READ: "read",
};

export default { MESSAGE_STATUS, MESSAGE_TYPES, DELIVERY_STATUS };
