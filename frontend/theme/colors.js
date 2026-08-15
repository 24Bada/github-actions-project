/**
 * Kora Messenger — Design System: Colors
 *
 * Kora's identity colors. NOT a WhatsApp clone.
 * Primary: Deep indigo-blue (trust, premium, modern)
 * Secondary: Violet-purple (AI, official, creative)
 * Accent: Teal (status, online, freshness)
 */

export const colors = {
  light: {
    // Brand
    primary: "#2563EB",          // Kora blue
    primaryHover: "#1D4ED8",
    primaryLight: "#DBEAFE",
    secondary: "#7C3AED",         // Kora violet
    secondaryLight: "#EDE9FE",

    // Surfaces
    background: "#F9FAFB",
    surface: "#FFFFFF",
    surfaceAlt: "#F3F4F6",
    surfaceElevated: "#FFFFFF",

    // Text
    text: "#111827",
    textSecondary: "#6B7280",
    textTertiary: "#9CA3AF",
    textInverse: "#FFFFFF",

    // Borders
    border: "#E5E7EB",
    borderDark: "#D1D5DB",
    divider: "#F3F4F6",

    // Status colors
    online: "#22C55E",
    offline: "#9CA3AF",
    typing: "#22C55E",
    recording: "#EF4444",

    // Message bubbles
    bubbleOut: "#2563EB",
    bubbleOutText: "#FFFFFF",
    bubbleIn: "#FFFFFF",
    bubbleInText: "#111827",

    // Badges
    badgeOfficial: "#7C3AED",     // Purple — official Kora account
    badgePremium: "#2563EB",      // Blue — Kora Premium
    badgeBusiness: "#F59E0B",     // Gold — Kora Business
    badgeVerified: "#2563EB",

    // Chat background
    chatBackground: "#EFEAE2",
    chatPattern: "rgba(0,0,0,0.02)",

    // Semantic
    success: "#22C55E",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",

    // Unread
    unread: "#2563EB",
    unreadBg: "#DBEAFE",

    // Overlay
    overlay: "rgba(0,0,0,0.5)",
    scrim: "rgba(0,0,0,0.3)",

    // Skeleton loading
    skeleton: "#E5E7EB",
    skeletonHighlight: "#F9FAFB",
  },

  dark: {
    // Brand
    primary: "#3B82F6",
    primaryHover: "#60A5FA",
    primaryLight: "#1E3A5F",
    secondary: "#8B5CF6",
    secondaryLight: "#2D1B69",

    // Surfaces
    background: "#0B1120",
    surface: "#111827",
    surfaceAlt: "#1F2937",
    surfaceElevated: "#1F2937",

    // Text
    text: "#F9FAFB",
    textSecondary: "#9CA3AF",
    textTertiary: "#6B7280",
    textInverse: "#111827",

    // Borders
    border: "#1F2937",
    borderDark: "#374151",
    divider: "#1F2937",

    // Status colors
    online: "#22C55E",
    offline: "#4B5563",
    typing: "#22C55E",
    recording: "#EF4444",

    // Message bubbles
    bubbleOut: "#2563EB",
    bubbleOutText: "#FFFFFF",
    bubbleIn: "#1F2937",
    bubbleInText: "#F9FAFB",

    // Badges
    badgeOfficial: "#8B5CF6",
    badgePremium: "#3B82F6",
    badgeBusiness: "#F59E0B",
    badgeVerified: "#3B82F6",

    // Chat background
    chatBackground: "#0B1120",
    chatPattern: "rgba(255,255,255,0.02)",

    // Semantic
    success: "#22C55E",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#60A5FA",

    // Unread
    unread: "#3B82F6",
    unreadBg: "#1E3A5F",

    // Overlay
    overlay: "rgba(0,0,0,0.7)",
    scrim: "rgba(0,0,0,0.5)",

    // Skeleton loading
    skeleton: "#1F2937",
    skeletonHighlight: "#374151",
  },
};

export default colors;
