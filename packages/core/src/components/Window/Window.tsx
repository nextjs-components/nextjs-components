import clsx from "clsx";
import React from "react";

import styles from "./window.module.css";

interface WindowProps {
  title?: string | JSX.Element;
}
const Window: React.ComponentType<React.PropsWithChildren<WindowProps>> = ({
  title,
  children,
}) => {
  return (
    <div className={clsx(styles.window, "window")}>
      <style jsx>{`
        .window {
          box-shadow: var(--shadow-large);
        }
      `}</style>
      <div
        className={styles.header}
        style={{ "--header-height": "36px" } as any}
      >
        <div className={clsx(styles.traffic, styles.show)}>
          <span className={clsx(styles.icon, styles.close)}></span>
          <span className={clsx(styles.icon, styles.minimize)}></span>
          <span className={clsx(styles.icon, styles.fullScreen)}></span>
        </div>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default Window;
