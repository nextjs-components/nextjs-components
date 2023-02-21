import { useTheme } from "nextjs-components/src/contexts/ThemeContext";
import { Display, Moon, Sun } from "nextjs-components/src/icons";

import styles from "./theme-switcher.module.css";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.value);
  };
  const isChecked = (value: string) => theme === value;

  return (
    <div className={styles.root}>
      <span style={{ height: "100%" }}>
        <input
          type="radio"
          id="theme-switcher-system"
          value="system"
          onChange={handleChange}
          checked={isChecked("system")}
        />
        <label
          htmlFor="theme-switcher-system"
          aria-label="Switch to system mode"
          title="Switch to system mode"
        >
          <Display size={16} />
        </label>
      </span>
      <span style={{ height: "100%" }}>
        <input
          type="radio"
          id="theme-switcher-dark"
          value="dark"
          onChange={handleChange}
          checked={isChecked("dark")}
        />
        <label
          htmlFor="theme-switcher-dark"
          aria-label="Switch to dark mode"
          title="Switch to dark mode"
        >
          <Moon size={16} />
        </label>
      </span>
      <span style={{ height: "100%" }}>
        <input
          type="radio"
          id="theme-switcher-light"
          value="light"
          onChange={handleChange}
          checked={isChecked("light")}
        />
        <label
          htmlFor="theme-switcher-light"
          aria-label="Switch to light mode"
          title="Switch to light mode"
        >
          <Sun size={16} />
        </label>
      </span>
    </div>
  );
};
