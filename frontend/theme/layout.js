/**
 * Kora Messenger — Design System: Spacing & Layout
 *
 * Consistent spacing scale and layout values.
 */

export const spacing = {
  // Base spacing scale (px)
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 48,
  massive: 64,

  // Component-specific
  screenPadding: 16,
  cardPadding: 16,
  listItemPadding: 14,
  inputPadding: 14,
  buttonPadding: 16,

  // Gaps
  gapXs: 4,
  gapSm: 8,
  gapMd: 12,
  gapBase: 16,
  gapLg: 20,
  gapXl: 24,
};

export const layout = {
  // Border radius
  radius: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    pill: 999,
    circular: 999,
  },

  // Shadows (for light mode)
  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
    xl: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },

  // Z-index layers
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 100,
    fixed: 200,
    modal: 1000,
    popover: 1100,
    toast: 1200,
    tooltip: 1300,
  },

  // Avatar sizes
  avatarSizes: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 56,
    xxl: 72,
    huge: 96,
  },

  // Icon sizes
  iconSizes: {
    xs: 14,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
    xxl: 32,
  },

  // Button heights
  buttonHeights: {
    sm: 36,
    md: 44,
    lg: 52,
  },

  // Input heights
  inputHeights: {
    sm: 40,
    md: 48,
    lg: 56,
  },

  // Header height
  headerHeight: 56,
  tabBarHeight: 60,
  bottomSheetMinHeight: 200,

  // Max content width (tablet)
  maxContentWidth: 500,
};

export default layout;
