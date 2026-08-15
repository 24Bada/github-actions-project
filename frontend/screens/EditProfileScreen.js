/**
 * Kora — Edit Profile Screen
 * Edit name, about, username, avatar.
 */

import React, { useState } from "react";
import {
  SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "../theme";
import { useAuth } from "../context/AuthContext";
import { userAPI } from "../services/api";

export default function EditProfileScreen({ navigation }) {
  const { theme, isDark } = useTheme();
  const { user, updateUser } = useAuth();

  const initial = (user?.fullName || "K")?.charAt(0)?.toUpperCase();

  const pickAvatar = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission needed", "Please allow Kora to access your photos.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        // Upload to server, then update profile
        // For now, update locally — will connect to media API
        Alert.alert("Coming soon", "Avatar upload will be available when the media server is running.");
      }
    } catch (err) {
      Alert.alert("Error", "Could not pick image.");
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="chevron-left" size={29} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Edit profile</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>

        {/* Avatar */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
              <Text style={styles.avatarLetter}>{initial}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.75} style={styles.cameraButton} onPress={pickAvatar}>
              <Feather name="camera" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Name */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.profileRow, { borderBottomColor: theme.border }]}
          onPress={() => navigation.navigate("EditName")}
        >
          <View style={[styles.iconBox, { backgroundColor: theme.primarySoft }]}>
            <Feather name="user" size={21} color={theme.primary} />
          </View>
          <View style={styles.rowContent}>
            <Text style={[styles.rowTitle, { color: theme.text }]}>Name</Text>
            <Text style={[styles.rowValue, { color: theme.textSecondary }]}>{user?.fullName || "Not set"}</Text>
          </View>
          <Feather name="chevron-right" size={20} color={theme.textSecondary} />
        </TouchableOpacity>

        {/* About */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.profileRow, { borderBottomColor: theme.border }]}
          onPress={() => navigation.navigate("EditAbout")}
        >
          <View style={[styles.iconBox, { backgroundColor: theme.primarySoft }]}>
            <Feather name="info" size={21} color={theme.primary} />
          </View>
          <View style={styles.rowContent}>
            <Text style={[styles.rowTitle, { color: theme.text }]}>About</Text>
            <Text style={[styles.rowValue, { color: theme.primary }]}>{user?.bio || "Set About"}</Text>
          </View>
          <Feather name="chevron-right" size={20} color={theme.textSecondary} />
        </TouchableOpacity>

        {/* Username */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.profileRow, { borderBottomColor: theme.border }]}
          onPress={() => navigation.navigate("EditUsername")}
        >
          <View style={[styles.iconBox, { backgroundColor: theme.primarySoft }]}>
            <Text style={[styles.atSymbol, { color: theme.primary }]}>@</Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={[styles.rowTitle, { color: theme.text }]}>Username</Text>
            <Text style={[styles.rowValue, { color: theme.textSecondary }]}>@{user?.username || "not_set"}</Text>
          </View>
          <Feather name="chevron-right" size={20} color={theme.textSecondary} />
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
  profileSection: { alignItems: "center", paddingTop: 30, paddingBottom: 30 },
  avatarWrapper: { width: 116, height: 116, position: "relative" },
  avatar: { width: 112, height: 112, borderRadius: 56, justifyContent: "center", alignItems: "center" },
  avatarLetter: { color: "#FFFFFF", fontSize: 47, fontWeight: "800" },
  cameraButton: {
    position: "absolute", right: 0, bottom: 1,
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: "#2563EB", borderWidth: 3, borderColor: "#FFFFFF",
    justifyContent: "center", alignItems: "center",
  },
  profileRow: {
    minHeight: 78, paddingHorizontal: 20,
    flexDirection: "row", alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  iconBox: {
    width: 43, height: 43, borderRadius: 13,
    justifyContent: "center", alignItems: "center",
  },
  atSymbol: { fontSize: 22, fontWeight: "800" },
  rowContent: { flex: 1, marginLeft: 14, marginRight: 10 },
  rowTitle: { fontSize: 15, fontWeight: "700" },
  rowValue: { fontSize: 13, marginTop: 4 },
});
