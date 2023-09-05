import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

import styles from "./Badge.module.css";

interface Props {
  className?: HTMLAttributes<HTMLSpanElement>["className"];
  variant?:
    | "blue"
    | "red"
    | "pink"
    | "amber"
    | "purple"
    | "gray"
    | "blue-subtle"
    | "red-subtle"
    | "amber-subtle"
    | "purple-subtle"
    | "gray-subtle"
    | "trial"
    | "turbo";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
}

const Badge: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
  variant,
  size = "md",
  icon,
}) => {
  return (
    <span
      data-geist-badge=""
      data-version="v2"
      className={clsx(
        styles.badge,
        {
          [styles[variant]]: !!variant,
          [styles.lg]: size === "lg",
          [styles.md]: size === "md",
          [styles.sm]: size === "sm",
        },
        className,
      )}
    >
      <span className={styles.contentContainer}>
        {icon && <span className={styles.iconContainer}>{icon}</span>}
        {children}
      </span>
    </span>
  );
};

export default Badge;
