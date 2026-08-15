/**
 * Kora Messenger — Auth Context
 *
 * Manages authentication state: token, user, login, logout, loading.
 * Uses AsyncStorage for persistence.
 */

import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

const STORAGE_KEYS = {
  TOKEN: "@kora_token",
  USER: "@kora_user",
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setAppLoading] = useState(true);

  // Load stored auth state on mount
  useEffect(() => {
    (async () => {
      try {
        const storedToken = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
        const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.USER);

        if (storedToken) setToken(storedToken);
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (e) {
        console.log("Auth load error:", e);
      } finally {
        setAppLoading(false);
      }
    })();
  }, []);

  // Persist login
  const login = async (newToken, userData) => {
    try {
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.TOKEN, newToken],
        [STORAGE_KEYS.USER, JSON.stringify(userData)],
      ]);
      setToken(newToken);
      setUser(userData);
    } catch (e) {
      console.log("Login save error:", e);
      throw e;
    }
  };

  // Clear auth state
  const logout = async () => {
    try {
      await AsyncStorage.multiRemove([STORAGE_KEYS.TOKEN, STORAGE_KEYS.USER]);
      setToken(null);
      setUser(null);
    } catch (e) {
      console.log("Logout error:", e);
    }
  };

  // Update user data without re-auth
  const updateUser = async (userData) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      setUser(userData);
    } catch (e) {
      console.log("Update user error:", e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        isAuthenticated: !!token,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthProvider;
