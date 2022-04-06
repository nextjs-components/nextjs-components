import React from "react";
import clsx from "clsx";
import styles from "./list.module.css";

const UL: React.FC<{ classname: string }> = ({ children, classname }) => {
  return <ul className={clsx(styles.ul, classname)}>{children}</ul>;
};

export default UL;
