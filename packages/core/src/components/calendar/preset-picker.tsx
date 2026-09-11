"use client";

import * as Popover from "@radix-ui/react-popover";
import { useId, useRef, useState } from "react";

import useMediaQuery from "../../hooks/useMediaQuery";
import CalendarIcon from "../../icons/calendar";
import ChevronDown from "../../icons/chevron-down";
import Cross from "../../icons/cross";
import MagnifyingGlass from "../../icons/magnifying-glass";
import { Button } from "../Button";
import Drawer from "../Drawer";
import styles from "./calendar-styles";
import type { CalendarPreset } from "./date-range-picker";
import { asDate, dayEnd, parsePeriod, type DateRange } from "./date-utils";

export function PresetPicker({
  presets,
  selectedKey,
  minimized,
  disabled,
  allowClear,
  min,
  max,
  onChange,
}: {
  presets: Record<string, CalendarPreset>;
  selectedKey?: string;
  minimized?: boolean;
  disabled?: boolean;
  allowClear?: boolean;
  min?: Date;
  max?: Date;
  onChange: (range: DateRange | null, key?: string) => void;
}) {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState<string | null>(null);
  const [active, setActive] = useState(0);
  const [error, setError] = useState(false);
  function dismiss() {
    setOpen(false);
    setQuery(null);
    setError(false);
  }
  const inputRef = useRef<HTMLInputElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const options = Object.entries(presets).filter(
    ([, preset]) =>
      !query || preset.text.toLowerCase().includes(query.toLowerCase()),
  );
  const parsed = query ? parsePeriod(query) : null;
  const rangeFor = (preset: CalendarPreset) => ({
    start: asDate(preset.start),
    end: preset.end ? asDate(preset.end) : dayEnd(new Date()),
  });
  const blocked = (range: DateRange) =>
    (min && range.start < min) || (max && range.end > max);
  function select(range: DateRange | null, key?: string) {
    if (disabled || (range && key && blocked(range))) return;
    if (range && !key) {
      range = {
        start: min && range.start < min ? new Date(min) : range.start,
        end: max && range.end > max ? new Date(max) : range.end,
      };
      if (range.start > range.end) {
        setError(true);
        return;
      }
    }
    setOpen(false);
    setQuery(null);
    setError(false);
    onChange(range, key);
  }
  function chooseText(text: string) {
    const range = parsePeriod(text);
    if (range) select(range);
    else setError(true);
  }
  const hints = [
    [
      "Type relative times",
      ["45m", "12 hours", "10d", "2 weeks", "last month", "yesterday", "today"],
    ],
    ["Type fixed times", ["Jan 1", "Jan 1 - Jan 2", "1/1", "1/1 - 1/2"]],
  ] as const;
  const input = (
    <input
      ref={inputRef}
      role="combobox"
      aria-label="Select period"
      aria-expanded={open}
      aria-controls={id}
      aria-autocomplete="list"
      aria-invalid={error || undefined}
      aria-activedescendant={
        open && options[active] ? `${id}-${active}` : undefined
      }
      disabled={disabled}
      placeholder={isMobile ? undefined : "Select Period"}
      autoComplete="off"
      spellCheck={false}
      value={
        query ?? (!isMobile && selectedKey ? presets[selectedKey].text : "")
      }
      onFocus={() => {
        setOpen(true);
        setActive(0);
      }}
      onChange={(event) => {
        setQuery(event.target.value);
        setOpen(true);
        setActive(0);
        setError(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          setQuery(null);
        }
        if (event.key === "Tab" && !isMobile) setOpen(false);
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault();
          setOpen(true);
          setActive((index) =>
            Math.max(
              0,
              Math.min(
                options.length - 1,
                index + (event.key === "ArrowDown" ? 1 : -1),
              ),
            ),
          );
        }
        if (event.key === "Enter") {
          event.preventDefault();
          if (options[active])
            select(rangeFor(options[active][1]), options[active][0]);
          else chooseText(query ?? "");
        }
      }}
    />
  );
  const list = (
    <ul
      className={styles.presetList}
      id={id}
      role="listbox"
      aria-label="Suggestions"
    >
      {options.map(([key, preset], index) => (
        <li
          key={key}
          id={`${id}-${index}`}
          role="option"
          aria-selected={index === active}
          aria-disabled={!!blocked(rangeFor(preset))}
          onMouseEnter={() => setActive(index)}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => select(rangeFor(preset), key)}
        >
          {preset.text}
        </li>
      ))}
      {!options.length && (
        <li
          role="option"
          aria-selected
          aria-disabled={!parsed}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => chooseText(query ?? "")}
        >
          {parsed ? query : "Invalid period"}
        </li>
      )}
    </ul>
  );
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <div
        className={styles.presetWrapper}
        data-minimized={minimized || undefined}
      >
        <Popover.Anchor asChild>
          <div ref={controlRef} className={styles.presetControl}>
            <CalendarIcon size={14} />
            {isMobile ? (
              <button
                type="button"
                className={styles.mobilePresetTrigger}
                aria-label="Select period"
                aria-haspopup="dialog"
                aria-expanded={open}
                disabled={disabled}
                onClick={() => {
                  setOpen(true);
                  setActive(0);
                }}
              >
                <span className={styles.presetLabel}>
                  {selectedKey ? presets[selectedKey].text : "Select Period"}
                </span>
                {!(allowClear && selectedKey) && <ChevronDown size={14} />}
              </button>
            ) : (
              input
            )}
            {allowClear && selectedKey ? (
              <button
                type="button"
                aria-label="Clear selected period"
                disabled={disabled}
                onClick={() => select(null)}
              >
                <Cross size={12} />
              </button>
            ) : !isMobile ? (
              <button
                type="button"
                aria-label="Show presets"
                disabled={disabled}
                onClick={() => {
                  inputRef.current?.focus();
                  setOpen(!open);
                }}
              >
                <ChevronDown size={14} />
              </button>
            ) : null}
          </div>
        </Popover.Anchor>
      </div>
      {isMobile ? (
        <Drawer
          show={open}
          onDismiss={dismiss}
          aria-label="Select period"
          header={
            <div className={styles.presetSearch}>
              <MagnifyingGlass size={18} />
              {input}
              <button
                type="button"
                aria-label={query ? "Clear search" : "Close menu"}
                onClick={() => {
                  if (query) {
                    setQuery("");
                    setActive(0);
                    inputRef.current?.focus();
                  } else dismiss();
                }}
              >
                {query ? (
                  <Cross size={18} />
                ) : (
                  <ChevronDown
                    size={18}
                    style={{ transform: "rotate(180deg)" }}
                  />
                )}
              </button>
            </div>
          }
          footer={
            <Button
              typeName="button"
              type="secondary"
              size="small"
              className="njc:w-full"
              onClick={dismiss}
            >
              Done
            </Button>
          }
        >
          {list}
        </Drawer>
      ) : (
        <Popover.Portal>
          <Popover.Content
            className={styles.presetMenu}
            sideOffset={8}
            collisionPadding={16}
            align="start"
            aria-label="Date presets"
            onOpenAutoFocus={(event) => event.preventDefault()}
            onCloseAutoFocus={(event) => event.preventDefault()}
            onInteractOutside={(event) => {
              if (controlRef.current?.contains(event.target as Node))
                event.preventDefault();
            }}
          >
            {list}
            <div className={styles.presetHints}>
              {hints.map(([title, values]) => (
                <div key={title}>
                  <p>{title}</p>
                  <div>
                    {values.map((text) => (
                      <button
                        key={text}
                        type="button"
                        onClick={() => chooseText(text)}
                      >
                        {text}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Popover.Content>
        </Popover.Portal>
      )}
    </Popover.Root>
  );
}
