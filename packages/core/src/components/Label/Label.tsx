import clsx from "clsx";
import React from "react";

import styles from "./Label.module.css";

interface Props
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  label?: React.ReactNode;
  capitalize?: boolean;
  withInput?: boolean;
}

const Label: React.ComponentType<Props> = ({
  children,
  htmlFor,
  label,
  style,
  capitalize,
  withInput,
}) => {
  return (
    <label htmlFor={htmlFor}>
      {label && (
        <div
          className={clsx(styles.label, {
            [styles.capitalize]: capitalize,
            [styles.input]: withInput,
          })}
          {...{ style }}
        >
          {label}
        </div>
      )}
      {children}
    </label>
  );
};

export default Label;
