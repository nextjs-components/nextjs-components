import clsx from "clsx";
import React from "react";

import styles from "./inline.module.css";

interface Props {
  children?: React.ReactNode;
  className?: string;
  noWrap?: boolean;
  title?: string;
  style?: React.CSSProperties;
}

const InlineCode = ({ children, className, noWrap, title, style }: Props) => {
  return (
    <code
      title={title}
      style={style}
      data-geist-inline-code=""
      className={clsx(styles.code, { [styles.nowrap]: !!noWrap }, className)}
    >
      {children}
    </code>
  );
};

export default InlineCode;
