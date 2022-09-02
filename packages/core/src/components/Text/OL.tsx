import clsx from "clsx";
import React from "react";

import styles from "./list.module.css";

type OLProps = React.OlHTMLAttributes<HTMLOListElement>;
const OL: React.FC<OLProps> = ({ children, className, ...props }) => {
  return (
    <ol className={clsx(styles.ol, className)} {...props}>
      {children}
    </ol>
  );
};

export default OL;
