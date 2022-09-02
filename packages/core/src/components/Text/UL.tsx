import clsx from "clsx";
import React from "react";

import styles from "./list.module.css";

type ULProps = React.HTMLAttributes<HTMLUListElement>;
const UL: React.FC<ULProps> = ({ children, className, ...props }) => {
  return (
    <ul className={clsx(styles.ul, className)} {...props}>
      {children}
    </ul>
  );
};

export default UL;
