"use client";

import clsx from "clsx";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

import ChevronLeft from "../../icons/chevron-left";
import ChevronRight from "../../icons/chevron-right";
import styles from "./calendar-styles";
import {
  addDays,
  dayEnd,
  dayStart,
  sameDay,
  type DateRange,
} from "./date-utils";

export function MonthGrid({
  value,
  min,
  max,
  single,
  readOnly,
  unavailable,
  onChange,
  onAnchor,
}: {
  value: DateRange | null;
  min?: Date;
  max?: Date;
  single?: boolean;
  readOnly?: boolean;
  unavailable?: (date: Date) => boolean;
  onChange: (range: DateRange) => void;
  onAnchor: (date: Date) => void;
}) {
  const initial = value?.start ?? new Date();
  const [month, setMonth] = useState(
    new Date(initial.getFullYear(), initial.getMonth(), 1),
  );
  const [focused, setFocused] = useState(initial);
  const [anchor, setAnchor] = useState<Date | null>(null);
  const [hover, setHover] = useState<Date | null>(null);
  const [focusVisible, setFocusVisible] = useState(true);
  const grid = useRef<HTMLTableElement>(null);
  const titleId = useId();
  const captionId = useId();
  const invalid = (d: Date) =>
    (min && dayEnd(d) < min) || (max && dayStart(d) > max) || unavailable?.(d);
  const preview = anchor
    ? {
        start: dayStart(new Date(Math.min(+anchor, +(hover ?? anchor)))),
        end: dayEnd(new Date(Math.max(+anchor, +(hover ?? anchor)))),
      }
    : value;
  const first = addDays(month, -month.getDay());
  const weeks = Math.ceil(
    (month.getDay() +
      new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()) /
      7,
  );
  useEffect(() => {
    grid.current
      ?.querySelector<HTMLElement>('[tabindex="0"]')
      ?.focus({ preventScroll: true });
  }, [focused]);
  function select(date: Date) {
    if (invalid(date) || readOnly) return;
    if (!anchor && !single) {
      setAnchor(date);
      setHover(date);
      onAnchor(date);
      return;
    }
    const start = dayStart(new Date(Math.min(+(anchor ?? date), +date)));
    const end = dayEnd(new Date(Math.max(+(anchor ?? date), +date)));
    onChange({
      start: min && start < min ? new Date(min) : start,
      end: max && end > max ? new Date(max) : end,
    });
    setAnchor(null);
  }
  function move(date: Date) {
    if (min && dayEnd(date) < min) date = dayStart(min);
    if (max && dayStart(date) > max) date = dayStart(max);
    setFocused(date);
    setHover(date);
    setMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    setFocusVisible(true);
  }
  function keyDown(event: KeyboardEvent) {
    let next: Date;
    switch (event.key) {
      case "ArrowLeft":
        next = addDays(focused, -1);
        break;
      case "ArrowRight":
        next = addDays(focused, 1);
        break;
      case "ArrowUp":
        next = addDays(focused, -7);
        break;
      case "ArrowDown":
        next = addDays(focused, 7);
        break;
      case "Home":
        next = new Date(month);
        break;
      case "End":
        next = new Date(month.getFullYear(), month.getMonth() + 1, 0);
        break;
      case "PageUp":
        next = new Date(
          month.getFullYear(),
          month.getMonth() - (event.shiftKey ? 12 : 1),
          1,
        );
        break;
      case "PageDown":
        next = new Date(
          month.getFullYear(),
          month.getMonth() + (event.shiftKey ? 12 : 1),
          1,
        );
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        select(focused);
        return;
      default:
        return;
    }
    event.preventDefault();
    move(next);
  }
  const caption =
    !anchor && value
      ? `From ${value.start.toLocaleDateString()} to ${value.end.toLocaleDateString()}`
      : "";
  return (
    <div className={styles.month} role="group" aria-labelledby={titleId}>
      <div className={styles.monthHeader}>
        <div className={styles.monthTitleWrapper}>
          <h2 id={titleId}>
            {month.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>
        </div>
        <button
          type="button"
          className={styles.caret}
          aria-label="Previous"
          disabled={
            !!min &&
            new Date(
              month.getFullYear(),
              month.getMonth(),
              0,
              23,
              59,
              59,
              999,
            ) < min
          }
          onClick={() =>
            move(new Date(month.getFullYear(), month.getMonth() - 1, 1))
          }
        >
          <ChevronLeft size={14} />
        </button>
        <button
          type="button"
          className={styles.caret}
          aria-label="Next"
          disabled={
            !!max &&
            new Date(month.getFullYear(), month.getMonth() + 1, 1) > max
          }
          onClick={() =>
            move(new Date(month.getFullYear(), month.getMonth() + 1, 1))
          }
        >
          <ChevronRight size={16} />
        </button>
      </div>
      <span aria-hidden className={styles.spacer} />
      <table
        ref={grid}
        className={styles.grid}
        role="grid"
        aria-labelledby={titleId}
        aria-describedby={caption ? captionId : undefined}
        aria-multiselectable={!single}
        aria-readonly={readOnly || undefined}
        onKeyDown={keyDown}
      >
        <caption id={captionId} className={styles.srOnly}>
          {caption}
        </caption>
        <thead>
          <tr>
            {[
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ].map((day) => (
              <th key={day} abbr={day}>
                {day[0]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: weeks }, (_, week) => (
            <tr key={week}>
              {Array.from({ length: 7 }, (_, index) => {
                const date = addDays(first, week * 7 + index);
                const disabled = !!invalid(date);
                const selected =
                  !!preview &&
                  date >= dayStart(preview.start) &&
                  date <= dayEnd(preview.end);
                const endpoint =
                  selected &&
                  (sameDay(date, preview.start) || sameDay(date, preview.end));
                return (
                  <td
                    key={index}
                    role="gridcell"
                    aria-selected={selected}
                    aria-disabled={disabled || undefined}
                  >
                    <span
                      role="button"
                      data-react-aria-pressable="true"
                      tabIndex={sameDay(date, focused) ? 0 : -1}
                      aria-label={date.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      aria-disabled={disabled || undefined}
                      className={clsx(styles.day, {
                        [styles.weekend]: index === 0 || index === 6,
                        [styles.outside]: date.getMonth() !== month.getMonth(),
                        [styles.today]: sameDay(date, new Date()),
                        [styles.endpoint]: endpoint,
                        [styles.focused]:
                          focusVisible && sameDay(date, focused),
                        [styles.disabled]: disabled,
                      })}
                      onMouseEnter={() => {
                        if (!disabled) setHover(date);
                      }}
                      onPointerDown={() => setFocusVisible(false)}
                      onFocus={() => setFocused(date)}
                      onBlur={(event) => {
                        if (
                          !grid.current?.contains(event.relatedTarget as Node)
                        )
                          setFocusVisible(false);
                      }}
                      onClick={() => select(date)}
                    >
                      {date.getDate()}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <span className={styles.srOnly} aria-live="polite">
        {caption}
      </span>
    </div>
  );
}
