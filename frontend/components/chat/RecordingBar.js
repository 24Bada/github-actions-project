/**
 * Kora — Recording Bar Component
 * Shows when recording a voice message. Displays timer + cancel/send.
 */

import React from "react";
import {
  View, Text, StyleSheet, TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../theme";

export default function RecordingBar({ recordTime, onCancel, onSend, isLocked }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.inputBackground }]}>
      {/* Cancel */}
      {isLocked ? (
        <TouchableOpacity activeOpacity={0.7} onPress={onCancel} style={styles.actionButton}>
          <Feather name="trash-2" size={24} color={theme.error} />
        </TouchableOpacity>
      ) : (
        <View style={styles.actionButton}>
          <Feather name="x" size={24} color={theme.textSecondary} />
        </View>
      )}

      {/* Recording indicator + timer */}
      <View style={styles.recordingInfo}>
        <View style={[styles.recordingDot, { backgroundColor: theme.error }]} />
        <Text style={[styles.timer, { color: theme.text }]}>{recordTime || "00:00"}</Text>
      </View>

      {/* Slide to cancel hint */}
      {!isLocked && (
        <Text style={[styles.hint, { color: theme.textSecondary }]}>
          Slide to cancel
        </Text>
      )}

      {/* Send */}
      {isLocked && (
        <TouchableOpacity activeOpacity={0.7} onPress={onSend} style={styles.actionButton}>
          <View style={[styles.sendButton, { backgroundColor: theme.primary }]}>
            <Feather name="send" size={22} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", alignItems: "center",
    padding: 10, height: 62,
  },
  actionButton: { width: 48, height: 48, justifyContent: "center", alignItems: "center" },
  recordingInfo: { flexDirection: "row", alignItems: "center", marginLeft: 8 },
  recordingDot: { width: 10, height: 10, borderRadius: 5, marginRight: 10 },
  timer: { fontSize: 16, fontWeight: "700", fontVariant: ["tabular-nums"] },
  hint: { flex: 1, textAlign: "right", marginRight: 16, fontSize: 14 },
  sendButton: {
    width: 46, height: 46, borderRadius: 23,
    justifyContent: "center", alignItems: "center",
  },
});
