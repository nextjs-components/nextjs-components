import clsx from "clsx";
import React from "react";

import styles from "./skeleton.module.css";

interface Props {
  width?: React.CSSProperties["width"];
  height?: number;
  boxHeight?: number;
  rounded?: boolean;
  squared?: boolean;
  style?: any;
  className?: string;
  autoSize?: boolean;
  vcenter?: boolean;
  show?: boolean;
}

const isChildNull = (children) => {
  return !React.Children.count(children);
};

const Skeleton: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  width = 24,
  height = 24,
  boxHeight,
  vcenter,
  show,
  ...props
}) => {
  return (
    <span
      className={clsx(styles.skeleton, {
        [styles.show]: show !== false,
        [styles.wrapper]: !isChildNull(children),
        [styles.rounded]: "rounded" in props,
        [styles.squared]: "squared" in props,
      })}
      style={
        !isChildNull(children) || show
          ? undefined
          : {
              width: width || 160,
              minHeight: height,
              ...(vcenter
                ? {
                    marginBottom: `calc(${(boxHeight - height) / 2}px)`,
                    marginTop: `calc(${(boxHeight - height) / 2}px)`,
                  }
                : {
                    marginBottom: `calc(${(boxHeight || height) - height}px)`,
                  }),
            }
      }
    >
      {children}
    </span>
  );
};

export default Skeleton;
