import {
  type CalendarDate,
  isSameDay,
  isSameMonth,
  isToday,
} from "@internationalized/date";
import { useCalendarCell } from "@react-aria/calendar";
import { mergeProps } from "@react-aria/utils";
import clsx from "clsx";
import { useRef } from "react";
import { useHover } from "react-aria";
import { RangeCalendarState } from "react-stately";

import styles from "./calendar.module.css";

export function CalendarCell({
  state,
  date,
}: {
  state: RangeCalendarState;
  date: CalendarDate;
}) {
  let ref = useRef();
  let {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    formattedDate,
    isInvalid,
  } = useCalendarCell({ date }, state, ref);
  state;
  let highlightedRange = "highlightedRange" in state && state.highlightedRange;

  let isFirstInRange =
    highlightedRange && isSameDay(date, highlightedRange.start);
  let isLastInRange = highlightedRange && isSameDay(date, highlightedRange.end);

  let { hoverProps, isHovered } = useHover({});

  let isTechnicallyValid = true;
  if (state.maxValue) {
    if (date > state.maxValue) {
      isTechnicallyValid = false;
    }
  }
  if (state.minValue) {
    if (date < state.minValue) {
      isTechnicallyValid = false;
    }
  }
  if (isTechnicallyValid) {
    cellProps["aria-disabled"] = false;
    if (highlightedRange) {
      if (date >= highlightedRange.start && date <= highlightedRange.end) {
        cellProps["aria-selected"] = true;
      }
    }
  }

  return (
    <td
      {...cellProps} // role, aria-selected, aria-disabled
      className={clsx({
        [styles.firstInRange]: isFirstInRange,
        [styles.lastInRange]: isLastInRange,
      })}
    >
      <span
        {...mergeProps(buttonProps, hoverProps)}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className={clsx({
          [styles.highlight]: isToday(date, state.timeZone), // Blue
          [styles.focused]: state.isCellFocused(date), // thick ring
          [styles.outsideMonth]: !isSameMonth(
            date,
            state.visibleRange.start.add({}),
          ), // faded
          [styles.hovered]: isHovered, // thin ring
          [styles.selected]: isFirstInRange || isLastInRange, // White
          [styles.disabled]: !isTechnicallyValid && isDisabled, // faded; no hover ring
        })}
        // TODO: improve onClick & onMouseOver
        onClick={() => {
          if (isTechnicallyValid && isDisabled) {
            // state.setFocusedDate(null);
            state.selectDate(date);
          }
        }}
      >
        {formattedDate}
      </span>
    </td>
  );
}
