/**
 * Kora Messenger — Register Screen
 *
 * Account creation: name, username, email, password.
 * OTP verification happens on the next screen.
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
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeContext } from "../../context/ThemeContext";
import { authAPI } from "../../services/api";
import { spacing, layout } from "../../theme";

export default function RegisterScreen({ navigation }) {
  const { theme } = useThemeContext();

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    if (!form.username.trim()) errs.username = "Username is required";
    else if (form.username.length < 3) errs.username = "Username must be at least 3 characters";
    else if (!/^[a-zA-Z0-9_]+$/.test(form.username))
      errs.username = "Only letters, numbers, and underscores";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Invalid email address";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "Password must be at least 6 characters";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setLoading(true);
    const result = await authAPI.register({
      fullName: form.fullName.trim(),
      username: form.username.trim().toLowerCase(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      password: form.password,
    });
    setLoading(false);

    if (result.success) {
      // Navigate to OTP verification
      navigation.navigate("VerifyOtp", {
        email: form.email.trim().toLowerCase(),
        userId: result.userId,
      });
    } else {
      Alert.alert("Registration failed", result.message || "Please try again.");
    }
  };

  const inputStyle = (error) => [
    styles.input,
    {
      backgroundColor: theme.colors.surface,
      color: theme.colors.text,
      borderColor: error ? theme.colors.error : theme.colors.border,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Text style={[styles.title, { color: theme.colors.text }]}>Create account</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Join Kora Messenger
        </Text>

        {/* Form */}
        <View style={styles.form}>
          <View>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Full name</Text>
            <TextInput
              style={inputStyle(errors.fullName)}
              placeholder="Your name"
              placeholderTextColor={theme.colors.textTertiary}
              value={form.fullName}
              onChangeText={(v) => update("fullName", v)}
            />
            {errors.fullName && (
              <Text style={[styles.error, { color: theme.colors.error }]}>{errors.fullName}</Text>
            )}
          </View>

          <View>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Username</Text>
            <TextInput
              style={inputStyle(errors.username)}
              placeholder="username"
              placeholderTextColor={theme.colors.textTertiary}
              value={form.username}
              onChangeText={(v) => update("username", v)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.username && (
              <Text style={[styles.error, { color: theme.colors.error }]}>{errors.username}</Text>
            )}
          </View>

          <View>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Email</Text>
            <TextInput
              style={inputStyle(errors.email)}
              placeholder="you@example.com"
              placeholderTextColor={theme.colors.textTertiary}
              value={form.email}
              onChangeText={(v) => update("email", v)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.email && (
              <Text style={[styles.error, { color: theme.colors.error }]}>{errors.email}</Text>
            )}
          </View>

          <View>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
              Phone (optional)
            </Text>
            <TextInput
              style={inputStyle()}
              placeholder="+1234567890"
              placeholderTextColor={theme.colors.textTertiary}
              value={form.phone}
              onChangeText={(v) => update("phone", v)}
              keyboardType="phone-pad"
            />
          </View>

          <View>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Password</Text>
            <TextInput
              style={inputStyle(errors.password)}
              placeholder="At least 6 characters"
              placeholderTextColor={theme.colors.textTertiary}
              value={form.password}
              onChangeText={(v) => update("password", v)}
              secureTextEntry
            />
            {errors.password && (
              <Text style={[styles.error, { color: theme.colors.error }]}>{errors.password}</Text>
            )}
          </View>
        </View>

        {/* Register button */}
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.primaryButtonText}>Create Account</Text>
          )}
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={[styles.link, { color: theme.colors.primary }]}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl },
  title: { fontSize: 28, fontWeight: "700", marginTop: spacing.xxl, marginBottom: spacing.xs },
  subtitle: { fontSize: 15, marginBottom: spacing.xl },
  form: { gap: spacing.md, marginBottom: spacing.xl },
  label: { fontSize: 13, fontWeight: "600", marginBottom: spacing.xs },
  input: {
    height: layout.inputHeights.md,
    borderRadius: layout.radius.md,
    paddingHorizontal: spacing.md,
    fontSize: 15,
    borderWidth: 1,
  },
  error: { fontSize: 13, marginTop: spacing.xs },
  primaryButton: {
    height: layout.buttonHeights.lg,
    borderRadius: layout.radius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: { fontSize: 16, fontWeight: "600", color: "#FFFFFF" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: spacing.lg },
  footerText: { fontSize: 14 },
  link: { fontSize: 14, fontWeight: "500" },
});
