import clsx from "clsx";
import { useTheme } from "contexts/ThemeContext";
import { IconSizeContext } from "contexts/IconSizeContext";
import { Sun, Moon, DisplayIcon, ChevronUpDown } from "icons";

import styles from "./Select.module.css";

const ModeSelect = () => {
  const { selectTheme, mode } = useTheme();
  return (
    <IconSizeContext.Provider value={{ size: 16 }}>
      <div className={styles.container}>
        <span className={styles.prefix}>
          {mode === "dark" && <Moon />}
          {mode === "light" && <Sun />}
          {mode === "system" && <DisplayIcon />}
        </span>
        <select
          className={clsx(styles.select, styles.small)}
          aria-label="Change color theme"
          onChange={(e) => {
            selectTheme(e.target.value);
          }}
          value={mode}
        >
          <option value="system">System</option>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
        <span className={styles.suffix}>
          <ChevronUpDown />
        </span>
      </div>
    </IconSizeContext.Provider>
  );
};

export default ModeSelect;
