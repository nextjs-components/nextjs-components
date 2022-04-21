import React from "react";
import clsx from "clsx";
import ChevronUpDown from "../../icons/ChevronUpDown";

import styles from "./Select.module.css";

interface Props
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  small?: boolean;
  disabled?: boolean;
}

const Select: React.FC<Props> = ({ children, small, disabled, ...props }) => {
  return (
    <div
      className={clsx(styles.container, {
        [styles.disabled]: disabled,
      })}
    >
      <select
        disabled={disabled}
        className={clsx(styles.select, {
          [styles.small]: small,
        })}
        {...props}
      >
        {children}
      </select>
      <span className={styles.suffix}>
        <ChevronUpDown />
      </span>
    </div>
  );
};

export default Select;
