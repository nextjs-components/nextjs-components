"use client";

// This is a client wrapper file for contexts so that the base Switch may be a RSC.
import { PropsWithChildren, createContext, useContext } from "react";

export interface ISwitchControlContext {
  name: string;
  size?: "small" | "large";
}
export const SwitchControlContext = createContext<ISwitchControlContext>({
  name: "default",
});

export const SwitchControlContextProvider = ({
  value,
  children,
}: PropsWithChildren<{ value: ISwitchControlContext }>) => {
  return (
    <SwitchControlContext.Provider value={value}>
      {children}
    </SwitchControlContext.Provider>
  );
};

export const useSwitchControlContext = () => useContext(SwitchControlContext);
