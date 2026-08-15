/**
 * Kora — Message Bubble Component
 * Renders text, image, voice, video, document, location messages.
 * Uses Kora design system colors.
 */

import React from "react";
import {
  View, Text, StyleSheet, Image, TouchableOpacity, Linking,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../theme";

export default function MessageBubble({ item }) {
  const { theme } = useTheme();
  const mine = item.sender === "me" || item.senderId === item.currentUserId;

  return (
    <View style={[styles.container, mine ? styles.right : styles.left]}>
      <View style={[
        styles.bubble,
        mine
          ? { backgroundColor: theme.bubbleMine }
          : { backgroundColor: theme.bubbleOther },
      ]}>
        {/* Text */}
        {item.type === "text" && (
          <Text style={[styles.message, { color: theme.text }]}>{item.text}</Text>
        )}

        {/* Image */}
        {item.type === "image" && (
          <TouchableOpacity activeOpacity={0.9} onPress={() => item.image && Linking.openURL(item.image)}>
            <Image
              source={{ uri: item.image || item.media?.url }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}

        {/* Voice */}
        {item.type === "voice" && (
          <View style={styles.voiceRow}>
            <MaterialCommunityIcons name="play-circle" size={34} color={theme.primary} />
            <View style={{ marginLeft: 10 }}>
              <Text style={[styles.voiceTitle, { color: theme.text }]}>Voice Note</Text>
              <Text style={[styles.voiceDuration, { color: theme.textSecondary }]}>
                {item.duration || "00:00"}
              </Text>
            </View>
          </View>
        )}

        {/* Video */}
        {item.type === "video" && (
          <View style={[styles.videoCard, { backgroundColor: theme.surface }]}>
            <MaterialCommunityIcons name="video" size={40} color="#FFFFFF" />
            <Text style={styles.videoText}>Video</Text>
          </View>
        )}

        {/* Document */}
        {item.type === "document" && (
          <View style={styles.documentCard}>
            <MaterialCommunityIcons name="file-document" size={34} color={theme.primary} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text numberOfLines={1} style={[styles.documentTitle, { color: theme.text }]}>
                {item.text || "Document"}
              </Text>
              <Text style={[styles.documentSubtitle, { color: theme.textSecondary }]}>Document</Text>
            </View>
          </View>
        )}

        {/* Location */}
        {item.type === "location" && (
          <TouchableOpacity
            style={styles.locationCard}
            onPress={() => Linking.openURL(`https://maps.google.com/?q=${item.latitude},${item.longitude}`)}
          >
            <MaterialCommunityIcons name="map-marker" size={34} color={theme.error} />
            <Text style={[styles.locationText, { color: theme.text }]}>Open Location</Text>
          </TouchableOpacity>
        )}

        {/* Footer (time + status) */}
        <View style={styles.footer}>
          <Text style={[styles.time, { color: theme.textSecondary }]}>{item.time}</Text>
          {mine && (
            <MaterialCommunityIcons
              name={item.status === "read" ? "check-all" : "check"}
              size={18}
              color={item.status === "read" ? theme.info : theme.textSecondary}
              style={{ marginLeft: 5 }}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 4, paddingHorizontal: 10 },
  left: { alignItems: "flex-start" },
  right: { alignItems: "flex-end" },
  bubble: { maxWidth: "82%", borderRadius: 18, padding: 10 },
  message: { fontSize: 16 },
  image: { width: 230, height: 280, borderRadius: 14 },
  voiceRow: { flexDirection: "row", alignItems: "center" },
  voiceTitle: { fontSize: 15, fontWeight: "700" },
  voiceDuration: { marginTop: 2, fontSize: 12 },
  videoCard: { width: 230, height: 150, borderRadius: 14, justifyContent: "center", alignItems: "center" },
  videoText: { marginTop: 8, color: "#FFFFFF", fontWeight: "700" },
  documentCard: { flexDirection: "row", alignItems: "center", minWidth: 220 },
  documentTitle: { fontSize: 15, fontWeight: "700" },
  documentSubtitle: { marginTop: 2, fontSize: 12 },
  locationCard: { flexDirection: "row", alignItems: "center" },
  locationText: { marginLeft: 10, fontWeight: "700" },
  footer: { marginTop: 6, flexDirection: "row", justifyContent: "flex-end", alignItems: "center" },
  time: { fontSize: 11 },
});
