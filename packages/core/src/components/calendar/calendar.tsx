import {
  CalendarDate,
  CalendarDateTime,
  DateFormatter,
  GregorianCalendar, // https://react-spectrum.adobe.com/react-aria/useRangeCalendar.html#reducing-bundle-size
  // createCalendar,
  endOfMonth,
  getLocalTimeZone,
  getWeeksInMonth,
  isSameDay,
  isSameMonth,
  isToday,
  now,
  parseAbsoluteToLocal,
  toCalendarDate,
  today,
} from "@internationalized/date";
import * as Popover from "@radix-ui/react-popover";
import * as chrono from "chrono-node";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  useCalendarCell,
  useCalendarGrid,
  useHover,
  useLocale,
  useRangeCalendar,
} from "react-aria";
import { type RangeCalendarState, useRangeCalendarState } from "react-stately";

import useMediaQuery from "../../hooks/useMediaQuery";
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

const parseDateText = (text, ref) => {
  let parseResult = chrono.parse(text, ref);
  return 1 === parseResult.length ? parseResult[0].start.date() : null;
};

interface DateRange {
  start: Date;
  end: Date;
}
export interface CalendarProps {
  presets?: unknown;
  value: DateRange | null;
  minValue?: Date;
  maxValue?: Date;
  onChange?: (val: DateRange) => void;
  size?: "small" | "large";
  presetIndex?: number;
  popoverAlignment?: string; // TODO  = "start"
  disabled?: boolean;
  buttonClassName?: string;
  onClick?: () => void;
  width?: number; // = 280
  dataTestId?: string;
  stacked?: boolean;
  hideDateButton?: boolean;
  allowClear?: boolean;
  skeleton?: boolean;
}

