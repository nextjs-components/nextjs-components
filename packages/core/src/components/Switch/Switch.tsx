import clsx from "clsx";
import React from "react";

import styles from "./Switch.module.css";

interface SwitchProps {
  items: {
    name: string; // ex. 'Source'
    value: string; // ex. 'source'
    width: React.CSSProperties["minWidth"];
    disabled?: boolean;
  }[];
  active?: string;
  onChange?: (value: string) => void;
  size?: "small" | "large";
  icon?: boolean;
}
const Switch = ({ items, onChange, active, size, icon }: SwitchProps) => {
  return (
    <div
      className={clsx(styles.switch, {
        [styles[size]]: !!size,
        [styles.icon]: !!icon,
      })}
      role="radiogroup"
    >
      {items.map((e) => {
        const isActive = active === e.value;
        const disabled = e.disabled;
        return (
          <button
            className={clsx(styles.button, {
              [styles.active]: isActive,
            })}
            aria-checked={isActive}
            role="radio"
            type="button"
            key={e.value}
            onClick={() => {
              onChange(e.value);
            }}
            style={{ minWidth: e.width }}
            disabled={disabled}
          >
            <span>{e.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Switch;
