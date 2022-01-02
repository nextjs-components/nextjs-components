import { createContext, useContext } from "react";

const DepthContext = createContext(0);

export const DepthContextProvider = DepthContext.Provider;
export const useDepth = () => useContext(DepthContext);
