import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import clsx from "clsx";
import { useRef } from "react";

import { Button } from "../Button";
import styles from "./calendar.module.css";

export function CalendarButton(props) {
  let ref = useRef();
  return (
    <Button
      {...props}
      ref={ref}
      svgOnly
      variant="unstyled"
      className={styles.caretButton}
      disabled={props.isDisabled}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      onClick={(e) => {
        props.onPress(e);
      }}
    >
      {props.children}
    </Button>
  );
}

export function FieldButton(props) {
  let ref = useRef();
  let { buttonProps, isPressed } = useButton(props, ref);
  return (
    <Button
      {...buttonProps}
      ref={ref}
      svgOnly
      variant="unstyled"
      disabled={props.isDisabled}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      onClick={(e) => {
        props.onPress(e);
      }}
    >
      {props.children}
    </Button>
  );
}
