"use client";

import type { KeyboardEvent, PressEvent } from "@react-types/shared";
import clsx from "clsx";
import { ElementType, forwardRef, useContext, useRef, useState } from "react";
import { useButton, useHover } from "react-aria";

import { DisabledContext } from "../../contexts/DisabledContext";
import { IconSizeContext } from "../../contexts/IconSizeContext";
import reset from "../../styles/reset/reset.module.css";
import { mergeRefs } from "../../utils/merge-refs";
import { Spinner } from "../Spinner";
import styles from "./button.module.css";

type IntrinsicProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export interface Props
  extends Omit<
    IntrinsicProps,
    "prefix" | "type" | "onClick" | "onKeyDown" | "onMouseDown"
  > {
  size?: "small" | "large";
  prefix?: JSX.Element | string;
  suffix?: JSX.Element | string;
  align?: "start" | "grow" | "center";
  type?: "secondary" | "success" | "error" | "warning" | "alert" | "violet";
  shape?: "square" | "circle";
  variant?: "shadow" | "ghost" | "unstyled";
  loading?: boolean;
  onClick?: (e: PressEvent) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  onMouseDown?: (e: PressEvent) => void;
  svgOnly?: boolean;
  Component?: ElementType;
  typeName?: IntrinsicProps["type"];
}

// let {Component: n="button", typeName: h="submit", className: g, href: b, as: w, target: E, rel: C, disabled: A, loading: j, width: S, type: k, size: T, prefix: O, normalStyle: D, hoverStyle: L, suffix: I, onClick: R, variant: P="invert", shape: N, align: M, children: V, onMouseDown: F, onMouseUp: B, svgOnly: H, passthroughOnClick: $, passthroughOnMouseEnter: U, touchEventWorkaround: z=!1, ...W} =

const Button: React.ComponentType<Props> = forwardRef(
  (
    {
      // custom props
      size,
      prefix,
      suffix,
      align,
      type,
      shape,
      variant,
      // native props
      className,
      children,
      disabled,
      loading,
      onClick,
      onKeyDown,
      onMouseDown,
      svgOnly,
      Component = "button",
      typeName = "submit",
      ...props
    },
    externalRef,
  ) => {
    const ctxDisabled = useContext(DisabledContext);
    const isDisabled = disabled ?? ctxDisabled;

    const [isFocused, setFocused] = useState(false);

    const ref = useRef<HTMLButtonElement>();
    const { buttonProps, isPressed } = useButton(
      {
        ...props,
        elementType: Component,
        type: "submit",
        isDisabled: isDisabled || loading,
        onFocusChange: setFocused,
        onKeyDown: (e) => {
          // prevent holding down from rapid firing
          // https://stackoverflow.com/a/38241109
          if (e.repeat) return null;

          onKeyDown?.(e);
          return e;
        },
        onPress: (e) => {
          onClick?.(e);
          return e;
        },
        onPressStart(e) {
          // prevent focus ring on mouse click.
          // and prevent FocusScopes from restoring focus to this button
          if (e.pointerType === "mouse") {
            // https://stackoverflow.com/a/3995570
            // @ts-expect-error - blur may or may not be defined
            document.activeElement?.blur?.();
            onMouseDown?.(e);
          }
          return e;
        },
      },
      ref,
    );

    const iconSizeContextValue = {
      size: size === "large" ? 24 : size === "small" ? 16 : 20,
    };

    const { hoverProps, isHovered } = useHover({
      isDisabled: isDisabled || loading,
    });

    return (
      <Component
        ref={mergeRefs([ref, externalRef])}
        data-geist-button=""
        {...props}
        {...hoverProps}
        {...buttonProps}
        type={typeName}
        data-focus={isFocused ? "" : null}
        data-active={isPressed ? "" : null}
        data-hover={isHovered ? "" : null}
        className={clsx([
          reset.reset,
          styles.base,
          { [styles.button]: variant !== "unstyled" },
          !variant && styles.invert,
          {
            [styles.ghost]: variant === "ghost",
            [styles.shadow]: variant === "shadow",
          },
          {
            [styles.shape]: !!shape,
            [styles.circle]: shape === "circle",
          },
          {
            [styles.secondary]: type === "secondary",
            [styles[size]]: !!size,
            [styles.disabled]: isDisabled,
          },
          type === "success" && [
            "geist-themed",
            "geist-success",
            "geist-success-fill",
          ],
          type === "error" && [
            "geist-themed",
            "geist-error",
            "geist-error-fill",
          ],
          type === "warning" && [
            "geist-themed",
            "geist-warning",
            "geist-warning-fill",
          ],
          type === "alert" && [
            "geist-themed",
            "geist-alert",
            "geist-alert-fill",
          ],
          type === "violet" && [
            "geist-themed",
            "geist-violet",
            "geist-violet-fill",
          ],
          className,
        ])}
      >
        <IconSizeContext.Provider value={iconSizeContextValue}>
          {prefix && (
            <span className={styles.prefix}>
              {loading ? (
                <Spinner size={16} color={"var(--accents-5)"} />
              ) : (
                prefix
              )}
            </span>
          )}
          <span
            className={clsx(styles.content, {
              [styles.grow]: align === "grow",
              [styles.start]: align === "start",
              [styles.center]: align === "center",
              [styles.flex]: svgOnly,
            })}
          >
            {children}
          </span>
          {suffix && <span className={styles.suffix}>{suffix}</span>}
        </IconSizeContext.Provider>
      </Component>
    );
  },
);

Button.displayName = "Button";
export default Button;
