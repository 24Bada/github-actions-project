/**
 * Kora Messenger — Theme Context
 *
 * Manages theme mode: light, dark, or system.
 * Chat themes are independent from the system theme.
 */

import React, { createContext, useState, useEffect, useContext } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useCustomTheme } from "../theme";

const THEME_MODE_KEY = "@kora_theme_mode";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState("system"); // "light" | "dark" | "system"

  // Load saved mode
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(THEME_MODE_KEY);
      if (saved && ["light", "dark", "system"].includes(saved)) {
        setMode(saved);
      }
    })();
  }, []);

  const changeMode = async (newMode) => {
    setMode(newMode);
    await AsyncStorage.setItem(THEME_MODE_KEY, newMode);
  };

  const theme = useCustomTheme(mode);

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode: changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeContext must be used within ThemeProvider");
  return ctx;
};

export default ThemeProvider;
