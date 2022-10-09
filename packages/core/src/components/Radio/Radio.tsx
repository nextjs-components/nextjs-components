import clsx from "clsx";
import React from "react";
import { FC, createContext, useContext, useRef } from "react";
import { useFocusRing, useRadio, useRadioGroup } from "react-aria";
import { useRadioGroupState } from "react-stately";

import styles from "./radio.module.css";

const RadioContext = createContext(null);

interface RadioGroupProps {
  label: string;
  name?: string;
  value: string | null;
  onChange?: (value: string | null) => void;
  required?: boolean;
  disabled?: boolean;
}

export const RadioGroup: FC<React.PropsWithChildren<RadioGroupProps>> = (
  props,
) => {
  const { children, label } = props;
  const state = useRadioGroupState({ ...props, isDisabled: props.disabled });
  const { radioGroupProps, labelProps } = useRadioGroup(props, state);

  return (
    <div {...radioGroupProps} data-geist-radio-group={""}>
      <span className="geist-sr-only" {...labelProps}>
        {label || "Default Radio Example"}
      </span>
      <RadioContext.Provider value={state}>{children}</RadioContext.Provider>
    </div>
  );
};

interface RadioItemProps {
  value: string;
  label?: boolean;
  disabled?: boolean;
}

export const RadioItem: FC<React.PropsWithChildren<RadioItemProps>> = (
  props,
) => {
  const { children } = props;
  const state = useContext(RadioContext);
  const ref = useRef(null);
  const { inputProps, isDisabled } = useRadio(props, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <label className={clsx([styles.item, { [styles.disabled]: isDisabled }])}>
      <span className={styles.check}>
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
