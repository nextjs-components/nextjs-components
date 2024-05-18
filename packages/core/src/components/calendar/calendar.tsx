"use client";

import { createCalendar } from "@internationalized/date";
import { useCalendar } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { useCalendarState } from "@react-stately/calendar";
import { useRef } from "react";

import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "../../icons";
import { CalendarButton } from "./button";
import { CalendarGrid } from "./calendar-grid";

// @ts-expect-error - TODO(kevinwang) type CalendarProps
export default function Calendar(props) {
  let { locale } = useLocale();
  let state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  let ref = useRef(null);
  let { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
    props,
    state,
  );

  return (
    <div {...calendarProps} ref={ref}>
      <div>
        <h2>{title}</h2>
        <CalendarButton {...prevButtonProps}>
          <ChevronLeftIcon />
        </CalendarButton>
        <CalendarButton {...nextButtonProps}>
          <ChevronRightIcon />
        </CalendarButton>
      </div>
      {/* <CalendarGrid state={state} /> */}
    </div>
  );
}
