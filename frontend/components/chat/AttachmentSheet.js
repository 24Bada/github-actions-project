/**
 * Kora — Attachment Sheet Component
 * Bottom sheet for picking attachment type: camera, gallery, document, location, etc.
 */

import React from "react";
import {
  View, Text, StyleSheet, Modal, TouchableOpacity, Pressable,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../theme";

const ATTACHMENTS = [
  { id: "document", label: "Document", icon: "file-text", iconType: "feather", color: "#6366F1" },
  { id: "gallery", label: "Gallery", icon: "image", iconType: "feather", color: "#EC4899" },
  { id: "camera", label: "Camera", icon: "camera", iconType: "feather", color: "#10B981" },
  { id: "audio", label: "Audio", icon: "music", iconType: "feather", color: "#F59E0B" },
  { id: "location", label: "Location", icon: "map-pin", iconType: "feather", color: "#EF4444" },
  { id: "contact", label: "Contact", icon: "user", iconType: "feather", color: "#8B5CF6" },
  { id: "video", label: "Video", icon: "video", iconType: "feather", color: "#06B6D4" },
];

export default function AttachmentSheet({
  visible, onClose, onCamera, onGallery, onDocument, onLocation, onContact, onAudio, onVideo,
}) {
  const { theme } = useTheme();

  const handlers = {
    camera: onCamera, gallery: onGallery, document: onDocument,
    location: onLocation, contact: onContact, audio: onAudio, video: onVideo,
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={[styles.sheet, { backgroundColor: theme.background }]}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Handle */}
          <View style={[styles.handle, { backgroundColor: theme.border }]} />

          <Text style={[styles.title, { color: theme.text }]}>Share</Text>

          {/* Grid */}
          <View style={styles.grid}>
            {ATTACHMENTS.map((item) => {
              const Icon = item.iconType === "feather" ? Feather : MaterialCommunityIcons;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.attachmentItem}
                  onPress={handlers[item.id]}
                  activeOpacity={0.7}
                >
                  <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
                    <Icon name={item.icon} size={24} color="#FFFFFF" />
                  </View>
                  <Text style={[styles.attachmentLabel, { color: theme.textSecondary }]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1, justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheet: {
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingBottom: 34, paddingHorizontal: 16, paddingTop: 8,
  },
  handle: {
    width: 40, height: 5, borderRadius: 3,
    alignSelf: "center", marginTop: 4, marginBottom: 16,
  },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 16, textAlign: "center" },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" },
  attachmentItem: { alignItems: "center", width: 80, marginBottom: 20 },
  iconCircle: {
    width: 52, height: 52, borderRadius: 26,
    justifyContent: "center", alignItems: "center",
  },
  attachmentLabel: { fontSize: 12, marginTop: 8, fontWeight: "500" },
});
