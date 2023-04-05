import { useDateRangePicker } from "@react-aria/datepicker";
import { useDateRangePickerState } from "@react-stately/datepicker";
import type { DateValue } from "@react-types/datepicker/src/index";
import clsx from "clsx";
import { useRef } from "react";
import { OverlayContainer, useOverlayPosition } from "react-aria";

import { AlertTriangle, Calendar as CalendarIcon } from "../../icons";
import { Button } from "../Button";
import { Label } from "../Label";
import { Spacer } from "../Spacer";
import styles from "./calendar.module.css";
import { DateField } from "./date-field";
import { Popover } from "./popover";
import { RangeCalendar } from "./range-calendar";

export function DateRangePicker(props) {
  let state = useDateRangePickerState({
    ...props,
    granularity: "minute", // This causes DateField to render a TimeField
    hideTimeZone: false,
  });
  let ref = useRef();
  let overlayRef = useRef();

  let {
    groupProps,
    labelProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDateRangePicker(
    {
      ...props,
      granularity: "minute", // This causes DateField to render a TimeField
      hideTimeZone: false,
    },
    state,
    ref,
  );

  // Get popover positioning props relative to the trigger
  let { overlayProps: positionProps } = useOverlayPosition({
    targetRef: ref,
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

      <div
        {...groupProps}
        ref={ref}
        style={{ display: "flex", flexDirection: "row" }}
      >
        <Button
          prefix={<CalendarIcon />}
          {...buttonProps}
          onClick={(e) => buttonProps.onPress(e)}
          type="secondary"
          typeName="button"
          style={{
            textTransform: "initial",
            justifyContent: "flex-start",
            minWidth: 280,
            maxWidth: 280,
          }}
          children={
            state.value?.start
              ? `${formatter
                  .full(state.value.start)
                  .replace(/\s/g, "")
                  .replace(",", " ")} – ${formatter
                  .full(state.value.end)
                  .replace(/\s/g, "")
                  .replace(",", " ")}`
              : "Select Date Range"
          }
        />

        <div style={{ display: "flex", flexDirection: "row" }}>
          {state.validationState === "invalid" && (
            <AlertTriangle color="var(--geist-error)" />
          )}
        </div>
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
              <div className={styles.inputsWrapper}>
                <Label htmlFor="start-date" label="Start" capitalize />
                <div
                // className={styles.inputRow}
                >
                  <DateField {...startFieldProps} />
                </div>

                <Spacer y={0.5} />

                <Label htmlFor="end-date" label="End" capitalize />
                <div
                // className={styles.inputRow}
                >
                  <DateField {...endFieldProps} />
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

// 4/4 12:00AM
let formatter = {
  full: (e: DateValue) => {
    if (!e) return "";
    return e
      .toDate(Intl.DateTimeFormat().resolvedOptions().timeZone)
      .toLocaleString(undefined, {
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
  },
};
