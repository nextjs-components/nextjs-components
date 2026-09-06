"use client";

import { createCalendar } from "@internationalized/date";
import { useCalendar } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { useCalendarState } from "@react-stately/calendar";
import { useRef } from "react";

import ChevronLeft from "../../icons/chevron-left";
import ChevronRight from "../../icons/chevron-right";
import { CalendarButton } from "./button";
import { CalendarGrid } from "./calendar-grid";

export default function Calendar(props) {
  let { locale } = useLocale();
  let state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  let ref = useRef();
  let { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
    props,
    state,
  );

  return (
    <div {...calendarProps} ref={ref}>
      <div>
        <h2>{title}</h2>
        <CalendarButton {...prevButtonProps}>
          <ChevronLeft />
        </CalendarButton>
        <CalendarButton {...nextButtonProps}>
          <ChevronRight />
        </CalendarButton>
      </div>
      {/* <CalendarGrid state={state} /> */}
    </div>
  );
}
