import React from "react";

import styles from "./spacer.module.css";

interface Props {
  y?: number;
  x?: number;
}
/**
 * y * 24
 */
const Spacer: React.ComponentType<Props> = ({ y, x }) => {
  const style: React.CSSProperties = {};
  if (y) style.marginTop = 24 * y - 1;
  if (x) style.marginLeft = 24 * x - 1;
  return (
    <span aria-hidden="true" className={styles["geist-spacer"]} style={style} />
  );
};

export default Spacer;
