import clsx from "clsx";
import React, { forwardRef } from "react";

import { IconSizeContext } from "../../contexts/IconSizeContext";
import { Error } from "../Error";
import { Label } from "../Label";
import styles from "./input.module.css";

type InputProps = Partial<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>;
export interface Props extends Omit<InputProps, "size" | "prefix" | "suffix"> {
  size?: "small" | "large";
  prefix?: JSX.Element | string;
  suffix?: JSX.Element | string;
  prefixStyling?: boolean;
  /** if false, omits a wrapper span */
  prefixContainer?: boolean;
  suffixStyling?: boolean;
  /** if false, omits a wrapper span */
  suffixContainer?: boolean;
  label?: string;
  error?: boolean;
  type?: "error" | "success" | "warning";
  width?: React.CSSProperties["width"];
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      size,
      className,
      prefix,
      prefixStyling = true,
      prefixContainer = true,
      suffix,
      suffixStyling = true,
      suffixContainer = true,
      label,
      error,
      type,
      width,
      ...props
    },
    ref,
  ) => {
    const containerClassName = clsx(styles.container, {
      [styles[size]]: !!size,
      [styles.prefix]: !!prefix,
      [styles.suffix]: !!suffix,
      [styles.noPrefixStyle]: !prefixStyling,
      [styles.noSuffixStyle]: !suffixStyling,
      ["geist-error"]: !!error || type === "error",
      ["geist-success"]: type === "success",
      ["geist-warning"]: type === "warning",
      ["geist-themed"]: !!error || !!type,
      [styles.disabled]: props.disabled,
    });

    const inputClassName = clsx(styles.input, className, {
      [styles[size]]: !!size,
    });

    const _prefix = prefixContainer ? <span>{prefix}</span> : prefix;
    const _suffix = suffixContainer ? <span>{suffix}</span> : suffix;

    // small = 16
    // medium = 20
    // large = 24
    const iconSize = size === "small" ? 16 : size === "large" ? 24 : 20;

    if (label) {
      return (
        <IconSizeContext.Provider value={{ size: iconSize }}>
          <Label
            htmlFor={props.id || props.name}
            label={label}
            capitalize
            withInput
          >
            <div className={containerClassName}>
              <input {...props} ref={ref} className={inputClassName} />
              {_prefix}
              {_suffix}
            </div>
          </Label>
        </IconSizeContext.Provider>
      );
    }

    return (
      <IconSizeContext.Provider value={{ size: iconSize }}>
        <div className={containerClassName} style={{ width }}>
          <input {...props} ref={ref} className={inputClassName} />
          {_prefix}
          {_suffix}
        </div>
        {error ? (
          <Error style={{ marginTop: "var(--geist-gap-quarter)" }}>
            {error}
          </Error>
        ) : null}
      </IconSizeContext.Provider>
    );
  },
);

export default Input;
