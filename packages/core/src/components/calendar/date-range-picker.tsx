"use client";

import { type DateValue, getLocalTimeZone, now } from "@internationalized/date";
import { useDateRangePicker } from "@react-aria/datepicker";
import { useDateRangePickerState } from "@react-stately/datepicker";
import type { Granularity } from "@react-types/datepicker";
import type { RangeValue } from "@react-types/shared";
import clsx from "clsx";
import { PropsWithChildren, useRef } from "react";
import { OverlayContainer, useOverlayPosition } from "react-aria";
import { useDateFormatter } from "react-aria";

import { Calendar as CalendarIcon } from "../../icons";
import { Button } from "../Button";
import { Label } from "../Label";
import { Spacer } from "../Spacer";
import styles from "./calendar.module.css";
import { DateField } from "./date-field";
import { Popover } from "./popover";
import { RangeCalendar } from "./range-calendar";

export { type DateValue };
export { type RangeValue };
export interface DateRangePickerProps {
  minValue?: DateValue;
  maxValue?: DateValue;
  isDateUnavailable?: (date: DateValue) => boolean;
  placeholderValue?: DateValue;
  hourCycle?: 12 | 24;
  granularity?: Granularity;
  hideTimeZone?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  validationState?: "valid" | "invalid";
  isRequired?: boolean;
  autoFocus?: boolean;
  isOpen?: boolean;
  defaultOpen?: boolean;
  allowsNonContiguousRanges?: boolean;
  value?: RangeValue<DateValue> | null;
  defaultValue?: RangeValue<DateValue> | null;
  //
  label?: string;
}

export function DateRangePicker({
  granularity = "minute", // This causes DateField to render a TimeField
  hideTimeZone = false,
  ...props
}: DateRangePickerProps) {
  let formatter = useDateFormatter({
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  let state = useDateRangePickerState({
    ...props,
    granularity,
    hideTimeZone: false,
  });

  let ref = useRef(null);
  let overlayRef = useRef(null);

  let {
    groupProps,
    labelProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDateRangePicker({ ...props, granularity, hideTimeZone }, state, ref);

  // Get popover positioning props relative to the trigger
  let triggerRef = useRef(null);
  let { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    placement: "bottom start",
    offset: 8,
    isOpen: state.isOpen,
  });

  return (
    <div
      className={clsx(styles.calendar)}
      style={{ minWidth: 280, maxWidth: 280 }}
    >
      <span {...labelProps}>{props.label}</span>

      <div ref={triggerRef} style={{ display: "flex", flexDirection: "row" }}>
        <Button
          prefix={<CalendarIcon />}
          {...buttonProps}
          onClick={(e) => buttonProps.onPress?.(e)}
          type="secondary"
          typeName="button"
          style={{
            textTransform: "initial",
            justifyContent: "flex-start",
            minWidth: 280,
            maxWidth: 280,
          }}
          children={
            state.value.start && state.value.end
              ? formatter.formatRange(
                  state.value.start.toDate(getLocalTimeZone()),
                  state.value.end?.toDate(getLocalTimeZone()),
                )
              : "Select Date Range"
          }
        />
      </div>

      {state.isOpen && (
        <OverlayContainer>
          <Popover
            {...dialogProps}
            {...positionProps}
            ref={overlayRef}
            isOpen={state.isOpen}
            onOpenChange={state.setOpen}
          >
            <div className={clsx(styles.contentWrapper)}>
              <div
                // groupProps and ref must wrap the DateFields
                // in order for Left/Right arrow nav to work
                // see: https://react-spectrum.adobe.com/react-aria/useDateRangePicker.html#anatomy
                {...groupProps}
                ref={ref}
                className={styles.inputsWrapper}
              >
                <Label htmlFor="start-date" label="Start" capitalize />
                <div
                // className={styles.inputRow}
                >
                  <DateField
                    {...startFieldProps}
                    placeholderValue={now(getLocalTimeZone())}
                  />
                </div>

                <Spacer y={0.5} />

                <Label htmlFor="end-date" label="End" capitalize />
                <div
                // className={styles.inputRow}
                >
                  <DateField
                    {...endFieldProps}
                    placeholderValue={now(getLocalTimeZone())}
                  />
                </div>
              </div>

              <RangeCalendar {...calendarProps} />
            </div>
          </Popover>
        </OverlayContainer>
      )}
    </div>
  );
}
