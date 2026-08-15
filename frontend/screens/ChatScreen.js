/**
 * Kora — Chat Screen
 * Full chat experience: message list, input, voice recording, real-time via Socket.IO.
 * AsyncStorage persistence for offline support.
 */

import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView, View, StyleSheet, KeyboardAvoidingView, Platform, StatusBar, Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ChatHeader from "../components/chat/ChatHeader";
import MessageList from "../components/chat/MessageList";
import ChatInput from "../components/chat/ChatInput";
import RecordingBar from "../components/chat/RecordingBar";

import { useTheme } from "../theme";
import { useAuth } from "../context/AuthContext";
import { socketService } from "../services/socket";

export default function ChatScreen({ navigation, route }) {
  const { theme, isDark } = useTheme();
  const { user } = useAuth();

  const chat = route?.params?.chat || {
    id: "1", name: "Kora Team", isOnline: true, isOfficial: true, badge: "official",
  };

  const STORAGE_KEY = `chat_messages_${chat.id}`;

  // State
  const [messages, setMessages] = useState([
    {
      id: "welcome-1",
      sender: "other",
      senderId: "other",
      type: "text",
      text: "👋 Welcome to Kora Messenger.",
      sentAt: new Date().toISOString(),
      status: "read",
    },
    {
      id: "welcome-2",
      sender: "me",
      senderId: user?._id || user?.id || "me",
      type: "text",
      text: "Thanks 💚",
      sentAt: new Date().toISOString(),
      status: "read",
    },
  ]);

  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordLocked, setRecordLocked] = useState(false);
  const [recordTime, setRecordTime] = useState("00:00");

  const timerRef = useRef(null);
  const secondsRef = useRef(0);

  // Load saved messages
  useEffect(() => {
    loadMessages();

    // Join conversation room via socket
    socketService.emit("join_conversation", chat.id);

    // Listen for new messages
    const unsubscribe = socketService.on("new_message", (data) => {
      if (data.conversationId === chat.id) {
        setMessages((prev) => [
          ...prev,
          {
            ...data,
            sender: data.senderId === (user?._id || user?.id) ? "me" : "other",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            status: "sent",
          },
        ]);
      }
    });

    // Listen for typing
    const unsubscribeTyping = socketService.on("typing", (data) => {
      if (data.conversationId === chat.id && data.userId !== (user?._id || user?.id)) {
        // Could update a typing indicator in header
      }
    });

    return () => {
      socketService.emit("leave_conversation", chat.id);
      unsubscribe?.();
      unsubscribeTyping?.();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [chat.id]);

  const loadMessages = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        setMessages(JSON.parse(saved));
      }
    } catch (err) {
      console.log("Error loading messages:", err);
    }
  };

  const saveMessages = async (updated) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.log("Error saving messages:", err);
    }
  };

  // Send text message
  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: "me",
      senderId: user?._id || user?.id || "me",
      type: "text",
      text: message.trim(),
      sentAt: new Date().toISOString(),
      status: "sent",
    };

    const updated = [...messages, newMessage];
    setMessages(updated);
    saveMessages(updated);
    setMessage("");

    // Emit via socket
    socketService.emit("send_message", {
      conversationId: chat.id,
      type: "text",
      text: newMessage.text,
    });
  };

  // Recording
  const startRecording = () => {
    setIsRecording(true);
    setRecordLocked(false);
    secondsRef.current = 0;
    setRecordTime("00:00");

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      secondsRef.current += 1;
      const m = Math.floor(secondsRef.current / 60).toString().padStart(2, "0");
      const s = (secondsRef.current % 60).toString().padStart(2, "0");
      setRecordTime(`${m}:${s}`);
    }, 1000);
  };

  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRecording(false);
    setRecordLocked(false);
    setRecordTime("00:00");

    // Phase 10 will add actual audio recording with expo-audio
    Alert.alert("Coming soon", "Voice messages will be available in Phase 10.");
  };

  const cancelRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRecording(false);
    setRecordLocked(false);
    setRecordTime("00:00");
  };

  const sendRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    const newMessage = {
      id: `voice-${Date.now()}`,
      sender: "me",
      senderId: user?._id || user?.id || "me",
      type: "voice",
      duration: recordTime,
      sentAt: new Date().toISOString(),
      status: "sent",
    };

    const updated = [...messages, newMessage];
    setMessages(updated);
    saveMessages(updated);

    setIsRecording(false);
    setRecordLocked(false);
    setRecordTime("00:00");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <ChatHeader
        chat={chat}
        onBack={() => navigation.goBack()}
        onCall={() => Alert.alert("Coming soon", "Voice calls will be available in a future phase.")}
        onVideoCall={() => Alert.alert("Coming soon", "Video calls will be available in a future phase.")}
        onMenu={() => Alert.alert("Coming soon", "Chat info and settings will be available soon.")}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <MessageList
          messages={messages}
          currentUserId={user?._id || user?.id || "me"}
        />

        {isRecording ? (
          <RecordingBar
            recordTime={recordTime}
            isLocked={recordLocked}
            onCancel={cancelRecording}
            onSend={sendRecording}
          />
        ) : (
          <ChatInput
            message={message}
            setMessage={setMessage}
            onSend={handleSend}
            onStartRecording={startRecording}
            onStopRecording={stopRecording}
            isRecording={isRecording}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
