import React from "react";
import clsx from "clsx";
import styles from "./skeleton.module.css";

interface Props {
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
  boxHeight?: number;
  rounded?: boolean;
  squared?: boolean;
}

const Skeleton: React.FC<Props> = ({
  children,
  width,
  height,
  boxHeight,
  ...props
}) => {
  return (
    <span
      className={clsx(styles.skeleton, styles.show, {
        [styles.wrapper]: !width,
        [styles.rounded]: "rounded" in props,
        [styles.squared]: "squared" in props,
      })}
      style={{
        width: width ?? 160,
        height,
        minHeight: 24,
        marginBottom: `calc(${(boxHeight ?? 24) - 24}px)`,
      }}
    >
      {children}
    </span>
  );
};

export default Skeleton;
