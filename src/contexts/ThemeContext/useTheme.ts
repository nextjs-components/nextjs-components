import { useContext } from "react";

import { ThemeContext } from "./ThemeContext";

const useTheme = () => useContext(ThemeContext);

export default useTheme;
