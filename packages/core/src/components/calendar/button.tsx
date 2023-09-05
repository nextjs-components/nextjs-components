"use client";

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
