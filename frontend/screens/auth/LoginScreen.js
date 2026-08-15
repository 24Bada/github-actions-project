/**
 * Kora Messenger — Login Screen
 *
 * Email/password login + Google/Apple (coming soon).
 */

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeContext } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { authAPI } from "../../services/api";
import { CONFIG } from "../../config/config";
import { spacing, layout } from "../../theme";

export default function LoginScreen({ navigation }) {
  const { theme } = useThemeContext();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    setErrors({});

    if (!email.trim()) {
      setErrors({ email: "Email is required" });
      return;
    }
    if (!password) {
      setErrors({ password: "Password is required" });
      return;
    }

    setLoading(true);
    const result = await authAPI.login({ email: email.trim(), password });
    setLoading(false);

    if (result.success && result.token) {
      await login(result.token, result.user);
    } else {
      Alert.alert("Login failed", result.message || "Please check your credentials.");
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        {/* Header */}
        <Text style={[styles.title, { color: theme.colors.text }]}>Welcome back</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Sign in to your Kora account
        </Text>

        {/* Form */}
        <View style={styles.form}>
          <View>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Email</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.text,
                  borderColor: errors.email ? theme.colors.error : theme.colors.border,
                },
              ]}
              placeholder="you@example.com"
              placeholderTextColor={theme.colors.textTertiary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.email && (
              <Text style={[styles.error, { color: theme.colors.error }]}>{errors.email}</Text>
            )}
          </View>

          <View>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Password</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.text,
                  borderColor: errors.password ? theme.colors.error : theme.colors.border,
                },
              ]}
              placeholder="••••••••"
              placeholderTextColor={theme.colors.textTertiary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {errors.password && (
              <Text style={[styles.error, { color: theme.colors.error }]}>{errors.password}</Text>
            )}
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
            <Text style={[styles.link, { color: theme.colors.primary }]}>
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login button */}
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.primaryButtonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={[styles.dividerLine, { backgroundColor: theme.colors.border }]} />
          <Text style={[styles.dividerText, { color: theme.colors.textTertiary }]}>or</Text>
          <View style={[styles.dividerLine, { backgroundColor: theme.colors.border }]} />
        </View>

        {/* OAuth buttons — coming soon state */}
        <TouchableOpacity
          style={[styles.oauthButton, { borderColor: theme.colors.border, backgroundColor: theme.colors.surface }]}
          onPress={() => Alert.alert("Coming Soon", "Google Sign-In will be available once Google Cloud is configured.")}
        >
          <Text style={styles.oauthIcon}>G</Text>
          <Text style={[styles.oauthText, { color: theme.colors.text }]}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.oauthButton, { borderColor: theme.colors.border, backgroundColor: theme.colors.surface }]}
          onPress={() => Alert.alert("Coming Soon", "Apple Sign-In will be available once Apple Developer credentials are configured.")}
        >
          <Text style={styles.oauthIcon}></Text>
          <Text style={[styles.oauthText, { color: theme.colors.text }]}>Continue with Apple</Text>
        </TouchableOpacity>

        {/* Register link */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={[styles.link, { color: theme.colors.primary }]}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: spacing.xl, paddingTop: spacing.xxxl },
  title: { fontSize: 28, fontWeight: "700", marginBottom: spacing.xs },
  subtitle: { fontSize: 15, marginBottom: spacing.xl },
  form: { gap: spacing.md, marginBottom: spacing.lg },
  label: { fontSize: 13, fontWeight: "600", marginBottom: spacing.xs },
  input: {
    height: layout.inputHeights.md,
    borderRadius: layout.radius.md,
    paddingHorizontal: spacing.md,
    fontSize: 15,
    borderWidth: 1,
  },
  error: { fontSize: 13, marginTop: spacing.xs },
  link: { fontSize: 14, fontWeight: "500", alignSelf: "flex-end", marginTop: spacing.sm },
  primaryButton: {
    height: layout.buttonHeights.lg,
    borderRadius: layout.radius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: { fontSize: 16, fontWeight: "600", color: "#FFFFFF" },
  divider: { flexDirection: "row", alignItems: "center", marginVertical: spacing.lg },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { fontSize: 13, marginHorizontal: spacing.md },
  oauthButton: {
    height: layout.buttonHeights.md,
    borderRadius: layout.radius.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
  oauthIcon: { fontSize: 20, fontWeight: "700" },
  oauthText: { fontSize: 15, fontWeight: "500" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: spacing.xl },
  footerText: { fontSize: 14 },
});
