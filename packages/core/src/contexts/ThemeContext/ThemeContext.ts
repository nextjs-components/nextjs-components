import { createContext } from "react";

export enum Modes {
  LIGHT = "light",
  DARK = "dark",
  SYSTEM = "system",
}
export interface IThemeContext {
  selectTheme: (val: Modes | "light" | "dark" | "system" | string) => void;
  isDarkMode: null | boolean;
  mode: Modes | "light" | "dark" | "system";
}

export const ThemeContext = createContext<IThemeContext>({
  selectTheme: () => {},
  isDarkMode: null,
  mode: "system",
});
