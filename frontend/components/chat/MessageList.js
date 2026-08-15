/**
 * Kora — Message List Component
 * Renders messages with date separators, handles scroll.
 */

import React, { useEffect, useRef } from "react";
import {
  FlatList, View, Text, StyleSheet,
} from "react-native";
import MessageBubble from "./MessageBubble";
import { useTheme } from "../../theme";
import { getDateSeparatorLabel } from "../../utils/dateUtils";

export default function MessageList({ messages, currentUserId }) {
  const { theme } = useTheme();
  const flatListRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
      }, 100);
    }
  }, [messages]);

  // Attach display info to messages
  const prepared = messages.map((item, index) => {
    const sentAt = item.sentAt || item.createdAt || new Date().toISOString();
    const prevItem = index > 0 ? messages[index - 1] : null;
    const prevDate = prevItem ? new Date(prevItem.sentAt || prevItem.createdAt || new Date()) : null;
    const currDate = new Date(sentAt);
    const showDateSeparator = !prevDate ||
      prevDate.getDate() !== currDate.getDate() ||
      prevDate.getMonth() !== currDate.getMonth();

    return {
      ...item,
      senderId: item.senderId || item.sender,
      currentUserId,
      showDateSeparator,
      time: currDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  });

  const renderItem = ({ item }) => (
    <View>
      {item.showDateSeparator && (
        <View style={styles.dateSeparator}>
          <View style={[styles.datePill, { backgroundColor: theme.surface }]}>
            <Text style={[styles.dateText, { color: theme.textSecondary }]}>
              {getDateSeparatorLabel(new Date(item.sentAt || item.createdAt))}
            </Text>
          </View>
        </View>
      )}
      <MessageBubble item={item} />
    </View>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={prepared}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.id || item._id || index.toString()}
      inverted
      contentContainerStyle={{ paddingVertical: 8, paddingHorizontal: 4 }}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  dateSeparator: { alignItems: "center", marginVertical: 8 },
  datePill: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 12 },
  dateText: { fontSize: 12, fontWeight: "600" },
});
