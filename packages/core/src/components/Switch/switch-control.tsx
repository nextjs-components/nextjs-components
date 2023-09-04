"use client";

import clsx from "clsx";
import Link from "next/link";
import {
  HtmlHTMLAttributes,
  PropsWithChildren,
  createContext,
  useContext,
} from "react";

import { IconSizeContext } from "../../contexts/IconSizeContext";
import { Stack } from "../Stack";
import switchStyles from "./Switch.module.css";
import styles from "./switch-control.module.css";

const SwitchControlContext = createContext<{
  name: string;
  defaultChecked?: string;
  size?: "small" | "large";
}>({ name: "default" });
const useSwitchControlContext = () => useContext(SwitchControlContext);

interface SwitchProps extends PropsWithChildren {
  name: string;
  defaultChecked?: string;
  size?: "small" | "large";
}
const Switch = ({ children, name, defaultChecked, size }: SwitchProps) => {
  return (
    <SwitchControlContext.Provider value={{ name, defaultChecked, size }}>
      <IconSizeContext.Provider value={{ size: size == "large" ? 20 : 16 }}>
        <Stack
          direction={"row"}
          className={clsx(switchStyles.switch, {
            [switchStyles.small]: size === "small",
            [switchStyles.large]: size === "large",
          })}
        >
          {children}
        </Stack>
      </IconSizeContext.Provider>
    </SwitchControlContext.Provider>
  );
};

interface ControlProps
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
    <label className={styles.container}>
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

export default Object.assign(Switch, { Control });
