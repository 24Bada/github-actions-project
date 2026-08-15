/**
 * Kora Messenger — Home Screen
 *
 * Main screen with chat list, search, navigation tabs.
 */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeContext } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { conversationAPI } from "../services/api";
import { formatChatTime } from "../utils/dateUtils";
import { spacing, layout } from "../theme";

export default function HomeScreen({ navigation }) {
  const { theme } = useThemeContext();
  const { user } = useAuth();

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadConversations = async () => {
    setLoading(true);
    const result = await conversationAPI.list();
    setLoading(false);
    setRefreshing(false);

    if (result.success && result.conversations) {
      setConversations(result.conversations);
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadConversations();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.chatItem, { borderBottomColor: theme.colors.divider }]}
      onPress={() =>
        navigation.navigate("Chat", {
          conversationId: item.id,
          name: item.name,
        })
      }
    >
      {/* Avatar */}
      <View
        style={[styles.avatar, { backgroundColor: theme.colors.primaryLight }]}
      >
        <Text style={[styles.avatarText, { color: theme.colors.primary }]}>
          {item.name?.[0]?.toUpperCase() || "?"}
        </Text>
      </View>

      {/* Chat content */}
      <View style={styles.chatContent}>
        <View style={styles.chatTopRow}>
          <Text
            style={[styles.chatName, { color: theme.colors.text }]}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text
            style={[styles.chatTime, { color: theme.colors.textTertiary }]}
          >
            {formatChatTime(item.lastMessageAt || item.updatedAt)}
          </Text>
        </View>
        <View style={styles.chatBottomRow}>
          <Text
            style={[styles.lastMessage, { color: theme.colors.textSecondary }]}
            numberOfLines={1}
          >
            {item.lastMessage || "No messages yet"}
          </Text>
          {item.unreadCount > 0 && (
            <View style={[styles.unreadBadge, { backgroundColor: theme.colors.unread }]}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
        No conversations yet
      </Text>
      <Text style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}>
        Start a new chat to begin messaging
      </Text>
      <TouchableOpacity
        style={[styles.emptyButton, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate("NewChat")}
      >
        <Text style={styles.emptyButtonText}>New Chat</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Kora</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Text style={[styles.headerIcon, { color: theme.colors.text }]}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Text style={[styles.headerIcon, { color: theme.colors.text }]}>⋯</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat list */}
      <FlatList
        data={conversations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={conversations.length === 0 ? styles.listEmpty : styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={renderEmpty}
      />

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate("NewChat")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: layout.headerHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.base,
    borderBottomWidth: 1,
  },
  headerTitle: { fontSize: 22, fontWeight: "700" },
  headerActions: { flexDirection: "row", gap: spacing.md },
  headerIcon: { fontSize: 24 },
  list: { paddingVertical: spacing.sm },
  listEmpty: { flex: 1 },
  chatItem: {
    flexDirection: "row",
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderBottomWidth: 0.5,
  },
  avatar: {
    width: layout.avatarSizes.lg,
    height: layout.avatarSizes.lg,
    borderRadius: layout.avatarSizes.lg / 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  avatarText: { fontSize: 18, fontWeight: "600" },
  chatContent: { flex: 1 },
  chatTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  chatName: { fontSize: 16, fontWeight: "600", flex: 1 },
  chatTime: { fontSize: 12, marginLeft: spacing.sm },
  chatBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastMessage: { fontSize: 14, flex: 1 },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
    marginLeft: spacing.sm,
  },
  unreadText: { fontSize: 11, fontWeight: "700", color: "#FFFFFF" },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: { fontSize: 20, fontWeight: "700", marginBottom: spacing.sm },
  emptySubtitle: { fontSize: 15, textAlign: "center", marginBottom: spacing.xl },
  emptyButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: layout.radius.md,
  },
  emptyButtonText: { fontSize: 16, fontWeight: "600", color: "#FFFFFF" },
  fab: {
    position: "absolute",
    bottom: spacing.xl,
    right: spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  fabText: { fontSize: 28, fontWeight: "300", color: "#FFFFFF" },
});
