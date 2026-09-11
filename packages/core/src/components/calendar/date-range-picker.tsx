"use client";

import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useState,
  type CSSProperties,
  type ReactNode,
  type MouseEventHandler,
} from "react";

import useMediaQuery from "../../hooks/useMediaQuery";
import CalendarIcon from "../../icons/calendar";
import Cross from "../../icons/cross";
import Drawer from "../Drawer";
import styles from "./calendar-styles";
import {
  asDate,
  dayEnd,
  dayStart,
  rangeLabel,
  type DateInput,
  type DateRange,
  type RangeValue,
} from "./date-utils";
import { MonthGrid } from "./month-grid";
import { PresetPicker } from "./preset-picker";
import { RangeInputs } from "./range-inputs";

export type { DateValue, DateInput, RangeValue } from "./date-utils";
export interface CalendarPreset {
  text: string;
  start: DateInput;
  end?: DateInput;
}
export interface DateRangePickerProps {
  value?: RangeValue<DateInput> | null;
  defaultValue?: RangeValue<DateInput> | null;
  onChange?: (value: DateRange | null, presetKey?: string) => void;
  minValue?: DateInput;
  maxValue?: DateInput;
  presets?: Record<string, CalendarPreset>;
  presetIndex?: number;
  size?: "small" | "medium";
  compact?: boolean;
  stacked?: boolean;
  hideDateButton?: boolean;
  horizontalLayout?: boolean;
  showTimeInput?: boolean;
  pinnedTimezone?: string;
  popoverAlignment?: "start" | "center" | "end";
  allowClear?: boolean;
  selectionMode?: "range" | "single";
  width?: string | number;
  disabled?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  autoFocus?: boolean;
  label?: string;
  className?: string;
  buttonClassName?: string;
  buttonTypeName?: "button" | "submit" | "reset";
  buttonSuffix?: ReactNode;
  dataTestId?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onLockedClick?: MouseEventHandler<HTMLButtonElement>;
  "aria-label"?: string;
  granularity?: "day" | "hour" | "minute" | "second";
  hideTimeZone?: boolean;
  hourCycle?: 12 | 24;
  placeholderValue?: DateInput;
  validationState?: "valid" | "invalid";
  isRequired?: boolean;
  allowsNonContiguousRanges?: boolean;
  isDateUnavailable?: (date: Date) => boolean;
}
export type CalendarProps = DateRangePickerProps;

function nativeRange(value?: RangeValue<DateInput> | null): DateRange | null {
  return value ? { start: asDate(value.start), end: asDate(value.end) } : null;
}

export const DateRangePicker = forwardRef<
  HTMLButtonElement,
  DateRangePickerProps
