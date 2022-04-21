import React from "react";
import clsx from "clsx";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

import Search from "../../icons/Search";
import styles from "./SearchInput.module.css";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}
const SearchInput: React.ComponentType<Props> = ({ className, ...props }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}>
        <Search />
      </span>
      <div className={styles.input_wrapper}>
        <input className={clsx(className, styles.input)} {...props} />
      </div>
    </div>
  );
};

export default SearchInput;
