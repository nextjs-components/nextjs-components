import clsx from "clsx";
// import from "./module.css";

// e.row
// e.direction
// e.left
// e.right
// e.top
// e.bottom
// e.hcenter
// e.vcenter
// e.vbaseline
// e.center
// e.noWrap
// e.wrapper
// e.halfGap
// e.gap
// e.children
// e.flex
// e.inline
// e.full
// e.classNames
// e.styleSets
// e.Component
// e.className
// e.style

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

const Container: React.ComponentType<Props> = ({
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
  const __flex = flex;
  const __justify_content = center || vcenter ? "center" : "flex-start";
  const __align_items =
    center || hcenter
      ? "center"
      : left
      ? "flex-start"
      : right
      ? "flex-end"
      : "stretch";

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
            }
          ),
        className
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
