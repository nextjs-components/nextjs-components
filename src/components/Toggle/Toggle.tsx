import { useCallback } from "react";
import clsx from "clsx";
import { useIsSSR } from "@react-aria/ssr";
import { FocusRing } from "@react-aria/focus";

import styles from "./Toggle.module.css";
import reset from "styles/reset/reset.module.css";

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

  // isSSR + checked is a hack for
  // 1. resolves the 'different server and client values warning'
  // 2. fixes a bug where className doesn't update, despite changing
  const isSSR = useIsSSR();

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
      <span
        className={clsx(styles.toggle, { [styles.checked]: !isSSR && checked })}
      >
        <div
          className={clsx(styles.thumb, {
            [styles.checked]: !isSSR && checked,
            [styles.disabled]: disabled,
          })}
        ></div>
      </span>
    </label>
  );
};

export default Toggle;
