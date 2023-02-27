import clsx from "clsx";
import React from "react";

import styles from "./Switch.module.css";

interface SwitchProps {
  items: {
    /** @example 'Source' or <Icon /> */
    name: JSX.Element;
    /** @example 'source' */
    value: string; // ex. 'source'
    /** ignored if using `icon` */
    width?: React.CSSProperties["minWidth"];
    disabled?: boolean;
    /** Useful if using `icon` */
    ariaLabel?: string;
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
            style={{ minWidth: icon ? undefined : e.width }}
            disabled={disabled}
            aria-label={
              icon ? e.ariaLabel || `Switch to ${e.value}` : undefined
            }
          >
            <span>{e.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Switch;
