import React from "react";
import clsx from "clsx";
import styles from "./list.module.css";

const OL: React.FC<{ classname?: string }> = ({ children, classname }) => {
  return <ol className={clsx(styles.ol, classname)}>{children}</ol>;
};

export default OL;
