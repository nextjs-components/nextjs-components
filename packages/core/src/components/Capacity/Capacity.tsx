import React from "react";

import styles from "./capacity.module.css";

interface Props {
  value?: number;
  limit?: number;
  color?: string;
}

const CYAN = "var(--geist-cyan-light)";
const WARNING = "var(--geist-warning)";
const RED = "var(--geist-error-dark)";

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

const Capacity: React.ComponentType<Props> = ({ value, limit, color }) => {
  const percentage = value / limit;
  const width = clamp(percentage * 50, 8, 50);

  if (!color) {
    color = percentage >= 0.66 ? RED : percentage >= 0.33 ? WARNING : CYAN;
  }

  return (
    <div
      className={styles.background}
      data-geist-capacity-background=""
      style={{
        // @ts-expect-error
        "--width": "50px",
        "--height": "10px",
      }}
    >
      <div
        className={styles.progress}
        data-geist-capacity-progress=""
        style={{
          // @ts-expect-error
          "--progress-color": color,
          "--progress-width": `${width}px`,
        }}
      ></div>
    </div>
  );
};

export default Capacity;
