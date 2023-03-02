import {
  CalendarDate,
  GregorianCalendar, // https://react-spectrum.adobe.com/react-aria/useRangeCalendar.html#reducing-bundle-size
  // createCalendar,
  endOfMonth,
  getDayOfWeek,
  getLocalTimeZone,
  getWeeksInMonth,
  isSameDay,
  isSameMonth,
  isToday,
  parseAbsoluteToLocal,
  toCalendarDateTime,
  today,
} from "@internationalized/date";
import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  mergeProps,
  useCalendarCell,
  useCalendarGrid,
  useHover,
  useLocale,
  useRangeCalendar,
} from "react-aria";
import { type RangeCalendarState, useRangeCalendarState } from "react-stately";

import CalendarIcon from "../../icons/calendar";
import ChevronLeft from "../../icons/chevron-left";
import ChevronRight from "../../icons/chevron-right";
import { Button } from "../Button";
import { Container } from "../Container";
import { Input } from "../Input";
import { Label } from "../Label";
import Skeleton from "../Skeleton";
import { Spacer } from "../Spacer";
import styles from "./calendar.module.css";

interface DateRange {
  start: Date;
  end: Date;
}
export interface CalendarProps {
  skeleton?: boolean;
  presets?: unknown;
  value: DateRange | null;
  onChange?: (val: DateRange) => void;
  size?: "small" | "large";
  minValue?: Date;
  maxValue?: Date;
}