const Calendar = ({
  presets,
  value = {
    start: new Date(),
    end: new Date(),
  },
  minValue,
  maxValue,
  onChange,
  size,
  presetIndex,
  popoverAlignment,
  disabled,
  buttonClassName,
  onClick,
  width,
  dataTestId,
  stacked,
  hideDateButton,
  allowClear,
  skeleton,
}: CalendarProps) => {
  const [open, setOpen] = useState(false);

  const { locale } = useLocale();
  const tz = getLocalTimeZone();

  // const handleChange = (val) => {
  //   const newState = {
  //     start: val.start.toDate(tz),
  //     end: val.end.toDate(tz),
  //   };
  //   onChange?.(newState);
  // };

  let [presetKey, setPresetKey] = useState(
    presets && undefined !== presetIndex
      ? Object.keys(presets)[presetIndex]
      : null,
  );

  let presetValue = useMemo(
    () =>
      presets && presetKey && "__custom" !== presetKey && presets[presetKey]
        ? {
            start: presets[presetKey].start,
            end: presets[presetKey].end || new Date(),
          }
        : null,
    [presetKey, presets],
  );

  const state = useRangeCalendarState({
    onChange: onChange,
    value: value || presetValue,
    // value: value
    //   ? {
    //       start: parseAbsoluteToLocal(value.start?.toISOString()),
    //       end: parseAbsoluteToLocal(value.end?.toISOString()),
    //     }
    //   : undefined,
    // minValue: minValue,
    // maxValue: maxValue,
    autoFocus: true,
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

  let defaultStart = useMemo(() => {
    return state.value?.start || state.anchorDate || today(tz).toDate(tz);
  }, [state.value, state.anchorDate]);

  let defaultEnd = useMemo(() => {
    let tmrw = today(tz).add({ days: 1 });
    return (
      state.value?.end ||
      new CalendarDateTime(tmrw.year, tmrw.month, tmrw.day, 0, 0, 0, 0)
        .subtract({ seconds: 1 })
        .toDate(tz)
    );
  }, [state.value]);

  let [startDateString, setStartDateString] = useState("");
  let [endDateString, setEndDateString] = useState("");
  let [startTimeString, setStartTimeString] = useState("");
  let [endTimeString, setEndTimeString] = useState("");
  let [errors, setErrors] = useState([]);

  let validateDateWithMinAndMaxValue = (e) => {
    return true; // TODO fixme
  };

  let validateStartDateString = useCallback(
    (e) => {
      console.log("validateStartDateString", e);
      setErrors((e) => [...e, "startDate"]);
    },
    [defaultEnd, validateDateWithMinAndMaxValue, defaultStart, state],
  );

  let validateEndDateString = useCallback(
    (e) => {
      console.log("validateEndDateString", e);
      setErrors((e) => [...e, "endDate"]);
    },
    [defaultEnd, validateDateWithMinAndMaxValue, defaultStart, state],
  );

  let validateStartTimeString = useCallback(
    (e) => {
      console.log("validateStartTimeString", e);
      setErrors((e) => [...e, "startTime"]);
    },
    [defaultEnd, validateDateWithMinAndMaxValue, defaultStart, state],
  );

  let validateEndTimeString = useCallback(
    (e) => {
      console.log("validateEndTimeString", e);
      setErrors((e) => [...e, "endTime"]);
    },
    [defaultEnd, validateDateWithMinAndMaxValue, defaultStart, state],
  );

  const ref = useRef();
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useRangeCalendar({}, state, ref);

  const isMobile = useMediaQuery("(max-width: 600px)");
  //
  const calendarButtonProps = {
    className: buttonClassName,
    type: "secondary",
    width: isMobile ? "100%" : width,
    style: {
      textTransform: state.value?.start ? "uppercase" : "initial",
      justifyContent: "flex-star",
    },
    prefix: <CalendarIcon />,
    size: size,
    disabled: disabled,
    children: state.value?.start
      ? `${formatter
          .full(state.value.start)
          .replace(/\s/g, "")
          .replace(",", " ")} – ${formatter
          .full(state.value.end)
          .replace(/\s/g, "")
          .replace(",", " ")}`
      : "Select Date Range",
  };

  // TODO
  const presetSelector = presets ? (
    <Popover.Root>
      <Popover.Trigger asChild>
        <div className={styles.comboboxWrapper}>
          <input className={styles.comboboxInput} />
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content asChild align="start" side="bottom" sideOffset={8}>
          <div className={styles.comboboxPopover}>
            <div className={styles.suggestions}>{/* cmdk-list */}</div>
            <div className={styles.comboboxHints}>
              {/* holy crap this is complicated */}
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  ) : null;

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <div
        {...calendarProps}
        ref={ref}
        className={clsx(styles.calendar, {
          [styles.hasSelect]: !!presets,
          [styles.stacked]: stacked,
          [styles.showingDateButton]: !hideDateButton,
        })}
        data-geist-calendar=""
        data-testid={dataTestId}
      >
        {presetSelector}
        <Skeleton show={skeleton ?? false}>
          <Popover.Trigger asChild aria-haspopup="dialog">
            <Button {...calendarButtonProps} />
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
                          id="start-date"
                          size="small"
                          title="Start date"
                          type={
                            errors.includes("startDate") ? "error" : undefined
                          }
                          onChange={(e) => {
                            setStartDateString(e.target.value);
                          }}
                          onKeyDown={(e) => {
                            if ("Enter" === e.key) {
                              validateStartDateString(startDateString);
                            }
                          }}
                          value={
                            startDateString || errors.includes("startDate")
                              ? startDateString
                              : formatter.input(defaultStart)
                          }
                        />

                        <Input
                          id="start-time"
                          size="small"
                          title="Start time"
                          className={styles.timeInput}
                          onChange={(e) => {
                            setStartTimeString(e.target.value);
                          }}
                          onKeyDown={(e) => {
                            if ("Enter" === e.key && startTimeString) {
                              validateStartTimeString(startTimeString);
                            }
                          }}
                          type={
                            errors.includes("startTime") ? "error" : undefined
                          }
                          value={
                            startTimeString || errors.includes("startTime")
                              ? startTimeString
                              : formatter.time(defaultStart)
                          }
                        />
                      </div>

                      <Spacer y={0.5} />

                      <Label htmlFor="end-date" label="End" capitalize />
                      <div className={styles.inputRow}>
                        <Input
                          id="end-date"
                          size="small"
                          title="End date"
                          type={
                            errors.includes("endDate") ? "error" : undefined
                          }
                          onChange={(e) => {
                            setEndDateString(e.target.value);
                          }}
                          onKeyDown={(e) => {
                            if ("Enter" === e.key) {
                              validateEndDateString(endDateString);
                            }
                          }}
                          value={
                            endDateString || errors.includes("endDate")
                              ? endDateString
                              : formatter.input(defaultEnd)
                          }
                        />
                        <Input
                          id="end-time"
                          size="small"
                          className={styles.timeInput}
                          title="End time"
                          type={
                            errors.includes("endTime") ? "error" : undefined
                          }
                          onChange={(e) => {
                            setEndTimeString(e.target.value);
                          }}
                          onKeyDown={(e) => {
                            if ("Enter" === e.key && endTimeString) {
                              validateEndTimeString(endTimeString);
                            }
                          }}
                          value={
                            endTimeString || errors.includes("endTime")
                              ? endTimeString
                              : formatter.time(defaultEnd)
                          }
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

                    {/* y props:
                          children: <ForwardRef />
                          custom: undefined
                          initial: false
                          mode: "popLayout"
                     */}
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

  const tBodyRef = useRef<HTMLTableSectionElement>(null);
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
          ref={tBodyRef}
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
                      currentMonth={startDate}
                      date={date}
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
  const ref = useRef<HTMLSpanElement>(null);
  let { cellProps, buttonProps } = useCalendarCell({ date }, state, ref);

  let { hoverProps, isHovered } = useHover({});

  // m (highlightedRange)
  let highlightedRange = "highlightedRange" in state && state.highlightedRange;

  // p (firstInRange)
  let isFirstInRange =
    highlightedRange && isSameDay(date, highlightedRange.start);
  // x (lastInRange)
  let isLastInRange = highlightedRange && isSameDay(date, highlightedRange.end);

  return (
    <td
      {...cellProps}
      className={clsx({
        [styles.firstInRange]: isFirstInRange,
        [styles.lastInRange]: isLastInRange,
      })}
    >
      <span
        {...buttonProps} //c
        {...hoverProps} //d
        className={clsx({
          [styles.highlight]: isToday(date, state.timeZone), // Blue
          [styles.focused]: state.isCellFocused(date), // thick ring
          [styles.outsideMonth]: !isSameMonth(date, currentMonth), // faded
          [styles.hovered]: isHovered, // thin ring
          [styles.selected]: isFirstInRange || isLastInRange, // White
          [styles.disabled]: state.isCellDisabled(date), // faded; no hover ring
        })}
        ref={ref} // This results strange behavior with keyboard navigation.
      >
        {toCalendarDate(date).day}
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

// eM
let formatter = {
  full: (e) =>
    new Date().toLocaleString(e, {
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: !0,
    }),
  input: (e) =>
    new Date().toLocaleString(e, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  month: (e) =>
    new Date().toLocaleString(e, {
      month: "long",
      year: "numeric",
    }),
  weekday: (e, t) =>
    new Date().toLocaleString(e, {
      weekday: t ? "long" : "narrow",
    }),
  day: (e) =>
    new Date().toLocaleString(e, {
      day: "numeric",
    }),
  time(e) {
    let t = new Date().toLocaleString(e, {
      hour: "numeric",
      minute: "numeric",
      hour12: !0,
      timeZoneName: "short",
    });
    return t;
  },
  numeric: (e) =>
    new Date().toLocaleString(e, {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    }),
};
