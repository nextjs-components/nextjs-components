"use client";

import type { AriaButtonProps } from "@react-types/button";
import { useRef } from "react";

import { Button } from "../Button";
import styles from "./calendar.module.css";

export function CalendarButton(props: AriaButtonProps) {
  let ref = useRef<HTMLButtonElement>(null);
  return (
    // @ts-expect-error - AriaButtonProps does not conform to ButtonProps
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
        props.onPress?.(e);
      }}
    >
      {props.children}
    </Button>
  );
}
