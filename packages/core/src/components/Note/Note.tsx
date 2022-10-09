import clsx from "clsx";
import React from "react";

import styles from "./Note.module.css";

interface Props {
  size?: "small" | "large";
  /**
   * action={<Button size="small">Upgrade</Button>}
   */
  action?: React.ReactNode;
  type?: "secondary" | "success" | "error" | "warning";
  label?: false | string;
  small?: boolean;
  fill?: boolean;
  variant?: "contrast";
  style?: React.CSSProperties;
}

const labelMap = {
  secondary: "Note: ",
  success: "Success: ",
  error: "Error: ",
  warning: "Warning: ",
};

const getLabel = (label?: false | string, type?: Props["type"]) => {
  if (label === false) return null;
  if (typeof label === "undefined" && !type) return "Note: ";
  if (label) return label;
  if (type) return labelMap[type];
};

const Note: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  size,
  label,
  action,
  type,
  fill,
  variant,
  style, // for mdx
}) => {
  return (
    <div
      {...{ style }}
      className={clsx(styles.note, {
        [styles.small]: size === "small",
        [styles.large]: size === "large",
        ["geist-themed"]: !!type,
        ["geist-secondary"]: type === "secondary",
        ["geist-success"]: type === "success",
        ["geist-error"]: type === "error",
        ["geist-warning"]: type === "warning",
        [styles.fill]: fill,
        ["geist-secondary-fill"]: fill && type === "secondary",
        ["geist-success-fill"]: fill && type === "success",
        ["geist-error-fill"]: fill && type === "error",
        ["geist-warning-fill"]: fill && type === "warning",
        ["geist-secondary-contrast"]:
          variant === "contrast" && type === "secondary",
        ["geist-success-contrast"]:
          variant === "contrast" && type === "success",
        ["geist-error-contrast"]: variant === "contrast" && type === "error",
        ["geist-warning-contrast"]:
          variant === "contrast" && type === "warning",
      })}
    >
      <span>
        <span className={"geist-text span"}>
          <b>{getLabel(label, type)}</b>
        </span>
        {children}
      </span>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
};

export default Note;