>(function Calendar(
  {
    value,
    defaultValue,
    onChange,
    minValue,
    maxValue,
    presets,
    presetIndex,
    size = "medium",
    compact = false,
    stacked = false,
    hideDateButton = false,
    horizontalLayout = false,
    showTimeInput = true,
    pinnedTimezone,
    popoverAlignment = "start",
    allowClear = false,
    selectionMode = "range",
    width,
    disabled = false,
    isDisabled = false,
    isReadOnly = false,
    defaultOpen = false,
    isOpen,
    onOpenChange,
    autoFocus,
    label,
    className,
    buttonClassName,
    buttonTypeName = "button",
    buttonSuffix,
    dataTestId,
    onClick,
    onLockedClick,
    granularity,
    hideTimeZone,
    hourCycle,
    isDateUnavailable,
    "aria-label": ariaLabel,
  },
  ref,
) {
  const presetRange = (key: string) =>
    presets?.[key]
      ? {
          start: asDate(presets[key].start),
          end: presets[key].end ? asDate(presets[key].end) : dayEnd(new Date()),
        }
      : null;
  const [internalValue, setInternalValue] = useState(
    () =>
      nativeRange(defaultValue) ??
      presetRange(Object.keys(presets ?? {})[presetIndex]),
  );
  const selected = value !== undefined ? nativeRange(value) : internalValue;
  const [open, setOpen] = useState(defaultOpen);
  const isShown = isOpen ?? open;
  const [anchor, setAnchor] = useState<Date | null>(null);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const dialogId = useId();
  const min = minValue ? asDate(minValue) : undefined;
  const max = maxValue ? asDate(maxValue) : undefined;
  const locked = disabled || isDisabled;
  const selectedKey = Object.keys(presets ?? {}).find((key) => {
    const range = presetRange(key);
    return (
      selected &&
      +range.start === +selected.start &&
      +range.end === +selected.end
    );
  });
  const changeOpen = useCallback(
    (next: boolean) => {
      if (next && locked) return;
      setOpen(next);
      setAnchor(null);
      onOpenChange?.(next);
    },
    [locked, onOpenChange],
  );
  function commit(next: DateRange | null, key?: string) {
    if (locked || isReadOnly) return;
    setInternalValue(next);
    onChange?.(next, key);
    changeOpen(false);
  }
  useEffect(() => {
    if (!isShown) return;
    const close = () => {
      if (window.innerWidth > 600) changeOpen(false);
    };
    window.addEventListener("scroll", close);
    return () => window.removeEventListener("scroll", close);
  }, [isShown, changeOpen]);
  const compactPreset = compact && !!selectedKey;
  const trigger = (
    <div
      className={styles.triggerWrapper}
      data-hidden={hideDateButton || undefined}
      data-minimized={compactPreset || undefined}
    >
      <Popover.Trigger asChild>
        <button
          ref={ref}
          type={buttonTypeName}
          data-geist-button=""
          autoFocus={autoFocus}
          aria-controls={isShown ? dialogId : undefined}
          aria-label={
            ariaLabel ?? (compactPreset ? "Open calendar" : undefined)
          }
          disabled={locked}
          className={clsx(styles.trigger, buttonClassName)}
          data-selected={!!selected || undefined}
          onClick={(event) => {
            if (isReadOnly) {
              event.preventDefault();
              onLockedClick?.(event);
            } else onClick?.(event);
          }}
        >
          <CalendarIcon size={16} />
          <span>
            {selected
              ? rangeLabel(selected, selectionMode === "single")
              : selectionMode === "single"
                ? "Select Date"
                : "Select Date Range"}
          </span>
          {buttonSuffix}
        </button>
      </Popover.Trigger>
      {allowClear && selected && !compact && (
        <button
          type="button"
          className={styles.clear}
          aria-label="Clear selected dates"
          disabled={locked || isReadOnly}
          onClick={() => commit(null)}
        >
          <Cross size={12} />
        </button>
      )}
    </div>
  );
  const content = (
    <div className={styles.content}>
      <div className={styles.layout}>
        {selectionMode === "range" && (
          <div className={styles.inputs}>
            <RangeInputs
              value={
                selected ?? {
                  start: anchor ?? dayStart(new Date()),
                  end: dayEnd(new Date()),
                }
              }
              min={min}
              max={max}
              showTime={showTimeInput && granularity !== "day"}
              pinnedTimezone={pinnedTimezone}
              hideTimeZone={hideTimeZone}
              hourCycle={hourCycle}
              readOnly={isReadOnly}
              onChange={commit}
            />
          </div>
        )}
        <MonthGrid
          value={selected}
          min={min}
          max={max}
          single={selectionMode === "single"}
          readOnly={isReadOnly}
          unavailable={isDateUnavailable}
          onChange={commit}
          onAnchor={setAnchor}
        />
      </div>
    </div>
  );
  return (
    <div
      className={clsx(styles.calendar, className)}
      data-size={size}
      data-stacked={stacked || undefined}
      data-compact={compact || undefined}
      data-presets={!!presets || undefined}
      data-testid={dataTestId}
      data-geist-calendar=""
      style={
        {
          "--calendar-width":
            typeof width === "number"
              ? `${width}px`
              : (width ?? (compact ? "180px" : "250px")),
        } as CSSProperties
      }
    >
      {label && <span className={styles.label}>{label}</span>}
      <Popover.Root open={isShown} onOpenChange={changeOpen} modal>
        <div className={styles.controls}>
          {presets && (
            <PresetPicker
              presets={presets}
              selectedKey={selectedKey}
              minimized={compact && !compactPreset}
              disabled={locked || isReadOnly}
              allowClear={allowClear}
              min={min}
              max={max}
              onChange={commit}
            />
          )}
          {trigger}
        </div>
        {isMobile ? (
          <Drawer
            show={isShown}
            onDismiss={() => changeOpen(false)}
            id={dialogId}
            aria-label={label ?? "Choose dates"}
            className={styles.drawer}
            data-compact={compact || undefined}
          >
            {content}
          </Drawer>
        ) : (
          <Popover.Portal>
            <Popover.Content
              id={dialogId}
              className={styles.popover}
              align={popoverAlignment}
              sideOffset={8}
              collisionPadding={16}
              data-horizontal={horizontalLayout || undefined}
              data-compact={compact || undefined}
              data-time={(showTimeInput && granularity !== "day") || undefined}
              aria-label={label ?? "Choose dates"}
              onOpenAutoFocus={(event) => event.preventDefault()}
            >
              {content}
            </Popover.Content>
          </Popover.Portal>
        )}
      </Popover.Root>
      <span className={styles.srOnly} aria-live="polite">
        {selected ? `Selected ${rangeLabel(selected)}` : ""}
      </span>
    </div>
  );
});
