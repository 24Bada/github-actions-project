/**
 * Kora — Chat Header Component
 * Avatar, name, status, call buttons, menu.
 */

import React from "react";
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../theme";

export default function ChatHeader({ chat, onBack, onCall, onVideoCall, onMenu }) {
  const { theme } = useTheme();

  const name = chat?.name || "Unknown";
  const avatar = chat?.avatar;
  const initial = name?.charAt(0)?.toUpperCase();
  const isOnline = chat?.isOnline;
  const isOfficial = chat?.isOfficial;
  const isPremium = chat?.isPremium;

  const statusText = isOnline
    ? "online"
    : chat?.lastSeen
      ? `last seen ${chat.lastSeen}`
      : "offline";

  return (
    <View style={[styles.container, { backgroundColor: theme.background, borderBottomColor: theme.border }]}>
      <TouchableOpacity activeOpacity={0.7} onPress={onBack} style={styles.backButton}>
        <Feather name="chevron-left" size={29} color={theme.text} />
      </TouchableOpacity>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
            <Text style={styles.avatarLetter}>{initial}</Text>
          </View>
        )}
        {isOnline && <View style={[styles.onlineDot, { borderColor: theme.background }]} />}
      </View>

      {/* Name + Status */}
      <View style={styles.infoContainer}>
        <View style={styles.nameRow}>
          <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>{name}</Text>
          {isOfficial && (
            <View style={[styles.badge, { backgroundColor: theme.official }]}>
              <MaterialCommunityIcons name="check-decagram" size={14} color="#FFFFFF" />
            </View>
          )}
          {isPremium && (
            <View style={[styles.badge, { backgroundColor: theme.premium }]}>
              <Feather name="star" size={11} color="#FFFFFF" />
            </View>
          )}
        </View>
        <Text style={[styles.status, { color: isOnline ? theme.success : theme.textSecondary }]} numberOfLines={1}>
          {statusText}
        </Text>
      </View>

      {/* Actions */}
      <TouchableOpacity activeOpacity={0.7} onPress={onVideoCall} style={styles.actionButton}>
        <Feather name="video" size={24} color={theme.text} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={onCall} style={styles.actionButton}>
        <Feather name="phone" size={23} color={theme.text} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={onMenu} style={styles.actionButton}>
        <Feather name="more-vertical" size={24} color={theme.text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 62, flexDirection: "row", alignItems: "center",
    paddingHorizontal: 4, borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backButton: { width: 44, height: 48, justifyContent: "center", alignItems: "center" },
  avatarContainer: { marginLeft: 4, position: "relative" },
  avatar: {
    width: 42, height: 42, borderRadius: 21,
    justifyContent: "center", alignItems: "center",
  },
  avatarLetter: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  onlineDot: {
    position: "absolute", right: 0, bottom: 0,
    width: 12, height: 12, borderRadius: 6, backgroundColor: "#22C55E", borderWidth: 2,
  },
  infoContainer: { flex: 1, marginLeft: 12, justifyContent: "center" },
  nameRow: { flexDirection: "row", alignItems: "center" },
  name: { fontSize: 17, fontWeight: "700", maxWidth: 160 },
  badge: {
    width: 18, height: 18, borderRadius: 9,
    justifyContent: "center", alignItems: "center",
    marginLeft: 6,
  },
  status: { fontSize: 13, marginTop: 2 },
  actionButton: { width: 40, height: 44, justifyContent: "center", alignItems: "center" },
});
