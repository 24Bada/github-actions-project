/**
 * Kora Messenger — Design System: Typography
 *
 * Font sizes, weights, and line heights.
 * Uses system fonts by default. Can be swapped for custom fonts.
 */

export const typography = {
  // Font families
  fonts: {
    regular: "System",
    medium: "System",
    semiBold: "System",
    bold: "System",
    // Override these when custom fonts are loaded:
    // regular: "Inter-Regular",
    // medium: "Inter-Medium",
    // semiBold: "Inter-SemiBold",
    // bold: "Inter-Bold",
  },

  // Font sizes (px)
  sizes: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 30,
    display: 36,
    hero: 42,
  },

  // Font weights
  weights: {
    regular: "400",
    medium: "500",
    semiBold: "600",
    bold: "700",
    extraBold: "800",
  },

  // Line heights
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },

  // Letter spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
    widest: 2,
  },

  // Precomposed text styles
  styles: {
    h1: { fontSize: 30, fontWeight: "700", lineHeight: 36 },
    h2: { fontSize: 24, fontWeight: "700", lineHeight: 30 },
    h3: { fontSize: 20, fontWeight: "600", lineHeight: 26 },
    h4: { fontSize: 18, fontWeight: "600", lineHeight: 24 },
    body: { fontSize: 15, fontWeight: "400", lineHeight: 22 },
    bodySmall: { fontSize: 13, fontWeight: "400", lineHeight: 18 },
    caption: { fontSize: 11, fontWeight: "400", lineHeight: 16 },
    label: { fontSize: 13, fontWeight: "600", lineHeight: 18 },
    button: { fontSize: 16, fontWeight: "600", lineHeight: 22 },
    link: { fontSize: 15, fontWeight: "500", lineHeight: 22 },
  },
};

export default typography;
