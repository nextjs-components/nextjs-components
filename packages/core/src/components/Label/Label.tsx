import clsx from "clsx";
import React from "react";

import styles from "./Label.module.css";

interface Props
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  label?: React.ReactNode;
}

const Label: React.ComponentType<Props> = ({
  children,
  htmlFor,
  label,
  style,
}) => {
  return (
    <label htmlFor={htmlFor}>
      {label && (
        <div className={clsx(styles.label, styles.input)} {...{ style }}>
          {label}
        </div>
      )}
      {children}
    </label>
  );
};

export default Label;
