/**
 * Kora Messenger — Welcome Screen
 *
 * First screen users see. Introduces Kora with branding.
 */

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeContext } from "../context/ThemeContext";
import { spacing, layout } from "../theme";

export default function WelcomeScreen({ navigation }) {
  const { theme } = useThemeContext();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        {/* Logo / Brand */}
        <View style={styles.logoContainer}>
          <View style={[styles.logoCircle, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.logoText}>K</Text>
          </View>
          <Text style={[styles.brandName, { color: theme.colors.text }]}>
            Kora Messenger
          </Text>
          <Text style={[styles.tagline, { color: theme.colors.textSecondary }]}>
            Connect. Chat. Translate.
          </Text>
        </View>

        {/* Action buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, { borderColor: theme.colors.border }]}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={[styles.secondaryButtonText, { color: theme.colors.text }]}>
              I already have an account
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate("Terms")}>
            <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
              Terms & Conditions
            </Text>
          </TouchableOpacity>
          <Text style={[styles.footerDot, { color: theme.colors.textTertiary }]}> • </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Privacy")}>
            <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxxl,
  },
  logoContainer: { alignItems: "center", marginTop: spacing.huge },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  logoText: {
    fontSize: 42,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  brandName: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  tagline: {
    fontSize: 15,
    fontWeight: "400",
  },
  actions: { gap: spacing.md },
  primaryButton: {
    height: layout.buttonHeights.lg,
    borderRadius: layout.radius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  secondaryButton: {
    height: layout.buttonHeights.lg,
    borderRadius: layout.radius.md,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: spacing.sm,
  },
  footerText: { fontSize: 13 },
  footerDot: { fontSize: 13 },
});
