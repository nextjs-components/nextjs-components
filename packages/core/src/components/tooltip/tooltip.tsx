import * as Portal from "@radix-ui/react-portal";
import clsx from "clsx";
import {
  type CSSProperties,
  Children,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  useId,
  useRef,
} from "react";
import { mergeProps, useTooltip, useTooltipTrigger } from "react-aria";
import { useTooltipTriggerState } from "react-stately";
import useMeasure from "react-use-measure";

import styles from "./tooltip.module.css";

interface Props {
  as?: React.ElementType;
  boxAlign?: string;
  center?: boolean;
  className?: string;
  cursor?: string;
  delay?: boolean;
  delayTime?: number;
  desktopOnly?: boolean;
  disableTriggers?: boolean;
  fill?: boolean;
  hideOnClick?: boolean;
  invert?: boolean;
  maxWidth?: string;
  padding?: string;
  position?: string;
  shown?: boolean;
  sticky?: boolean;
  style?: CSSProperties;
  tabIndex?: number;
  text?: string;
  tip?: boolean;
  tooltipClassName?: string;
  type?: string;
  wrap?: boolean;
  useParentForBoundingRect?: boolean;
  lowerDelay?: boolean;
  forceHide?: boolean;
}

// TODO(kevin): use all the props here
const Tooltip = ({
  children,
  as,
  boxAlign = "auto",
  center,
  className,
  cursor,
  delay,
  delayTime,
  disableTriggers = false,
  fill = true,
  hideOnClick = false,
  invert = true,
  maxWidth = "250px",
  padding,
  position = "top",
  shown = false,
  sticky = false,
  style,
  tabIndex = 0,
  text,
  tip = true,
  tooltipClassName,
  type,
  wrap = true,
  useParentForBoundingRect = false,
  lowerDelay = false,
  forceHide = false,
}: PropsWithChildren<Props>) => {
  // const id = "tooltip-" + useId();
  const [ref, bounds] = useMeasure();

  let state = useTooltipTriggerState({
    defaultOpen: false,
    delay: delayTime ?? 500,
    isDisabled: disableTriggers,
  });

  // Get props for the trigger and its tooltip
  // @ts-expect-error - react-use-measure's ref type is not compatible with react-aria's ref type
  let { triggerProps, tooltipProps: _ttp } = useTooltipTrigger({}, state, ref);

  let { tooltipProps } = useTooltip(_ttp, state);

  const x = bounds.width / 2;
  const y = bounds.height / 2;
  const transform =
    position === "top"
      ? `translate(calc(-50% + ${x}px), calc(-100% - ${y}px))`
      : position === "bottom"
      ? `translate(calc(-50% + ${x}px), calc(${y * 3}px))`
      : position === "left"
      ? `translate(calc(-100% - ${x}px), calc(-50% + ${y}px))`
      : position === "right"
      ? `translate(calc(${x * 3}px), calc(-50% + ${y}px))`
      : undefined;

  const Component = as || "span";
  return (
    <>
      <Component
        ref={ref}
        className={clsx(styles.container, className)}
        style={style}
        {...mergeProps(triggerProps, { tabIndex })}
      >
        {children}
      </Component>
      {state.isOpen ? (
        <Portal.Root asChild>
          <div
            {...tooltipProps}
            className={clsx(
              styles.tooltip,
              tooltipClassName,
              {
                [styles.top]: position === "top",
                [styles.bottom]: position === "bottom",
                [styles.left]: position === "left",
                [styles.right]: position === "right",
                [styles["box-align-auto"]]: true,
                [styles.delay]: !!delay,
                [styles.tip]: !!tip,
                [styles.center]: true,
              },
              "invert-theme",
            )}
            style={{
              position: "absolute",
              maxWidth,
              transform,
              top: bounds.top,
              left: bounds.left,
            }}
          >
            <i className={styles.triangle} />
            {text}
          </div>
        </Portal.Root>
      ) : null}
    </>
  );
};

export default Tooltip;
