"use client";

import clsx from "clsx";
import Link from "next/link";
import { HtmlHTMLAttributes, PropsWithChildren } from "react";

import { useSwitchControlContext } from "./switch-control-context";
import styles from "./switch-control.module.css";

export interface ControlProps
  extends PropsWithChildren,
    HtmlHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  icon?: JSX.Element;
  href?: string;
  onClick?: () => void;
}

const Control = ({
  label,
  value,
  checked,
  defaultChecked,
  disabled,
  icon,
  href,
  ...rest
}: ControlProps) => {
  const { name, size } = useSwitchControlContext();

  const sharedClassNames = clsx(styles.control, {
    [styles.icon]: !!icon,
    [styles.text]: !icon,
    [styles.small]: size === "small",
    [styles.large]: size === "large",
    [styles.disabled]: disabled,
    [styles.checked]: checked,
  });

  if (href && !icon) {
    return (
      <Link href={href} className={sharedClassNames}>
        {label}
      </Link>
    );
  }

  return (
    <label className={styles.container} aria-label={label}>
      <input
        {...rest}
        name={name}
        className="geist-sr-only"
        type="radio"
        value={value}
        disabled={disabled}
        defaultChecked={defaultChecked}
        checked={checked}
      />
      <div className={sharedClassNames}>{icon ?? label}</div>
    </label>
  );
};

export default Control;
