import clsx from "clsx";
import React from "react";

import styles from "./status-dot.module.css";

function capitalize(string: string = "") {
  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
}

const statusDotState = {
  QUEUED: "This deployment is queued.",
  BUILDING: "This deployment is building.", // building
  READY: "This deployment is ready.",
  ERROR: "This deployment had an error.",
  CANCELED: "This deployment was canceled.",
  INITIALIZING: "This deployment is initializing.", // building
  UPLOADING: "This deployment is uploading.", // building
  DEPLOYING: "This deployment is deploying.", // building
  ARCHIVED: "This deployment is archived.",
} as const;

export interface StatusDotProps {
  state: keyof typeof statusDotState;
  label?: boolean;
}

const StatusDot: React.FC<StatusDotProps> = ({ state, label }) => {
  return (
    <span className={styles.wrapper}>
      <span
        className={clsx(styles.status, {
          [styles.ready]: state === "READY",
          [styles.error]: state === "ERROR",
          [styles.building]: [
            "BUILDING",
            "INITIALIZING",
            "UPLOADING",
            "DEPLOYING",
          ].includes(state),
        })}
        title={statusDotState[state]}
      />
      {label && (
        <span className={styles["status-label"]}>{capitalize(state)}</span>
      )}
    </span>
  );
};

export default StatusDot;
