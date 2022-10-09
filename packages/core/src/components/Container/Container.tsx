import clsx from "clsx";
import React from "react";

type Direction = "column" | "row";
export interface Props {
  flex?: number;
  /**
   * ignored if the `direction` prop is specified
   */
  row?: boolean;
  /**
   * [sm → md → lg]
   */
  direction?: Direction | Direction[];
  /**
   * This a multiplier, * `--geist-gap` (24px)
   */
  gap?: number;
  className?: string;
  style?: React.CSSProperties;
  /**
   * not compatible with `direction`
   */
  hcenter?: boolean;
  /**
   * not compatible with `direction`
   */
  vcenter?: boolean;
  /**
   * not compatible with `direction`
   */
  vbaseline?: boolean;
  /** specify one of: `left | center | right` */
  left?: boolean;
  /** specify one of: `left | center | right` */
  center?: boolean;
  /** specify one of: `left | center | right` */
  right?: boolean;
  noWrap?: boolean;
  /**
   * `wrapper ? "geist-wrapper" : "geist-container"`
   */
  wrapper?: boolean;
}

const Container: React.ComponentType<React.PropsWithChildren<Props>> = ({
  children,
  flex = 1,
  row,
  direction, // default "column"
  className,
  style,
  hcenter,
  vcenter,
  vbaseline,
  left,
  center,
  right,
  gap = 1,
  noWrap,
  wrapper,
}) => {
  let __flex = flex;
  let __justify_content = "flex-start";
  let __align_items = "stretch";
  if (row) {
    if (center) {
      __justify_content = "center";
      __align_items = "center";
    }
    if (vcenter) {
      __align_items = "center";
    }
    if (hcenter) {
      __justify_content = "center";
    }
    if (right) {
      __justify_content = "flex-end";
    }
    if (left) {
      __justify_content = "flex-start";
    }
  } /* column */ else {
    if (center) {
      __justify_content = "center";
      __align_items = "center";
    }
    if (vcenter) {
      __justify_content = "center";
    }
    if (hcenter) {
      __align_items = "center";
    }
    if (right) {
      __align_items = "flex-end";
    }
    if (left) {
      __align_items = "flex-start";
    }
  }

  const container = (
    <div
      className={clsx(
        "geist-container",
        noWrap && "nowrap",
        row && !direction && ["sm-row", "md-row", "lg-row"],
        direction === "row" && ["sm-row", "md-row", "lg-row"],
        Array.isArray(direction) &&
          direction.reduce(
            (cn, dir, idx) => {
              const isRow = dir === "row";
              if (idx === 0) {
                cn["sm-row"] = isRow;
                cn["md-row"] = isRow;
                cn["lg-row"] = isRow;
              } else if (idx === 1) {
                cn["md-row"] = isRow;
                cn["lg-row"] = isRow;
              } else if (idx === 2) {
                cn["lg-row"] = isRow;
              }
              return cn;
            },
            {
              ["sm-row"]: false,
              ["md-row"]: false,
              ["lg-row"]: false,
            },
          ),
        className,
      )}
      style={{
        ...style,
        // @ts-ignore
        "--flex": __flex,
        "--justify-content": __justify_content,
        "--align-items": __align_items,
      }}
    >
      {children}
      <style jsx>{`
        .geist-container > :global(*) {
          --gap-ratio: ${gap};
        }
      `}</style>
    </div>
  );

  if (wrapper) {
    return <div className={"geist-wrapper"}>{container}</div>;
  } else {
    return container;
  }
};

export default Container;
