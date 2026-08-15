/**
 * Kora — Chat Input Component
 * Text input, attachment button, voice/send toggle, emoji button.
 * Press-and-hold to record voice message.
 */

import React, { useState } from "react";
import {
  View, TextInput, TouchableOpacity, StyleSheet, Alert, Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../theme";
import AttachmentSheet from "./AttachmentSheet";

export default function ChatInput({
  message, setMessage, onSend,
  onStartRecording, onStopRecording, isRecording,
}) {
  const { theme } = useTheme();
  const [attachmentVisible, setAttachmentVisible] = useState(false);

  const handleSendPress = () => {
    if (message.trim()) {
      onSend();
    }
  };

  const handleMicPressIn = () => {
    if (!message.trim()) {
      onStartRecording();
    }
  };

  const handleMicPressOut = () => {
    if (isRecording) {
      onStopRecording();
    }
  };

  return (
    <>
      <View style={[styles.container, { backgroundColor: theme.inputBackground }]}>
        <View style={[styles.inputWrapper, {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        }]}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="smile" size={24} color={theme.textSecondary} />
          </TouchableOpacity>

          <TextInput
            placeholder="Message..."
            placeholderTextColor={theme.textSecondary}
            value={message}
            onChangeText={setMessage}
            multiline
            style={[styles.textInput, { color: theme.text }]}
            maxHeight={120}
          />

          <TouchableOpacity
            onPress={() => setAttachmentVisible(true)}
            style={[styles.iconButton, { marginHorizontal: 6 }]}
          >
            <Feather name="paperclip" size={22} color={theme.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <Feather name="camera" size={22} color={theme.textSecondary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleSendPress}
          onPressIn={handleMicPressIn}
          onPressOut={handleMicPressOut}
          style={[styles.sendButton, { backgroundColor: theme.primary }]}
        >
          <Feather
            name={message.trim() ? "send" : "mic"}
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>

      <AttachmentSheet
        visible={attachmentVisible}
        onClose={() => setAttachmentVisible(false)}
        onCamera={() => { setAttachmentVisible(false); Alert.alert("Coming soon", "Camera will be available in Phase 9."); }}
        onGallery={() => { setAttachmentVisible(false); Alert.alert("Coming soon", "Gallery will be available in Phase 9."); }}
        onDocument={() => { setAttachmentVisible(false); Alert.alert("Coming soon", "Document picker will be available in Phase 9."); }}
        onLocation={() => { setAttachmentVisible(false); Alert.alert("Coming soon", "Location sharing will be available in Phase 9."); }}
        onContact={() => { setAttachmentVisible(false); Alert.alert("Coming soon"); }}
        onAudio={() => { setAttachmentVisible(false); Alert.alert("Coming soon"); }}
        onVideo={() => { setAttachmentVisible(false); Alert.alert("Coming soon"); }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", alignItems: "flex-end",
    padding: 10,
    paddingBottom: Platform.OS === "ios" ? 8 : 10,
  },
  inputWrapper: {
    flex: 1, flexDirection: "row", alignItems: "flex-end",
    borderRadius: 28, paddingHorizontal: 10, paddingVertical: 6,
    borderWidth: StyleSheet.hairlineWidth,
  },
  textInput: {
    flex: 1, fontSize: 16, paddingHorizontal: 10,
    maxHeight: 120, paddingVertical: 6,
  },
  iconButton: { padding: 4, justifyContent: "center", alignItems: "center" },
  sendButton: {
    width: 52, height: 52, borderRadius: 26,
    justifyContent: "center", alignItems: "center",
    marginLeft: 8,
  },
});
