import clsx from "clsx";
import type { Property } from "csstype";
import type { AriaRole, PropsWithChildren } from "react";

import styles from "./stack.module.css";

type ResponsiveProp<T extends any> = T | { sm?: T; md?: T; lg?: T };
type Direction = Property.FlexDirection;
type Align = Property.AlignItems;
type Justify = Property.JustifyContent;
type Space =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18;

export interface StackProps extends PropsWithChildren {
  as?: React.ElementType;
  direction?: ResponsiveProp<Direction>;
  align?: ResponsiveProp<Align>;
  justify?: ResponsiveProp<Justify>;
  flex?: string | number;
  padding?: ResponsiveProp<Space>;
  paddingX?: ResponsiveProp<Space>;
  paddingY?: ResponsiveProp<Space>;
  paddingTop?: ResponsiveProp<Space>;
  paddingBottom?: ResponsiveProp<Space>;
  paddingLeft?: ResponsiveProp<Space>;
  paddingRight?: ResponsiveProp<Space>;
  gap?: ResponsiveProp<Space>;
  debug?: boolean;
  className?: string;
  style?: React.CSSProperties;
  role?: AriaRole;
  "data-testid"?: string;
}

const Stack = (props: StackProps) => {
  const {
    as: Component = "div",
    children,
    direction = "column",
    align = "stretch",
    justify = "flex-start",
    flex = "initial",
    padding = 0,
    paddingX = padding,
    paddingY = padding,
    paddingTop = paddingY,
    paddingBottom = paddingY,
    paddingLeft = paddingX,
    paddingRight = paddingX,
    gap = 0,
    debug,
    className,
    style,
    role,
  } = props;

  const dataTestId = props["data-testid"];

  let smDirection: StackProps["direction"];
  let mdDirection: StackProps["direction"];
  let lgDirection: StackProps["direction"];

  if (typeof direction === "object") {
    smDirection = direction.sm || "column";
    mdDirection = direction.md || "column";
    lgDirection = direction.lg || "column";
  } else {
    smDirection = direction;
    mdDirection = direction;
    lgDirection = direction;
  }

  let smAlign: StackProps["align"];
  let mdAlign: StackProps["align"];
  let lgAlign: StackProps["align"];

  if (typeof align === "object") {
    smAlign = align.sm || "stretch";
    mdAlign = align.md || "stretch";
    lgAlign = align.lg || "stretch";
  } else {
    smAlign = align;
    mdAlign = align;
    lgAlign = align;
  }

  let smJustify: StackProps["justify"];
  let mdJustify: StackProps["justify"];
  let lgJustify: StackProps["justify"];

  if (typeof justify === "object") {
    smJustify = justify.sm || "flex-start";
    mdJustify = justify.md || "flex-start";
    lgJustify = justify.lg || "flex-start";
  } else {
    smJustify = justify;
    mdJustify = justify;
    lgJustify = justify;
  }

  let smGap: StackProps["gap"];
  let mdGap: StackProps["gap"];
  let lgGap: StackProps["gap"];

  if (typeof gap === "object") {
    smGap = gap.sm || 0;
    mdGap = gap.md || 0;
    lgGap = gap.lg || 0;
  } else {
    smGap = gap || 0;
    mdGap = gap || 0;
    lgGap = gap || 0;
  }

  return (
    <Component
      data-testid={dataTestId}
      role={role}
      className={clsx(
        styles.stack,
        "stack",
        { [styles.debug]: debug },
        className,
      )}
      style={{
        "--stack-flex": flex,
        ...(typeof direction === "object"
          ? {
              "--sm-stack-direction": smDirection,
              "--md-stack-direction": mdDirection,
              "--lg-stack-direction": lgDirection,
            }
          : { "--stack-direction": direction }),
        ...(typeof align === "object"
          ? {
              "--sm-stack-align": smAlign,
              "--md-stack-align": mdAlign,
              "--lg-stack-align": lgAlign,
            }
          : {
              "--stack-align": align,
            }),
        ...(typeof justify === "object"
          ? {
              "--sm-stack-justify": smJustify,
              "--md-stack-justify": mdJustify,
              "--lg-stack-justify": lgJustify,
            }
          : { "--stack-justify": justify }),
        ...(typeof gap === "object"
          ? {
              "--sm-stack-gap": scalePx(smGap),
              "--md-stack-gap": scalePx(mdGap),
              "--lg-stack-gap": scalePx(lgGap),
            }
          : { "--stack-gap": scalePx(gap) }),
        ...style,
      }}
    >
      {children}
    </Component>
  );
};

// tiny function to dry up string-templating
// for gap to 4px scale conversion
function scalePx(value: number, scale = 4) {
  return `${value * 4}px`;
}

export default Stack;
