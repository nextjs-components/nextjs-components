"use client";

import { createCalendar } from "@internationalized/date";
import { useRangeCalendar } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { useRangeCalendarState } from "@react-stately/calendar";
import { useRef } from "react";

import ChevronLeft from "../../icons/chevron-left";
import ChevronRight from "../../icons/chevron-right";
import { Container } from "../Container";
import { Spacer } from "../Spacer";
import { CalendarButton } from "./button";
import { CalendarGrid } from "./calendar-grid";
import styles from "./calendar.module.css";

export function RangeCalendar(props) {
  let { locale } = useLocale();
  let state = useRangeCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  let ref = useRef();
  let { calendarProps, prevButtonProps, nextButtonProps, title } =
    useRangeCalendar(props, state, ref);

  return (
    <div {...calendarProps} ref={ref}>
      <Container
        direction={"row"}
        style={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            overflow: "hidden",
            marginLeft: -16,
            paddingLeft: 16,
            flex: "1 1 0%",
          }}
        >
          <h2 className={styles.currentMonth}>{title}</h2>
        </div>
        <CalendarButton {...prevButtonProps}>
          <ChevronLeft />
        </CalendarButton>
        <CalendarButton {...nextButtonProps}>
          <ChevronRight />
        </CalendarButton>
      </Container>

      <Spacer y={0.5} />

      <CalendarGrid state={state} />
    </div>
  );
}
