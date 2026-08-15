/**
 * Kora Messenger — Design System: Theme Provider
 *
 * Central theme export. Combines colors, typography, spacing, and layout
 * into a single theme object. Handles light/dark mode switching.
 */

import { useColorScheme } from "react-native";
import colors from "./colors";
import typography from "./typography";
import { spacing, layout } from "./layout";

/**
 * Build a complete theme object for the given color scheme.
 */
function buildTheme(scheme) {
  const palette = scheme === "dark" ? colors.dark : colors.light;

  return {
    scheme,
    colors: palette,
    typography,
    spacing,
    layout,
    // Convenience aliases
    ...palette,
  };
}

/**
 * Hook: useTheme()
 * Returns the theme based on the current system color scheme.
 */
export function useTheme() {
  const scheme = useColorScheme();
  return buildTheme(scheme);
}

/**
 * Hook: useCustomTheme()
 * Returns the theme based on an explicitly provided scheme.
 * Use this when a user selects a theme override (light/dark/system).
 */
export function useCustomTheme(scheme) {
  const systemScheme = useColorScheme();
  const effectiveScheme =
    scheme === "system" || !scheme ? systemScheme : scheme;
  return buildTheme(effectiveScheme);
}

export { colors, typography, spacing, layout };
export default { useTheme, useCustomTheme, colors, typography, spacing, layout };
