import clsx from "clsx";
import type { Property } from "csstype";
import * as React from "react";

import styles from "./stack.module.css";

type ResponsiveProp<T extends any> =
  | T
  | {
      sm?: T;
      md?: T;
      lg?: T;
    };
type Direction = Property.FlexDirection;
type Align = Property.AlignItems;
type Justify = Property.JustifyContent;

export interface StackProps {
  as?: React.ElementType;
  gap?: ResponsiveProp<
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
    | 18
  >;
  direction?: ResponsiveProp<Direction>;
  align?: ResponsiveProp<Align>;
  justify?: ResponsiveProp<Justify>;
  flex?: string | number;
  debug?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Stack: React.FC<React.PropsWithChildren<StackProps>> = (props) => {
  const {
    children,
    as: Component = "div",
    gap = 0,
    direction = "column",
    align = "stretch",
    justify = "flex-start",
    flex = "initial",
    debug,
    className,
    style,
  } = props;

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

  let smGap: number;
  let mdGap: number;
  let lgGap: number;

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
      className={clsx(
        styles.stack,
        "stack",
        { [styles.debug]: debug },
        className,
      )}
      style={{
        "--flex": flex,
        ...(typeof direction === "object"
          ? {
              "--sm-direction": smDirection,
              "--md-direction": mdDirection,
              "--lg-direction": lgDirection,
            }
          : { "--direction": direction }),
        ...(typeof align === "object"
          ? {
              "--sm-align": smAlign,
              "--md-align": mdAlign,
              "--lg-align": lgAlign,
            }
          : {
              "--align": align,
            }),
        ...(typeof justify === "object"
          ? {
              "--sm-justify": smJustify,
              "--md-justify": mdJustify,
              "--lg-justify": lgJustify,
            }
          : { "--justify": justify }),
        ...style,
      }}
    >
      {children}
      <style jsx>{`
        @media screen and (min-width: 961px) {
          .stack {
            --direction: var(--lg-direction);
            --align: var(--lg-align);
            --justify: var(--lg-justify);
          }
          .stack > :global(*) + :global(*) {
            margin-${lgDirection === "row" ? "left" : "top"}: ${lgGap * 4}px;
          }
        }

        @media screen and (min-width: 601px) and (max-width: 960px) {
          .stack {
            --direction: var(--md-direction);
            --align: var(--md-align);
            --justify: var(--md-justify);
          }
          .stack > :global(*) + :global(*) {
            margin-${mdDirection === "row" ? "left" : "top"}: ${mdGap * 4}px;
          }
        }

        @media screen and (max-width: 600px) {
          .stack {
            --direction: var(--sm-direction);
            --align: var(--sm-align);
            --justify: var(--sm-justify);
          }
          .stack > :global(*) + :global(*) {
            margin-${smDirection === "row" ? "left" : "top"}: ${smGap * 4}px;
          }
        }
      `}</style>
    </Component>
  );
};

export default Stack;
