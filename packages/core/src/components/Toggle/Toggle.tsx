import clsx from "clsx";
import React from "react";
import { useCallback } from "react";
import { FocusRing } from "react-aria";

import reset from "../../styles/reset/reset.module.css";
import styles from "./Toggle.module.css";

interface Props {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  size?: "large";
  id?: string;
}

const Toggle = ({
  checked,
  disabled,
  onChange,
  onFocus,
  onBlur,
  size,
  id,
}: Props) => {
  const handleChange = useCallback(() => {
    !disabled && onChange?.(!checked);
  }, [disabled, onChange, checked]);

  return (
    <label
      onClick={(e) => {
        // prevent scrolling input into view
        e.preventDefault();
        // toggle state
        handleChange();
      }}
      className={clsx(styles.wrapper, { [styles.large]: size === "large" })}
    >
      <FocusRing focusRingClass={"focus-visible"}>
        <input
          id={id}
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          className={clsx(styles.input, reset.visuallyHidden)}
          type="checkbox"
        />
      </FocusRing>
      <span className={clsx(styles.toggle, { [styles.checked]: checked })}>
        <div
          className={clsx(styles.thumb, {
            [styles.checked]: checked,
            [styles.disabled]: disabled,
          })}
        ></div>
      </span>
    </label>
  );
};

export default Toggle;
