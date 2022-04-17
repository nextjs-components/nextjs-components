import React from "react";
import clsx from "clsx";
import styles from "./list.module.css";

const LI: React.FC<{ classname?: string }> = ({ children, classname }) => {
  return <li className={clsx(styles.li, classname)}>{children}</li>;
};

export default LI;
