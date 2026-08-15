/**
 * Kora — QR Code Screen
 * Display user's Kora ID as QR code for easy sharing.
 */

import React from "react";
import {
  SafeAreaView, View, Text, StyleSheet, TouchableOpacity, StatusBar, Clipboard, Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../theme";
import { useAuth } from "../context/AuthContext";

// Simple QR placeholder — will use react-native-qrcode-svg when installed
export default function QRCodeScreen({ navigation }) {
  const { theme, isDark } = useTheme();
  const { user } = useAuth();

  const koraId = user?.koraId || "KORA-XXXX";

  const copyId = () => {
    Clipboard.setString(koraId);
    Alert.alert("Copied", "Kora ID copied to clipboard.");
  };

  const shareLink = `https://kora.app/u/${koraId}`;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="chevron-left" size={29} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>QR Code</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.content}>
        {/* QR Card */}
        <View style={[styles.qrCard, { backgroundColor: theme.surface }]}>
          {/* QR placeholder — replace with react-native-qrcode-svg */}
          <View style={[styles.qrPlaceholder, { backgroundColor: isDark ? "#1a1a2e" : "#f8f9fa" }]}>
            <Feather name="qr-code" size={120} color={theme.text} />
          </View>
          <Text style={[styles.koraId, { color: theme.text }]}>{koraId}</Text>
          <Text style={[styles.shareHint, { color: theme.textSecondary }]}>
            Scan to add as contact on Kora
          </Text>
        </View>

        {/* Actions */}
        <TouchableOpacity activeOpacity={0.7} style={[styles.actionButton, { backgroundColor: theme.primary }]} onPress={copyId}>
          <Feather name="copy" size={20} color="#FFFFFF" />
          <Text style={styles.actionText}>Copy Kora ID</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.actionButton, { backgroundColor: theme.surface }]}
          onPress={() => {
            Clipboard.setString(shareLink);
            Alert.alert("Copied", "Share link copied to clipboard.");
          }}
        >
          <Feather name="share" size={20} color={theme.text} />
          <Text style={[styles.actionText, { color: theme.text }]}>Share Link</Text>
        </TouchableOpacity>
      </View>
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
  content: { flex: 1, alignItems: "center", paddingTop: 40 },
  qrCard: {
    width: 280, padding: 30, borderRadius: 24,
    alignItems: "center",
  },
  qrPlaceholder: {
    width: 200, height: 200, borderRadius: 16,
    justifyContent: "center", alignItems: "center",
  },
  koraId: { fontSize: 22, fontWeight: "800", marginTop: 20 },
  shareHint: { fontSize: 13, marginTop: 8, textAlign: "center" },
  actionButton: {
    flexDirection: "row", alignItems: "center",
    paddingVertical: 16, paddingHorizontal: 24,
    borderRadius: 14, marginTop: 16, minWidth: 280,
    justifyContent: "center",
  },
  actionText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700", marginLeft: 10 },
});
