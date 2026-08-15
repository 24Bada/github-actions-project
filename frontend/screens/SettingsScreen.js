/**
 * Kora — Settings Screen
 * Main settings hub with profile, search, and category list.
 */

import React, { useState } from "react";
import {
  SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, StatusBar,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../theme";
import { useAuth } from "../context/AuthContext";

export default function SettingsScreen({ navigation }) {
  const { theme, isDark } = useTheme();
  const { user } = useAuth();
  const [searchVisible, setSearchVisible] = useState(false);
  const [search, setSearch] = useState("");

  const settings = [
    {
      title: "Kora Premium",
      description: "Upgrade for premium features",
      icon: "award",
      iconType: "feather",
      color: theme.premium,
      onPress: () => navigation.navigate("Premium"),
    },
    {
      title: "Account",
      description: "Security, change number",
      icon: "key-outline",
      iconType: "material",
      color: theme.textSecondary,
      onPress: () => navigation.navigate("Account"),
    },
    {
      title: "Chats",
      description: "Chat history, backup, wallpaper",
      icon: "message-square",
      iconType: "feather",
      color: theme.textSecondary,
      onPress: () => {},
    },
    {
      title: "Privacy",
      description: "Blocked accounts, disappearing messages",
      icon: "lock",
      iconType: "feather",
      color: theme.textSecondary,
      onPress: () => {},
    },
    {
      title: "Appearance",
      description: "Theme, chat wallpaper, app icon",
      icon: "palette-outline",
      iconType: "material",
      color: theme.textSecondary,
      onPress: () => navigation.navigate("ChatTheme"),
    },
    {
      title: "Notifications",
      description: "Message, group & call tones",
      icon: "bell",
      iconType: "feather",
      color: theme.textSecondary,
      onPress: () => {},
    },
    {
      title: "Storage and data",
      description: "Network usage, auto-download",
      icon: "database",
      iconType: "feather",
      color: theme.textSecondary,
      onPress: () => {},
    },
    {
      title: "App language",
      description: "English (device language)",
      icon: "globe",
      iconType: "feather",
      color: theme.textSecondary,
      onPress: () => {},
    },
    {
      title: "Help and feedback",
      description: "Help center, contact us, privacy policy",
      icon: "help-circle",
      iconType: "feather",
      color: theme.textSecondary,
      onPress: () => {},
    },
    {
      title: "Invite friends",
      description: "",
      icon: "users",
      iconType: "feather",
      color: theme.textSecondary,
      onPress: () => {},
    },
  ];

  const filtered = settings.filter((item) => {
    const value = search.trim().toLowerCase();
    if (!value) return true;
    return (
      item.title.toLowerCase().includes(value) ||
      item.description.toLowerCase().includes(value)
    );
  });

  const renderIcon = (item) => {
    if (item.iconType === "material") {
      return <MaterialCommunityIcons name={item.icon} size={26} color={item.color} />;
    }
    return <Feather name={item.icon} size={25} color={item.color} />;
  };

  const initial = (user?.fullName || user?.username || "K")?.charAt(0)?.toUpperCase();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.background, borderBottomColor: theme.border }]}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Feather name="arrow-left" size={28} color={theme.text} />
        </TouchableOpacity>

        {searchVisible ? (
          <View style={[styles.searchContainer, { backgroundColor: theme.surface }]}>
            <Feather name="search" size={20} color={theme.textSecondary} style={{ marginRight: 8 }} />
            <TextInput
              autoFocus
              value={search}
              onChangeText={setSearch}
              placeholder="Search settings..."
              placeholderTextColor={theme.textSecondary}
              style={[styles.searchInput, { color: theme.text }]}
              autoCorrect={false}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch("")}>
                <Feather name="x" size={21} color={theme.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.headerActions}>
            <TouchableOpacity activeOpacity={0.7} style={styles.headerButton} onPress={() => setSearchVisible(true)}>
              <Feather name="search" size={25} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.headerButton} onPress={() => navigation.navigate("QRCode")}>
              <MaterialCommunityIcons name="qrcode" size={27} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.headerButton} onPress={() => navigation.navigate("EditProfile")}>
              <Feather name="edit-3" size={25} color={theme.text} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 45 }}>

        {/* Profile */}
        {!searchVisible && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.profileSection}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
              <Text style={styles.avatarLetter}>{initial}</Text>
            </View>
            <Text style={[styles.profileName, { color: theme.text }]}>{user?.fullName || "Kora User"}</Text>
            <Text style={[styles.profileUsername, { color: theme.textSecondary }]}>@{user?.username || "kora_user"}</Text>
          </TouchableOpacity>
        )}

        {/* Settings List */}
        <View style={[styles.settingsList, { borderTopColor: theme.border }]}>
          {filtered.map((item) => (
            <TouchableOpacity
              key={item.title}
              activeOpacity={0.65}
              style={[styles.settingRow, { borderBottomColor: theme.border }]}
              onPress={item.onPress}
            >
              <View style={[styles.iconContainer, { backgroundColor: theme.surface }]}>{renderIcon(item)}</View>
              <View style={styles.textContainer}>
                <Text style={[styles.settingTitle, { color: theme.text }]}>{item.title}</Text>
                {item.description !== "" && (
                  <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>{item.description}</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}

          {filtered.length === 0 && (
            <View style={styles.noResults}>
              <Feather name="search" size={30} color={theme.textSecondary} />
              <Text style={[styles.noResultsText, { color: theme.textSecondary }]}>No settings found</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 64, paddingHorizontal: 8,
    flexDirection: "row", alignItems: "center",
  },
  headerButton: { width: 48, height: 48, justifyContent: "center", alignItems: "center" },
  headerActions: { marginLeft: "auto", flexDirection: "row", alignItems: "center" },
  searchContainer: {
    flex: 1, height: 45, marginLeft: 4, marginRight: 10,
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 12, borderRadius: 12,
  },
  searchInput: { flex: 1, height: 45, fontSize: 16 },
  profileSection: { alignItems: "center", paddingTop: 8, paddingBottom: 32 },
  avatar: {
    width: 116, height: 116, borderRadius: 58,
    justifyContent: "center", alignItems: "center",
  },
  avatarLetter: { fontSize: 48, fontWeight: "700", color: "#FFFFFF" },
  profileName: { fontSize: 24, fontWeight: "800", marginTop: 16 },
  profileUsername: { fontSize: 15, marginTop: 4 },
  settingsList: { borderTopWidth: StyleSheet.hairlineWidth },
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
  noResults: { alignItems: "center", paddingTop: 60 },
  noResultsText: { fontSize: 15, marginTop: 12 },
});
