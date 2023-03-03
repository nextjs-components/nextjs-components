import clsx from "clsx";
import React from "react";

import AlertCircle from "../../icons/alert-circle";
import styles from "./error.module.css";

interface ErrorProps {
  label?: string;
  size?: "small" | "large";
  style?: React.CSSProperties;
  id?: string;
}
const Error: React.ComponentType<React.PropsWithChildren<ErrorProps>> = ({
  label = "Error",
  children,
  size,
  style,
  id,
}) => {
  return (
    <div
      id={id}
      aria-atomic="true"
      role="alert"
      data-geist-error=""
      style={style}
      className={clsx(styles.error, {
        [styles.small]: size === "small",
        [styles.large]: size === "large",
      })}
    >
      <div aria-hidden="true">
        <AlertCircle color="var(--geist-error)" size={20} />
      </div>
      <div className={styles.text}>
        <b>{label}:</b>
        <span
          aria-hidden="true"
          className={clsx("geist-spacer", "inline")}
          style={{ marginLeft: "5px" }}
        />
        {children}
      </div>
    </div>
  );
};

export default Error;
