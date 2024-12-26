"use client";

import {
  ThemeProvider as ThemeProviderPrimitive,
  type ThemeProviderProps,
  useTheme,
} from "next-themes";
import { PropsWithChildren } from "react";

const STORAGE_KEY = "mode";

export const ThemeProvider = ({
  children,
  ...props
}: PropsWithChildren<ThemeProviderProps>) => {
  return (
    <ThemeProviderPrimitive
      storageKey={STORAGE_KEY}
      attribute="class"
      defaultTheme="system"
      enableSystem
      value={{
        dark: "dark-theme", // specific html tag class used by all components' css
        system: "system", // arbitrary
        light: "light-theme", // arbitrary
      }}
      {...props}
    >
      {children}
    </ThemeProviderPrimitive>
  );
};

export { useTheme };
