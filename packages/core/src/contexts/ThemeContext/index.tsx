import { ThemeProvider, useTheme } from "next-themes";

const STORAGE_KEY = "mode";

export const ThemeContextProvider = ({ children }) => {
  return (
    <ThemeProvider
      storageKey={STORAGE_KEY}
      attribute="class"
      enableSystem
      value={{
        dark: "dark-theme", // specific html tag class used by all components' css
        system: "system", // arbitrary
        light: "light-theme", // arbitrary
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export { useTheme };
