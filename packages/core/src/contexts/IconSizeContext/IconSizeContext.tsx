"use client";

import { PropsWithChildren, createContext } from "react";

export interface IIconSizeContext {
  size: number;
}

const IconSizeContext = createContext<IIconSizeContext>({
  size: 24,
});

export const IconSizeContextProvider = ({
  value,
  children,
}: PropsWithChildren<{ value: IIconSizeContext }>) => (
  <IconSizeContext.Provider value={value}>{children}</IconSizeContext.Provider>
);

export default IconSizeContext;
