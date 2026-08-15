/**
 * Kora Messenger — App Navigator
 *
 * Navigation structure:
 * - Auth flow: Welcome → Login → Register → VerifyOtp → ForgotPassword → ResetPassword
 * - Main flow: Home (tabs: Chats, Status, Channels, Calls) → Chat → Settings → etc.
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

const Stack = createNativeStackNavigator();

// Auth stack
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      {/* More auth screens will be added: VerifyOtp, ForgotPassword, ResetPassword */}
    </Stack.Navigator>
  );
}

// Main app stack
function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Kora", headerShown: false }}
      />
      {/* More screens will be added: Chat, Settings, Status, Channels, etc. */}
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const { theme } = useThemeContext();

  if (loading) {
    // Splash/loading state
    return null; // Can add a splash screen here
  }

  return (
    <NavigationContainer theme={{ colors: { background: theme.colors.background } }}>
      <StatusBar style={theme.scheme === "dark" ? "light" : "dark"} />
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
