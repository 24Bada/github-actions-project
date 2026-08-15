/**
 * Kora Messenger — Date Utilities
 *
 * Dynamic date formatting for chat separators and timestamps.
 * Never hard-coded.
 */

/**
 * Format a timestamp for chat list (e.g., "12:30 PM", "Yesterday", "Aug 7")
 */
export function formatChatTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (isSameDay(date, now)) {
    return formatTime(date);
  } else if (diffDays === 1 || isYesterday(date, now)) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return date.toLocaleDateString("en-US", { weekday: "long" });
  } else {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }
}

/**
 * Generate a date separator label for messages.
 * Returns: "Today", "Yesterday", "Monday", or "August 7, 2026"
 */
export function getDateSeparatorLabel(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();

  if (isSameDay(date, now)) return "Today";
  if (isYesterday(date, now)) return "Yesterday";

  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  if (diffDays < 7) {
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format time as "12:30 PM"
 */
export function formatTime(date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Check if two dates are the same calendar day
 */
function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Check if date is yesterday relative to now
 */
function isYesterday(date, now) {
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  return isSameDay(date, yesterday);
}

/**
 * Format last seen ("last seen today at 12:30 PM")
 */
export function formatLastSeen(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();

  if (isSameDay(date, now)) {
    return `last seen today at ${formatTime(date)}`;
  } else if (isYesterday(date, now)) {
    return `last seen yesterday at ${formatTime(date)}`;
  } else {
    return `last seen ${date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} at ${formatTime(date)}`;
  }
}

/**
 * Group messages by date for separators
 */
export function groupMessagesByDate(messages) {
  const groups = [];
  let currentDate = null;

  for (const msg of messages) {
    const label = getDateSeparatorLabel(msg.createdAt || msg.timestamp);

    if (label !== currentDate) {
      groups.push({ type: "separator", label, date: msg.createdAt });
      currentDate = label;
    }

    groups.push({ type: "message", ...msg });
  }

  return groups;
}

export default { formatChatTime, getDateSeparatorLabel, formatTime, formatLastSeen, groupMessagesByDate };
