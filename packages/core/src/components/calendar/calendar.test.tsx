import { parseDate } from "@internationalized/date";
import {
  fireEvent,
  render,
  screen,
  within,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { createRef, useState } from "react";

import { Calendar, type DateValue, type RangeValue } from ".";
import { asDate, parseInput, parsePeriod } from "./date-utils";

const start = new Date(2026, 8, 9);
const end = new Date(2026, 8, 10, 23, 59, 59, 999);
const range = { start, end };

function setMobile(mobile = false) {
  window.matchMedia = jest.fn().mockImplementation((media) => ({
    matches: mobile && media === "(max-width: 600px)",
    media,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }));
}

beforeEach(() => setMobile());

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  window.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

test("opens and closes without React 19 ref warnings", () => {
  const error = jest.spyOn(console, "error").mockImplementation(() => {});
  try {
    render(<Calendar />);
    fireEvent.click(screen.getByRole("button", { name: "Select Date Range" }));
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    const refWarnings = error.mock.calls.filter((args) =>
      args.some((value) => String(value).includes("Accessing element.ref")),
    );
    expect(refWarnings).toEqual([]);
  } finally {
    error.mockRestore();
  }
});

test("commits native dates after two day clicks and restores trigger focus", async () => {
  const change = jest.fn();
  render(<Calendar defaultValue={range} onChange={change} allowClear />);
  fireEvent.click(screen.getByRole("button", { name: "Sep 9 - 10" }));
  fireEvent.click(
    screen.getByRole("button", { name: "Tuesday, September 15, 2026" }),
  );
  expect(change).not.toHaveBeenCalled();
  fireEvent.click(
    screen.getByRole("button", { name: "Friday, September 18, 2026" }),
  );
  expect(change).toHaveBeenCalledWith(
    {
      start: new Date(2026, 8, 15),
      end: new Date(2026, 8, 18, 23, 59, 59, 999),
    },
    undefined,
  );
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  await waitFor(() =>
    expect(screen.getByRole("button", { name: "Sep 15 - 18" })).toHaveFocus(),
  );
  fireEvent.click(screen.getByRole("button", { name: "Clear selected dates" }));
  expect(change).toHaveBeenLastCalledWith(null, undefined);
  expect(
    screen.getByRole("button", { name: "Select Date Range" }),
  ).toBeInTheDocument();
});

test("controlled value changes only when the consumer updates it", () => {
  function Consumer() {
    const [value, setValue] = useState<RangeValue<DateValue> | null>(range);
    return <Calendar value={value} onChange={setValue} allowClear />;
  }
  render(<Consumer />);
  fireEvent.click(screen.getByRole("button", { name: "Clear selected dates" }));
  expect(
    screen.getByRole("button", { name: "Select Date Range" }),
  ).toBeInTheDocument();
});

test("typed edits reject invalid input and commit only on Apply", () => {
  const change = jest.fn();
  render(
    <Calendar defaultValue={range} onChange={change} pinnedTimezone="UTC" />,
  );
  fireEvent.click(screen.getByRole("button", { name: "Sep 9 - 10" }));
  fireEvent.change(screen.getByRole("textbox", { name: "Start date" }), {
    target: { value: "Feb 30, 2026" },
  });
  fireEvent.click(screen.getByRole("button", { name: /Apply/ }));
  expect(screen.getByRole("alert")).toHaveTextContent("Invalid date or time");
  expect(change).not.toHaveBeenCalled();
  fireEvent.change(screen.getByRole("textbox", { name: "Start date" }), {
    target: { value: "2026-09-08" },
  });
  fireEvent.change(screen.getByRole("textbox", { name: "Start time" }), {
    target: { value: "1:30PM" },
  });
  expect(change).not.toHaveBeenCalled();
  fireEvent.keyDown(screen.getByRole("textbox", { name: "Start time" }), {
    key: "Enter",
  });
  expect(change.mock.calls[0][0].start.toISOString()).toBe(
    "2026-09-08T13:30:00.000Z",
  );
});

test("date limits block day selection and typed ranges", () => {
  const change = jest.fn();
  render(
    <Calendar
      defaultValue={range}
      minValue={start}
      maxValue={end}
      onChange={change}
    />,
  );
  fireEvent.click(screen.getByRole("button", { name: "Sep 9 - 10" }));
  const invalid = screen.getByRole("button", {
    name: "Tuesday, September 8, 2026",
  });
  expect(invalid).toHaveAttribute("aria-disabled", "true");
  fireEvent.click(invalid);
  fireEvent.click(
    screen.getByRole("button", { name: "Thursday, September 10, 2026" }),
  );
  expect(change).not.toHaveBeenCalled();
  fireEvent.change(screen.getByRole("textbox", { name: "Start date" }), {
    target: { value: "2026-09-07" },
  });
  fireEvent.click(screen.getByRole("button", { name: /Apply/ }));
  expect(screen.getByRole("alert")).toHaveTextContent(
    "Outside of allowed range",
  );
});

test("preset index, keyboard selection, and callback key match the API", () => {
  const change = jest.fn();
  const presets = {
    first: { text: "First Range", ...range },
    second: { text: "Second Range", start: new Date(2026, 8, 1), end },
  };
  render(<Calendar presets={presets} presetIndex={1} onChange={change} />);
  const combo = screen.getByRole("combobox", { name: "Select period" });
  expect(combo).toHaveValue("Second Range");
  fireEvent.focus(combo);
  fireEvent.change(combo, { target: { value: "First" } });
  fireEvent.keyDown(combo, { key: "Enter" });
  expect(change).toHaveBeenCalledWith(range, "first");
});

test("mobile presets search and select by keyboard, then restore trigger focus", async () => {
  setMobile(true);
  const user = userEvent.setup();
  const change = jest.fn();
  render(
    <Calendar
      compact
      presets={{
        first: { text: "First Range", ...range },
        second: { text: "Second Range", start: new Date(2026, 8, 1), end },
      }}
      onChange={change}
    />,
  );
  const trigger = screen.getByRole("button", { name: "Select period" });
  await user.click(trigger);
  const search = screen.getByRole("combobox", { name: "Select period" });
  expect(search).toHaveFocus();
  await user.type(search, "First");
  expect(
    screen.queryByRole("option", { name: "Second Range" }),
  ).not.toBeInTheDocument();
  await user.keyboard("{Enter}");
  expect(change).toHaveBeenCalledWith(range, "first");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  await waitFor(() => expect(trigger).toHaveFocus());
});

test("mobile Done and Escape dismiss without committing and Tab stays inside", async () => {
  setMobile(true);
  const user = userEvent.setup();
  const change = jest.fn();
  render(
    <Calendar
      presets={{ first: { text: "First Range", ...range } }}
      onChange={change}
    />,
  );
  const trigger = screen.getByRole("button", { name: "Select period" });
  await user.click(trigger);
  await user.tab({ shift: true });
  expect(screen.getByRole("button", { name: "Done" })).toHaveFocus();
  await user.keyboard("{Enter}");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  await waitFor(() => expect(trigger).toHaveFocus());
  await user.click(trigger);
  await user.type(screen.getByRole("combobox"), "First");
  await user.keyboard("{Escape}");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(change).not.toHaveBeenCalled();
});

test("mobile date selection uses the shared drawer and restores focus after exit", async () => {
  setMobile(true);
  const user = userEvent.setup();
  const change = jest.fn();
  render(<Calendar defaultValue={range} onChange={change} />);
  const trigger = screen.getByRole("button", { name: "Sep 9 - 10" });
  await user.click(trigger);
  const drawer = screen.getByRole("dialog", { name: "Choose dates" });
  expect(drawer).toHaveAttribute("data-geist-drawer");
  expect(trigger).toHaveAttribute("aria-controls", drawer.id);
  await user.click(
    screen.getByRole("button", { name: "Tuesday, September 15, 2026" }),
  );
  expect(change).not.toHaveBeenCalled();
  await user.click(
    screen.getByRole("button", { name: "Friday, September 18, 2026" }),
  );
  expect(change).toHaveBeenCalledWith(
    {
      start: new Date(2026, 8, 15),
      end: new Date(2026, 8, 18, 23, 59, 59, 999),
    },
    undefined,
  );
  expect(drawer).toHaveAttribute("aria-hidden", "true");
  expect(trigger).not.toHaveAttribute("aria-controls");
  await waitFor(() => expect(drawer).not.toBeInTheDocument());
  await waitFor(() => expect(trigger).toHaveFocus());
});

test("mobile date drawer supports controlled dismissal by swipe and Escape", async () => {
  setMobile(true);
  const user = userEvent.setup();
  const change = jest.fn();
  function Consumer() {
    const [open, setOpen] = useState(false);
    return <Calendar isOpen={open} onOpenChange={setOpen} onChange={change} />;
  }
  render(<Consumer />);
  const trigger = screen.getByRole("button", { name: "Select Date Range" });
  await user.click(trigger);
  const drawer = screen.getByRole("dialog");
  fireEvent.touchStart(drawer, { touches: [{ clientY: 100 }] });
  fireEvent.touchEnd(drawer, { changedTouches: [{ clientY: 250 }] });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  await waitFor(() => expect(trigger).toHaveFocus());
  await user.click(trigger);
  await user.keyboard("{Escape}");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(change).not.toHaveBeenCalled();
});

test("keyboard moves dates and months, Escape returns focus, ref targets trigger", () => {
  const ref = createRef<HTMLButtonElement>();
  render(<Calendar ref={ref} defaultValue={range} />);
  fireEvent.click(ref.current);
  const grid = screen.getByRole("grid");
  fireEvent.keyDown(grid, { key: "ArrowRight" });
  expect(
    screen.getByRole("button", { name: "Thursday, September 10, 2026" }),
  ).toHaveFocus();
  fireEvent.keyDown(grid, { key: "PageDown" });
  expect(
    screen.getByRole("heading", { name: "October 2026" }),
  ).toBeInTheDocument();
  fireEvent.keyDown(grid, { key: "Escape" });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("disabled controls do not open and single selection commits one day", () => {
  const change = jest.fn();
  const { rerender } = render(<Calendar disabled onChange={change} />);
  expect(
    screen.getByRole("button", { name: "Select Date Range" }),
  ).toBeDisabled();
  rerender(
    <Calendar selectionMode="single" defaultValue={range} onChange={change} />,
  );
  fireEvent.click(screen.getByRole("button"));
  expect(
    within(screen.getByRole("dialog")).queryByRole("textbox"),
  ).not.toBeInTheDocument();
  const day = screen
    .getAllByRole("button")
    .find((button) => button.textContent === "15");
  fireEvent.click(day);
  const selected = change.mock.calls[0][0];
  expect(selected.start.getDate()).toBe(15);
  expect(selected.end.getDate()).toBe(15);
});

test("timezone conversion rejects DST gaps and invalid times without date rollover", () => {
  expect(parseInput("2026-03-08", "2:30AM", "America/New_York")).toBeNull();
  expect(parseInput("2026-02-30", "1PM", "UTC")).toBeNull();
  expect(parseInput("2026-09-09", "13PM", "UTC")).toBeNull();
  expect(
    parseInput("2026-09-09", "1:30PM", "America/Los_Angeles")?.toISOString(),
  ).toBe("2026-09-09T20:30:00.000Z");
  expect(asDate(parseDate("2026-09-09"), "UTC").toISOString()).toBe(
    "2026-09-09T00:00:00.000Z",
  );
});

test("relative hints and fixed-date preset input produce real ranges", () => {
  const now = new Date(2026, 8, 9, 12);
  expect(parsePeriod("45m", now)).toEqual({
    start: new Date(2026, 8, 9, 11, 15),
    end: now,
  });
  expect(parsePeriod("10d", now)?.start).toEqual(new Date(2026, 7, 30));
  expect(parsePeriod("Jan 1 - Jan 2", now)).toEqual({
    start: new Date(2026, 0, 1),
    end: new Date(2026, 0, 2, 23, 59, 59, 999),
  });
  expect(parsePeriod("last month", now)).toEqual({
    start: new Date(2026, 7, 1),
    end: new Date(2026, 7, 31, 23, 59, 59, 999),
  });
  expect(parsePeriod("Feb 30", now)).toBeNull();
});
