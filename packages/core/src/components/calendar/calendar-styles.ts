import clsx from "clsx";

import scoped from "./calendar-picker.module.css";

// Keep full utility names here so the application’s Tailwind build can detect every class.
// Scoped CSS handles compound states and responsive calendar content.
const surface = "font-geist-sans text-[16px]/[24px] text-geist-gray-1000";
const styles = {
  ...scoped,
  calendar: clsx(scoped.calendar, surface, "inline-flex flex-col max-w-full"),
  controls: clsx(scoped.controls, "flex max-w-full"),
  label: "mb-1.5 text-[13px] text-geist-gray-900",
  triggerWrapper: clsx(scoped.triggerWrapper, "relative max-w-full"),
  trigger: clsx(scoped.trigger, "cursor-pointer text-left"),
  clear: clsx(scoped.clear, "absolute p-0 flex cursor-pointer"),
  popover: clsx(scoped.popover, surface, "overflow-auto rounded-geist-xl"),
  drawer: clsx(scoped.drawer, surface),
  content: clsx(scoped.content, "p-3 rounded-geist-md"),
  layout: clsx(scoped.layout, "flex flex-col"),
  month: clsx(scoped.month, "shrink-0"),
  monthHeader: clsx(
    scoped.monthHeader,
    "flex items-center justify-between -my-[3px] mx-0 h-8",
  ),
  monthTitleWrapper: clsx(
    scoped.monthTitleWrapper,
    "overflow-hidden -ml-4 pl-4 flex-1",
  ),
  caret: clsx(
    scoped.caret,
    "w-8 h-8 flex items-center justify-center shrink-0 rounded-full p-0.5 cursor-pointer",
  ),
  spacer: clsx(scoped.spacer, "block h-2"),
  grid: clsx(scoped.grid, "block relative border-collapse table-fixed w-full"),
  day: clsx(
    scoped.day,
    "relative block w-8 h-8 rounded-geist-sm text-center m-0",
  ),
  fields: clsx(scoped.fields, "flex flex-col gap-2 h-full"),
  fieldRows: clsx(scoped.fieldRows, "flex flex-col gap-2"),
  fieldHeading: clsx(
    scoped.fieldHeading,
    "flex justify-between items-center mb-1 text-[13px]/[19.5px] text-geist-gray-900",
  ),
  inputRow: clsx(scoped.inputRow, "flex gap-2"),
  dateInput: clsx(scoped.dateInput, "w-full"),
  timeInput: clsx(scoped.timeInput, "w-36"),
  apply: clsx(
    scoped.apply,
    "flex items-center justify-center relative w-full h-8 px-1.5 py-0 rounded-geist-md cursor-pointer",
  ),
  enter: clsx(scoped.enter, "absolute"),
  timezone: clsx(scoped.timezone, "mt-2 flex justify-center"),
  presetWrapper: clsx(scoped.presetWrapper, "relative max-w-full"),
  presetControl: scoped.presetControl,
  presetMenu: clsx(
    scoped.presetMenu,
    surface,
    "grid overflow-auto rounded-geist-lg",
  ),
};

export default styles;