function usePreviousDate(value: CalendarDate) {
  const ref = useRef<CalendarDate>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const Calendar = ({
  skeleton,
  size,
  value = {
    start: new Date(),
    end: new Date(),
  },
  onChange,
}: CalendarProps) => {
  const [open, setOpen] = useState(false);

  const { locale } = useLocale();
  const tz = getLocalTimeZone();

  const handleChange = (val) => {
    const newState = {
      start: val.start.toDate(tz),
      end: val.end.toDate(tz),
    };
    onChange?.(newState);
  };

  const [focusedDate, setFocusedDate] = useState(today(getLocalTimeZone()));
  const state = useRangeCalendarState({
    defaultValue: {
      start: today(getLocalTimeZone()),
      end: today(getLocalTimeZone()).add({ weeks: 2 }),
    },
    // focusedValue: focusedDate,
    // onFocusChange: setFocusedDate,
    onChange: handleChange,
    value: value
      ? {
          start: parseAbsoluteToLocal(value.start?.toISOString()),
          end: parseAbsoluteToLocal(value.end?.toISOString()),
        }
      : undefined,
    allowsNonContiguousRanges: true,
    locale,
    createCalendar(identifier) {
      switch (identifier) {
        case "gregory":
          return new GregorianCalendar();
        default:
          throw new Error(`Unsupported calendar ${identifier}`);
      }
    },
  });

  const ref = useRef();
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useRangeCalendar({}, state, ref);

  const startText = state.value.start
    .toDate(getLocalTimeZone())
    .toLocaleString();
  const endText = state.value.end.toDate(getLocalTimeZone()).toLocaleString();

  // TODO: format readable text
  // current: "3/1/2023, 12:00:00AM - 3/1/2023, 11:59:59PM"
  // desired: "2/7 12:00AM – 2/8 11:59PM"
  const buttonReadout = state
    ? `${startText} – ${endText}`
    : "Select Date Range";

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <div
        {...calendarProps}
        ref={ref}
        className={clsx(styles.calendar, {
          [styles.hasSelect]: state.isFocused, // fixme
          [styles.stacked]: false, // fixme
          [styles.showingDateButton]: true, // ?
        })}
        data-geist-calendar=""
      >
        <Skeleton show={skeleton ?? false}>
          <Popover.Trigger asChild aria-haspopup="dialog">
            <Button
              type={"secondary"}
              size={size}
              prefix={<CalendarIcon />}
              style={{
                textTransform: "initial",
                justifyContent: "flex-start",
                minWidth: 280,
                maxWidth: 280,
              }}
              aria-haspopup="dialog"
            >
              {buttonReadout}
            </Button>
          </Popover.Trigger>
          <Popover.Portal
          // this is named `y` in the devtools
          // and conditionally has children
          >
            <AnimatePresence
              // this is named `d`
              presenceAffectsLayout={true}
            >
              <Popover.Content
                className={styles.popover}
                align="start"
                side="bottom"
                sideOffset={8}
                style={{ width: 280 }}
              >
                <Popover.Close
                  className="geist-sr-only"
                  onClick={() => setOpen(false)}
                />
                <motion.div
                  // motion.div
                  initial={{ height: 0 }}
                  exit={{ height: 0 }}
                  animate={{ height: "auto" }}
                  transition={{ duration: 0.15 }}
                  style={{
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div className={styles.contentWrapper}>
                    <div className={styles.inputsWrapper}>
                      <Label htmlFor="start-date" label="Start" capitalize />
                      <div className={styles.inputRow}>
                        <Input
                          readOnly // TODO: figure out input
                          id="start-date"
                          size="small"
                          // Format: Feb 28, 2023
                          value={state.value.start
                            .toDate(getLocalTimeZone())
                            .toLocaleDateString()}
                        />

                        <Input
                          readOnly // TODO: figure out input
                          id="start-time"
                          size="small"
                          className={styles.timeInput}
                          // Format: 12:00 AM EST
                          value={state.value.start
                            .toDate(getLocalTimeZone())
                            .toLocaleTimeString()}
                        />
                      </div>

                      <Spacer y={0.5} />

                      <Label htmlFor="end-date" label="End" capitalize />
                      <div className={styles.inputRow}>
                        <Input
                          id="end-date"
                          size="small"
                          value={state.value.end
                            .toDate(getLocalTimeZone())
                            .toLocaleDateString()}
                        />
                        <Input
                          id="end-time"
                          size="small"
                          className={styles.timeInput}
                          value={state.value.end
                            .toDate(getLocalTimeZone())
                            .toLocaleTimeString()}
                        />
                      </div>
                    </div>

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
                        <AnimatePresence mode="popLayout">
                          <motion.h2
                            key={title}
                            transition={{ duration: 0.15 }}
                            className={styles.currentMonth}
                            style={{ whiteSpace: "nowrap" }}
                            animate={"middle"}
                            initial={"enter"}
                            exit={"exit"}
                            // custom={0} // todo: implement left/right slide animation
                            variants={{
                              enter: (c) => ({ opacity: 0, x: `${100 * c}%` }),
                              exit: (c) => ({ opacity: 0, x: `${100 * c}%` }),
                              middle: { opacity: 1, x: "0%" },
                            }}
                          >
                            {title}
                          </motion.h2>
                          <Debug state={state} />
                        </AnimatePresence>
                      </div>

                      <Button
                        svgOnly
                        variant="unstyled"
                        className={styles.caretButton}
                        style={{ marginLeft: "auto" }}
                        disabled={prevButtonProps.isDisabled}
                        onBlur={prevButtonProps.onBlur}
                        onFocus={prevButtonProps.onFocus}
                        onClick={(e) => {
                          prevButtonProps.onPress(e);
                        }}
                      >
                        <ChevronLeft size={20} />
                      </Button>

                      <Spacer x={0.25} />

                      <Button
                        svgOnly
                        variant="unstyled"
                        className={styles.caretButton}
                        disabled={nextButtonProps.isDisabled}
                        onBlur={nextButtonProps.onBlur}
                        onFocus={nextButtonProps.onFocus}
                        onClick={(e) => {
                          nextButtonProps.onPress(e);
                        }}
                      >
                        <ChevronRight size={20} />
                      </Button>
                    </Container>

                    <Spacer y={0.5} />

                    <CalendarGrid state={state} />
                  </div>
                </motion.div>
              </Popover.Content>
            </AnimatePresence>
          </Popover.Portal>
        </Skeleton>
      </div>
    </Popover.Root>
  );
};

export default Calendar;

function CalendarGrid({ state }: { state: RangeCalendarState }) {
  const { locale } = useLocale();
  const startDate = state.visibleRange.start.add({});
  const endDate = endOfMonth(startDate);
  const { gridProps, headerProps, weekDays } = useCalendarGrid(
    { startDate, endDate },
    state,
  );

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <table {...gridProps} className={styles.table}>
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <AnimatePresence mode="popLayout">
        <motion.tbody
          key={state.visibleRange.start.toString()}
          data-test={gridProps["aria-label"]}
          transition={{ duration: 0.15 }}
          animate={"middle"}
          initial={"enter"}
          exit={"exit"}
          custom={0}
          variants={{
            enter: (c) => ({ opacity: 0, x: `${100 * c}%` }),
            exit: (c) => ({ opacity: 0, x: `${100 * c}%` }),
            middle: { opacity: 1, x: "0%" },
          }}
        >
          {Array.from(new Array(weeksInMonth).keys()).map((weekIndex) => (
            <tr key={weekIndex}>
              {state
                .getDatesInWeek(weekIndex)
                .map((date, i) =>
                  date ? (
                    <CalendarCell
                      key={i}
                      state={state}
                      date={date}
                      currentMonth={startDate}
                    />
                  ) : (
                    <td key={i} />
                  ),
                )}
            </tr>
          ))}
        </motion.tbody>
      </AnimatePresence>
    </table>
  );
}

function CalendarCell({
  state,
  date,
  currentMonth,
}: {
  state: RangeCalendarState;
  date: CalendarDate;
  currentMonth: CalendarDate;
}) {
  const ref = useRef<HTMLSpanElement>();
  let { cellProps, buttonProps, isSelected, formattedDate } = useCalendarCell(
    { date },
    state,
    ref,
  );
  // console.log(Object.getOwnPropertyNames(cellProps));
  // const cellKeys = ["role", "aria-disabled", "aria-selected", "aria-invalid"];
  let isOutsideMonth = !isSameMonth(currentMonth, date);

  // The start and end date of the selected range will have
  // an emphasized appearance.
  let isSelectionStart = state.highlightedRange
    ? isSameDay(date, state.highlightedRange.start)
    : isSelected;
  let isSelectionEnd = state.highlightedRange
    ? isSameDay(date, state.highlightedRange.end)
    : isSelected;

  let { hoverProps, isHovered } = useHover({});

  return (
    <td
      {...cellProps}
      className={clsx({
        [styles.firstInRange]: isSelectionStart,
        [styles.lastInRange]: isSelectionEnd,
      })}
    >
      <span
        {...mergeProps(hoverProps, buttonProps)}
        // ref={ref} // This results strange behavior with keyboard navigation.
        className={clsx({
          [styles.highlight]: isToday(date, state.timeZone), // Blue
          [styles.focused]: state.isCellFocused(date), // thick ring
          [styles.outsideMonth]: isOutsideMonth, // faded
          [styles.hovered]: isHovered, // thin ring
          [styles.selected]: isSelectionStart || isSelectionEnd, // White
          // [styles.disabled]: state.isCellDisabled(date), // faded; no hover ring
        })}
      >
        {formattedDate}
      </span>
    </td>
  );
}

const Debug = ({ state }) => {
  return null;
  return (
    <pre>
      {JSON.stringify(
        {
          isFocused: state.isFocused,
          isDragging: state.isDragging,
          timeZone: state.timeZone,
          anchor:
            state.anchorDate?.toDate(getLocalTimeZone()).toLocaleDateString() ||
            "(no anchor)",
          focusedDate:
            state.focusedDate
              ?.toDate(getLocalTimeZone())
              .toLocaleDateString() || "N/A",
          highStart:
            state.highlightedRange.start
              ?.toDate(getLocalTimeZone())
              .toLocaleDateString() || "N/A",
          highEnd:
            state.highlightedRange.end
              ?.toDate(getLocalTimeZone())
              .toLocaleDateString() || "N/A",
          valueStart:
            state.value.start
              ?.toDate(getLocalTimeZone())
              .toLocaleDateString() || "N/A",
          valueEnd:
            state.value.end?.toDate(getLocalTimeZone()).toLocaleDateString() ||
            "N/A",
        },
        null,
        2,
      )}
    </pre>
  );
};
