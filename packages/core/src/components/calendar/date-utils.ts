import {
  CalendarDateTime,
  toZoned,
  type DateValue as InternationalDateValue,
} from "@internationalized/date";

export type DateValue = Date;
export type DateInput = Date | InternationalDateValue;
export interface RangeValue<T> {
  start: T;
  end: T;
}
export type DateRange = RangeValue<Date>;

export function asDate(
  value: DateInput,
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
): Date {
  return value instanceof Date ? new Date(value) : value.toDate(timeZone);
}
export function dayStart(value: Date): Date {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
}
export function dayEnd(value: Date): Date {
  const date = new Date(value);
  date.setHours(23, 59, 59, 999);
  return date;
}
export function addDays(value: Date, days: number): Date {
  const date = new Date(value);
  date.setDate(date.getDate() + days);
  return date;
}
export function sameDay(a: Date, b: Date): boolean {
  return +dayStart(a) === +dayStart(b);
}

/** The relative and fixed forms shown in the Calendar preset menu. */
export function parsePeriod(text: string, now = new Date()): DateRange | null {
  const input = text.trim().toLowerCase();
  if (input === "today") return { start: dayStart(now), end: dayEnd(now) };
  if (input === "yesterday")
    return { start: dayStart(addDays(now, -1)), end: dayEnd(addDays(now, -1)) };
  if (input === "last month")
    return {
      start: new Date(now.getFullYear(), now.getMonth() - 1, 1),
      end: dayEnd(new Date(now.getFullYear(), now.getMonth(), 0)),
    };
  const relative =
    /^(?:last\s+)?(\d+)\s*(m|minutes?|h|hours?|d|days?|w|weeks?|months?)$/.exec(
      input,
    );
  if (relative) {
    const amount = Number(relative[1]);
    const unit = relative[2];
    if (!amount || amount > 10000) return null;
    if (unit === "m" || unit.startsWith("minute"))
      return { start: new Date(+now - amount * 60000), end: new Date(now) };
    if (unit === "h" || unit.startsWith("hour"))
      return { start: new Date(+now - amount * 3600000), end: new Date(now) };
    const start = dayStart(now);
    if (unit.startsWith("month")) start.setMonth(start.getMonth() - amount);
    else
      start.setDate(start.getDate() - amount * (unit.startsWith("w") ? 7 : 1));
    return { start, end: dayEnd(now) };
  }
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const parse = (part: string) => {
    if (/^\d{1,2}\/\d{1,2}$/.test(part)) part += `/${now.getFullYear()}`;
    if (/^[a-z]+\s+\d{1,2}$/.test(part)) part += `, ${now.getFullYear()}`;
    return parseInput(part, "00:00", zone);
  };
  const parts = input.split(/\s+-\s+/);
  if (parts.length > 2) return null;
  const start = parse(parts[0]);
  const end = parse(parts[1] ?? parts[0]);
  return start && end && start <= end ? { start, end: dayEnd(end) } : null;
}
export function formatDate(value: Date, timeZone?: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone,
  }).format(value);
}
export function formatTime(
  value: Date,
  timeZone: string,
  hourCycle: 12 | 24 = 12,
): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: hourCycle === 12,
    timeZone,
  }).format(value);
}

// Parse calendar dates strictly; Date.parse silently rolls invalid days into the next month.
export function parseInput(
  date: string,
  time: string,
  timeZone: string,
): Date | null {
  const iso = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(date.trim());
  const named = /^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/.exec(date.trim());
  const numeric = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(date.trim());
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  const year = Number(iso?.[1] ?? named?.[3] ?? numeric?.[3]);
  const month = iso
    ? Number(iso[2])
    : named
      ? months.findIndex(
          (m) =>
            m === named[1].toLowerCase() ||
            m.slice(0, 3) === named[1].toLowerCase(),
        ) + 1
      : Number(numeric?.[1]);
  const day = Number(iso?.[3] ?? named?.[2] ?? numeric?.[2]);
  const clock = /^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i.exec(time.trim());
  if (
    ![year, month, day].every(Number.isFinite) ||
    !year ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > new Date(year, month, 0).getDate() ||
    !clock
  )
    return null;
  let hour = Number(clock[1]);
  const minute = Number(clock[2] ?? 0);
  if (minute > 59 || (clock[3] ? hour < 1 || hour > 12 : hour > 23))
    return null;
  if (clock[3]) hour = (hour % 12) + (clock[3].toLowerCase() === "pm" ? 12 : 0);
  try {
    return toZoned(
      new CalendarDateTime(year, month, day, hour, minute),
      timeZone,
      "reject",
    ).toDate();
  } catch {
    return null;
  }
}

export function rangeLabel(range: DateRange, single = false): string {
  const { start, end } = range;
  if (single) return formatDate(start);
  const short = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const year =
    start.getFullYear() === new Date().getFullYear()
      ? ""
      : `, ${start.getFullYear()}`;
  const fullDays = +start === +dayStart(start) && +end === +dayEnd(end);
  if (fullDays && sameDay(start, end))
    return (
      start.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }) + year
    );
  if (
    fullDays &&
    start.getDate() === 1 &&
    end.getDate() ===
      new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate()
  ) {
    if (
      start.getMonth() === 0 &&
      end.getMonth() === 11 &&
      start.getFullYear() === end.getFullYear()
    )
      return String(start.getFullYear());
    if (
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear()
    )
      return start.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
  }
  if (start.getFullYear() !== end.getFullYear())
    return `${formatDate(start)} - ${formatDate(end)}`;
  if (fullDays)
    return `${short(start)} - ${start.getMonth() === end.getMonth() ? end.getDate() : short(end)}${year}`;
  const time = (d: Date) =>
    d
      .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
      .replace(":00", "")
      .replace(" AM", "am")
      .replace(" PM", "pm");
  return `${short(start)}, ${time(start)} - ${short(end)}, ${time(end)}${year}`;
}
