import { getLocalTimeZone, now } from "@internationalized/date";
import { useDateRangePicker } from "@react-aria/datepicker";
import { useDateRangePickerState } from "@react-stately/datepicker";
import clsx from "clsx";
import { useRef } from "react";
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

// TODO type this
type DateRangePickerProps = any;

export function DateRangePicker(props: DateRangePickerProps) {
  let formatter = useDateFormatter({
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

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
  let triggerRef = useRef();
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
