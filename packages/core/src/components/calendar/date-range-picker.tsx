import { useDateRangePicker } from "@react-aria/datepicker";
import { useDateRangePickerState } from "@react-stately/datepicker";
import { DateValue } from "@react-types/datepicker/src/index";
import clsx from "clsx";
import { useRef } from "react";
import { OverlayContainer, useOverlayPosition } from "react-aria";

import { AlertTriangle, Calendar as CalendarIcon } from "../../icons";
import { Button } from "../Button";
import { FieldButton } from "./button";
import styles from "./calendar.module.css";
import { DateField } from "./date-field";
import { Popover } from "./popover";
import { RangeCalendar } from "./range-calendar";

export function DateRangePicker(props) {
  let state = useDateRangePickerState({
    ...props,
    granularity: "hour",
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
  } = useDateRangePicker(props, state, ref);

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
          {/* <DateField {...startFieldProps} /> */}
          {/* <span aria-hidden="true">–</span> */}
          {/* <DateField {...endFieldProps} /> */}

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
            <RangeCalendar {...calendarProps} />
          </Popover>
        </OverlayContainer>
      )}
    </div>
  );
}

let formatter = {
  full: (e: DateValue) =>
    e
      .toDate(Intl.DateTimeFormat().resolvedOptions().timeZone)
      .toLocaleString(undefined, {
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: !0,
      }),
};
