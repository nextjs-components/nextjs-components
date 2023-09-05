import clsx from "clsx";
import type { PropsWithChildren } from "react";

import { IconSizeContextProvider } from "../../contexts/IconSizeContext/IconSizeContext";
import { Stack } from "../Stack";
import switchStyles from "./Switch.module.css";
import Control from "./control";
import { SwitchControlContextProvider } from "./switch-control-context";

export interface SwitchProps extends PropsWithChildren {
  name: string;
  size?: "small" | "large";
  className?: string;
}
const Switch = ({ children, name, className, size }: SwitchProps) => {
  return (
    <SwitchControlContextProvider value={{ name, size }}>
      <IconSizeContextProvider value={{ size: size == "large" ? 20 : 16 }}>
        <Stack
          direction={"row"}
          className={clsx(className, switchStyles.switch, {
            [switchStyles.small]: size === "small",
            [switchStyles.large]: size === "large",
          })}
        >
          {children}
        </Stack>
      </IconSizeContextProvider>
    </SwitchControlContextProvider>
  );
};

// https://github.com/vercel/next.js/issues/41940
// - https://github.com/vercel/next.js/issues/41940
export default Object.assign(Switch, { Control });
