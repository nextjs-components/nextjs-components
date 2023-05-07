import clsx from "clsx";
import type { HTMLAttributes } from "react";

import styles from "./Badge.module.css";

interface Props {
  className?: HTMLAttributes<HTMLSpanElement>["className"];
  type?: "success" | "error" | "warning" | "violet" | "secondary";
  variant?: "contrast";
  outline?: boolean;
  size?: "small" | "large";
}

const Badge: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
  type,
  variant,
  outline,
  size,
}) => {
  return (
    <span
      className={clsx(
        styles.badge,
        {
          [styles[type]]: !!type,
          [styles[variant]]: !!variant,
          [styles.outline]: outline,
          [styles[size]]: !!size,
        },
        className,
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
