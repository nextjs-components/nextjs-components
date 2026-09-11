"use client";

import { useId, useState } from "react";

import ChevronDown from "../../icons/chevron-down";
import styles from "./calendar-styles";
import {
  formatDate,
  formatTime,
  parseInput,
  type DateRange,
} from "./date-utils";

export function RangeInputs({
  value,
  min,
  max,
  showTime,
  pinnedTimezone,
  hideTimeZone,
  hourCycle,
  readOnly,
  onChange,
}: {
  value: DateRange;
  min?: Date;
  max?: Date;
  showTime: boolean;
  pinnedTimezone?: string;
  hideTimeZone?: boolean;
  hourCycle?: 12 | 24;
  readOnly?: boolean;
  onChange: (range: DateRange) => void;
}) {
  const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [zone, setZone] = useState(pinnedTimezone ?? localZone);
  const effectiveZone = pinnedTimezone ?? zone;
  const fieldsFor = () => ({
    startDate: formatDate(value.start, effectiveZone),
    endDate: formatDate(value.end, effectiveZone),
    startTime: formatTime(value.start, effectiveZone, hourCycle),
    endTime: formatTime(value.end, effectiveZone, hourCycle),
  });
  const [fields, setFields] = useState(fieldsFor);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const id = useId();
  const source = `${+value.start}/${+value.end}/${effectiveZone}/${hourCycle}`;
  const [previousSource, setPreviousSource] = useState(source);
  if (source !== previousSource) {
    setPreviousSource(source);
    setFields(fieldsFor());
    setErrors({});
  }
  function apply() {
    if (readOnly) return;
    const start = parseInput(
      fields.startDate,
      showTime ? fields.startTime : "00:00",
      effectiveZone,
    );
    const end = parseInput(
      fields.endDate,
      showTime ? fields.endTime : "23:59",
      effectiveZone,
    );
    const nextErrors: Record<string, string> = {};
    if (!start) nextErrors.start = "Invalid date or time";
    if (!end) nextErrors.end = "Invalid date or time";
    if (start && min && +start < Math.floor(+min / 60000) * 60000)
      nextErrors.start = "Outside of allowed range";
    if (end && max && +end > Math.floor(+max / 60000) * 60000)
      nextErrors.end = "Outside of allowed range";
    if (start && end && start >= end)
      nextErrors.end = "End must be after start";
    setErrors(nextErrors);
    if (!Object.keys(nextErrors).length && start && end)
      onChange({ start, end });
  }
  return (
    <div className={styles.fields}>
      <div className={styles.fieldRows}>
        {(["start", "end"] as const).map((side) => (
          <div key={side}>
            <div className={styles.fieldHeading}>
              <label htmlFor={`${id}-${side}`}>
                {side === "start" ? "Start" : "End"}
              </label>
              {errors[side] && (
                <span id={`${id}-${side}-error`} role="alert">
                  {errors[side]}
                </span>
              )}
            </div>
            <div className={styles.inputRow}>
              {(
                ["Date", ...(showTime ? ["Time"] : [])] as Array<
                  "Date" | "Time"
                >
              ).map((kind) => (
                <div
                  key={kind}
                  data-geist-input-wrapper=""
                  className={
                    kind === "Time" ? styles.timeInput : styles.dateInput
                  }
                >
                  <input
                    id={`${id}-${side}${kind === "Time" ? "-time" : ""}`}
                    aria-label={`${side === "start" ? "Start" : "End"} ${kind.toLowerCase()}`}
                    aria-invalid={!!errors[side]}
                    aria-describedby={
                      errors[side] ? `${id}-${side}-error` : undefined
                    }
                    data-geist-input=""
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    readOnly={readOnly}
                    placeholder={kind === "Date" ? "Jan 01, 2025" : "1:00PM"}
                    value={fields[`${side}${kind}`]}
                    onChange={(event) => {
                      setFields({
                        ...fields,
                        [`${side}${kind}`]: event.target.value,
                      });
                      setErrors({ ...errors, [side]: undefined });
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        apply();
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.fieldActions}>
        <button
          type="button"
          data-geist-button=""
          className={styles.apply}
          disabled={readOnly}
          onClick={apply}
        >
          <span>
            Apply<span className={styles.enter}>↵</span>
          </span>
        </button>
        {!hideTimeZone && (
          <div className={styles.timezone}>
            {pinnedTimezone ? (
              <span>{pinnedTimezone}</span>
            ) : (
              <label>
                <select
                  aria-label="Timezone"
                  value={zone}
                  onChange={(event) => setZone(event.target.value)}
                >
                  <option value="UTC">UTC</option>
                  {localZone !== "UTC" && (
                    <option value={localZone}>Local ({localZone})</option>
                  )}
                </select>
                <ChevronDown size={12} />
              </label>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
