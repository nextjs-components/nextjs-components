import clsx from "clsx";
import React from "react";
import { InputHTMLAttributes } from "react";

import styles from "./Checkbox.module.css";

interface Props {
  id?: string;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  children?: string | JSX.Element;
  onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
  style?: React.CSSProperties;
}
const Checkbox: React.ComponentType<Props> = ({
  id,
  checked,
  disabled,
  indeterminate,
  onChange,
  children,
  style,
}) => {
  return (
    <label
      className={clsx(styles.container, { [styles.disabled]: disabled })}
      style={style}
    >
      <span className={styles.check}>
        <input
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className={clsx(styles["geist-sr-only"], styles.input)}
          type="checkbox"
          id={id}
        />
        <span className={styles.icon}>
          <svg viewBox="0 0 20 20" height="16" width="16" fill="none">
            {indeterminate ? (
              <line
                x1="5"
                y1="10"
                x2="15"
                y2="10"
                stroke="var(--checkbox-color)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></line>
            ) : (
              <path
                d="M14 7L8.5 12.5L6 10"
                stroke="var(--geist-background)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            )}
          </svg>
        </span>
        {children && <span className={styles.text}>{children}</span>}
      </span>
    </label>
  );
};

export default Checkbox;
