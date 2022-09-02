import React from "react";

import styles from "./spinner.module.css";

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner = ({ size = 20, color }: SpinnerProps) => {
  return (
    <div
      className={styles.wrapper}
      data-geist-spinner=""
      style={{
        // @ts-ignore
        "--spinner-size": `${size}px`,
        "--spinner-color": color,
      }}
    >
      <div className={styles.spinner}>
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />

        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />

        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
      </div>
    </div>
  );
};

export default Spinner;
