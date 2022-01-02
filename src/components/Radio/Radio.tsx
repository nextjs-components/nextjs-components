import { createContext, useContext, useRef, FC } from "react";
import clsx from "clsx";
import { useRadioGroup, useRadio } from "@react-aria/radio";
import { useRadioGroupState } from "@react-stately/radio";
import { useFocusRing } from "@react-aria/focus";

import styles from "./radio.module.css";

let RadioContext = createContext(null);

interface RadioGroupProps {
  label: string;
  onChange?: (value: string) => void;
  value?: string;
}

export const RadioGroup: FC<RadioGroupProps> = (props) => {
  let { children, label } = props;
  let state = useRadioGroupState(props);
  let { radioGroupProps, labelProps } = useRadioGroup(props, state);

  return (
    <div {...radioGroupProps} data-geist-radio-group={""}>
      <span className="geist-sr-only" {...labelProps}>
        Default Radio Example
      </span>
      <RadioContext.Provider value={state}>{children}</RadioContext.Provider>
    </div>
  );
};

interface RadioItemProps {
  disabled?: boolean;
  value: string;
}

export const RadioItem: FC<RadioItemProps> = (props) => {
  let { children, disabled } = props;

  let { isFocusVisible, focusProps } = useFocusRing();

  let state = useContext(RadioContext);
  let ref = useRef(null);
  let { inputProps } = useRadio(props, state, ref);

  return (
    <label className={clsx([styles.item, { [styles.disabled]: disabled }])}>
      <span className={styles.check}>
        ​
        <input
          className={clsx([styles.input, "geist-sr-only"])}
          {...inputProps}
          {...focusProps}
          data-focus-visible-added={isFocusVisible ? "" : undefined}
        ></input>
        <span aria-hidden="true" className={styles.icon}></span>
      </span>
      {children && <span className={styles.text}>{children}</span>}
    </label>
  );
};
