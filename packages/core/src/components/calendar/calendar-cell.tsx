import { isSameDay, isSameMonth, isToday } from "@internationalized/date";
import { useCalendarCell } from "@react-aria/calendar";
import { useFocusRing } from "@react-aria/focus";
import { useLocale } from "@react-aria/i18n";
import { mergeProps } from "@react-aria/utils";
import clsx from "clsx";
import { useRef } from "react";
import { useHover } from "react-aria";

import styles from "./calendar.module.css";

export function CalendarCell({ state, date }) {
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

  let { locale } = useLocale();

  let highlightedRange = "highlightedRange" in state && state.highlightedRange;

  let isFirstInRange =
    highlightedRange && isSameDay(date, highlightedRange.start);
  let isLastInRange = highlightedRange && isSameDay(date, highlightedRange.end);

  let { focusProps, isFocusVisible } = useFocusRing();
  let { hoverProps, isHovered } = useHover({});

  return (
    <td
      {...cellProps}
      className={clsx({
        [styles.firstInRange]: isFirstInRange,
        [styles.lastInRange]: isLastInRange,
      })}
    >
      <span
        {...mergeProps(buttonProps, focusProps, hoverProps)}
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
          [styles.disabled]: isDisabled, // faded; no hover ring
        })}
      >
        {formattedDate}
      </span>
    </td>
  );
}
