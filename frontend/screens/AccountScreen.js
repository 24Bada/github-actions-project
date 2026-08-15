/**
 * Kora — Account Screen
 * Security, change number, two-step verification, device management.
 */

import React from "react";
import {
  SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../theme";
import { useAuth } from "../context/AuthContext";

export default function AccountScreen({ navigation }) {
  const { theme, isDark } = useTheme();
  const { user, logout } = useAuth();

  const items = [
    {
      title: "Security notifications",
      description: "Get alerts for account changes",
      icon: "shield",
      iconType: "feather",
      color: theme.textSecondary,
      onPress: () => {},
    },
    {
      title: "Two-step verification",
      description: "Add extra security to your account",
      icon: "lock",
      iconType: "feather",
      color: theme.textSecondary,
      onPress: () => {},
    },
    {
      title: "Change number",
      description: "Update your phone number",
      icon: "phone",
      iconType: "feather",
      color: theme.textSecondary,
      onPress: () => {},
    },
    {
      title: "Request account info",
      description: "Download your data",
      icon: "download",
      iconType: "feather",
      color: theme.textSecondary,
      onPress: () => {},
    },
    {
      title: "Email verified",
      description: user?.isEmailVerified ? "✓ Verified" : "Not verified",
      icon: "mail",
      iconType: "feather",
      color: user?.isEmailVerified ? theme.success : theme.warning,
      onPress: () => {},
    },
    {
      title: "Delete account",
      description: "Permanently delete your Kora account",
      icon: "trash-2",
      iconType: "feather",
      color: theme.error,
      onPress: () => {},
    },
  ];

  const renderIcon = (item) => {
    if (item.iconType === "material") {
      return <MaterialCommunityIcons name={item.icon} size={24} color={item.color} />;
    }
    return <Feather name={item.icon} size={24} color={item.color} />;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="chevron-left" size={29} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Account</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Info card */}
        <View style={[styles.infoCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Email</Text>
          <Text style={[styles.infoValue, { color: theme.text }]}>{user?.email || "Not set"}</Text>
          <View style={{ height: 1, backgroundColor: theme.border, marginVertical: 12 }} />
          <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Phone</Text>
          <Text style={[styles.infoValue, { color: theme.text }]}>{user?.phone || "Not set"}</Text>
          <View style={{ height: 1, backgroundColor: theme.border, marginVertical: 12 }} />
          <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Kora ID</Text>
          <Text style={[styles.infoValue, { color: theme.text }]}>{user?.koraId || "Not assigned"}</Text>
        </View>

        {/* Settings list */}
        {items.map((item) => (
          <TouchableOpacity
            key={item.title}
            activeOpacity={0.65}
            style={[styles.settingRow, { borderBottomColor: theme.border }]}
            onPress={item.onPress}
          >
            <View style={[styles.iconContainer, { backgroundColor: theme.surface }]}>
              {renderIcon(item)}
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.settingTitle, { color: item.color === theme.error ? theme.error : theme.text }]}>
                {item.title}
              </Text>
              <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Logout */}
        <TouchableOpacity
          activeOpacity={0.65}
          style={[styles.logoutButton, { backgroundColor: theme.error }]}
          onPress={logout}
        >
          <Feather name="log-out" size={20} color="#FFFFFF" />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 62, flexDirection: "row", alignItems: "center",
    paddingHorizontal: 8, borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backButton: { width: 44, height: 46, justifyContent: "center", alignItems: "center" },
  headerTitle: { flex: 1, marginLeft: 4, fontSize: 21, fontWeight: "800" },
  infoCard: { margin: 16, padding: 16, borderRadius: 14 },
  infoLabel: { fontSize: 13, fontWeight: "600" },
  infoValue: { fontSize: 16, marginTop: 4 },
  settingRow: {
    minHeight: 72, paddingHorizontal: 16,
    flexDirection: "row", alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  iconContainer: {
    width: 44, height: 44, borderRadius: 14,
    justifyContent: "center", alignItems: "center",
  },
  textContainer: { flex: 1, marginLeft: 16 },
  settingTitle: { fontSize: 16, fontWeight: "600" },
  settingDescription: { fontSize: 13, marginTop: 3 },
  logoutButton: {
    margin: 20, paddingVertical: 16, borderRadius: 14,
    flexDirection: "row", justifyContent: "center", alignItems: "center",
  },
  logoutText: { color: "#FFFFFF", fontSize: 17, fontWeight: "700", marginLeft: 10 },
});
