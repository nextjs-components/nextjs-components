import { createContext } from "react";

interface IThemeContext {
  size: number;
}

const ThemeContext = createContext<IThemeContext>({
  size: 24,
});

export default ThemeContext;
