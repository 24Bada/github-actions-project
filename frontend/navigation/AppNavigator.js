/**
 * Kora Messenger — App Navigator
 *
 * Navigation structure:
 * - Auth flow: Welcome → Login → Register → VerifyOtp → ForgotPassword → ResetPassword
 * - Main flow: Home → Chat → Settings → EditProfile → Account → QRCode → etc.
 */

import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import { AuthContext } from "../context/AuthContext";
import { useThemeContext } from "../context/ThemeContext";

// Auth screens
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

// Main screens
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import SettingsScreen from "../screens/SettingsScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import AccountScreen from "../screens/AccountScreen";
import QRCodeScreen from "../screens/QRCodeScreen";

const Stack = createNativeStackNavigator();

// Auth stack
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      {/* VerifyOtp, ForgotPassword, ResetPassword will be added */}
    </Stack.Navigator>
  );
}

// Main app stack
function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="QRCode" component={QRCodeScreen} />
      {/* More screens will be added: Status, Channels, Premium, etc. */}
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const { theme } = useThemeContext();

  if (loading) {
    return null; // Can add a splash screen here
  }

  return (
    <NavigationContainer theme={{ colors: { background: theme.colors.background } }}>
      <StatusBar style={theme.scheme === "dark" ? "light" : "dark"} />
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
