import { isBrowser } from "../../utils/isBrowser";
import { useMediaQuery } from "../../hooks";
import { Modes, ThemeContext } from "./ThemeContext";

import { useState, useEffect, useMemo } from "react";

const STORAGE_KEY = "mode";

const ThemeContextProvider = ({ children }) => {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  const [mode, setMode] = useState<Modes>(() => {
    if (isBrowser()) {
      return (window as any).__mode;
    }
  });

  const isDarkMode = useMemo(
    () => (mode === Modes.SYSTEM ? prefersDark : mode === Modes.DARK),
    [mode, prefersDark]
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-theme");
    } else {
      document.documentElement.classList.remove("dark-theme");
    }
  }, [isDarkMode]);

  const selectTheme = async (val: Modes | "light" | "dark" | "system") => {
    switch (val) {
      case Modes.LIGHT:
        setMode(Modes.LIGHT);
        localStorage.setItem(STORAGE_KEY, Modes.LIGHT);
        break;
      case Modes.DARK:
        setMode(Modes.DARK);
        localStorage.setItem(STORAGE_KEY, Modes.DARK);
        break;
      case Modes.SYSTEM:
        setMode(Modes.SYSTEM);
        localStorage.setItem(STORAGE_KEY, Modes.SYSTEM);
        break;
    }
  };

  const contextValue = useMemo(
    () => ({ isDarkMode, mode, selectTheme }),
    [isDarkMode, selectTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
