import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

import styles from "./Badge.module.css";

interface Props {
  className?: HTMLAttributes<HTMLSpanElement>["className"];
  variant?:
    | "gray"
    | "gray-subtle"
    | "blue"
    | "blue-subtle"
    | "purple"
    | "purple-subtle"
    | "amber"
    | "amber-subtle"
    | "red"
    | "red-subtle"
    | "pink"
    | "pink-subtle"
    | "green"
    | "green-subtle"
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
        variant ? styles[variant] : undefined,
        {
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
