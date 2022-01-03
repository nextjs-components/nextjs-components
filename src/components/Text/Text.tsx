import React from "react";
import clsx from "clsx";
import { forwardRef } from "react";

// THIS APPEARS TO BE AN OLDER TEXT COMPONENT
// new props 08/03/2021
// var t = e.Component
// , n = e.h1
// , o = e.h2
// , a = e.h3
// , E = e.h4
// , T = e.h5
// , c = e.h6
// , _ = e.p
// , s = e.small
// , O = e.span
// , A = e.mark
// , C = e.underline
// , N = e.strike
// , d = e.bold
// , R = e.italic
// , u = e.children
interface Props {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  p?: boolean; // default
  type?: "secondary" | "warning" | "error" | "alert" | "violet";
  small?: boolean;
  style?: React.CSSProperties;
  preset?: "body-2";
  noMargin?: boolean;
  center?: boolean;
  className?: string;
  label?: boolean;
  Component?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children?: React.ReactNode;
  id?: React.HTMLAttributes<HTMLHeadingElement>["id"];
}

/**
 * @Note see `globals.css` for `.geist-text` styles
 */
const Text = forwardRef<unknown, Props>(
  (
    {
      children,
      // main ---
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      type,
      small,
      // ---
      style,
      preset,
      noMargin,
      center,
      className,
      label,
      Component,
      id,
      ...props
    },
    ref: any
  ) => {
    const keys = {
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      small,
      ["geist-text-center"]: center,
      label,
      ["geist-text-no-margin"]: noMargin,
    };
    const cn = clsx(
      type && ["geist-themed", "geist-".concat(type)],
      "geist-text",
      keys,
      preset,
      className
    );

    if (Component) {
      return (
        <Component
          {...{ ref }}
          {...{ id }}
          className={cn}
          style={style}
          {...props}
        >
          {children}
        </Component>
      );
    }
    if (h1) {
      return (
        <h1 {...{ ref }} {...{ id }} className={cn} style={style} {...props}>
          {children}
        </h1>
      );
    }
    if (h2) {
      return (
        <h2 {...{ ref }} {...{ id }} className={cn} style={style} {...props}>
          {children}
        </h2>
      );
    }
    if (h3) {
      return (
        <h3 {...{ ref }} {...{ id }} className={cn} style={style} {...props}>
          {children}
        </h3>
      );
    }
    if (h4) {
      return (
        <h4 {...{ ref }} {...{ id }} className={cn} style={style} {...props}>
          {children}
        </h4>
      );
    }
    if (h5) {
      return (
        <h5 {...{ ref }} {...{ id }} className={cn} style={style} {...props}>
          {children}
        </h5>
      );
    }
    if (h6) {
      return (
        <h6 {...{ ref }} {...{ id }} className={cn} style={style} {...props}>
          {children}
        </h6>
      );
    }
    if (p) {
      return (
        <p {...{ ref }} className={cn} style={style} {...props}>
          {children}
        </p>
      );
    }
    if (small) {
      return (
        <small {...{ ref }} className={cn} style={style} {...props}>
          {children}
        </small>
      );
    }

    return (
      <p {...{ ref }} className={clsx(cn, "p")} style={style} {...props}>
        {children}
      </p>
    );
  }
);

export default Text;
