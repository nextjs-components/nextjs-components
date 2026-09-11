import clsx from "clsx";

import scoped from "./calendar-picker.module.css";

// Keep full utility names here so the package build can detect every class.
// Scoped CSS handles compound states and responsive calendar content.
const surface = "njc:font-sans njc:text-[16px]/[24px] njc:text-gray-1000";
const styles = {
  ...scoped,
  calendar: clsx(
    scoped.calendar,
    surface,
    "njc:inline-flex njc:flex-col njc:max-w-full",
  ),
  controls: clsx(scoped.controls, "njc:flex njc:max-w-full"),
  label: "njc:mb-1.5 njc:text-[13px] njc:text-gray-900",
  triggerWrapper: clsx(scoped.triggerWrapper, "njc:relative njc:max-w-full"),
  trigger: clsx(scoped.trigger, "njc:cursor-pointer njc:text-left"),
  clear: clsx(scoped.clear, "njc:absolute njc:p-0 njc:flex njc:cursor-pointer"),
  popover: clsx(scoped.popover, surface, "njc:overflow-auto njc:rounded-xl"),
  drawer: clsx(scoped.drawer, surface),
  content: clsx(scoped.content, "njc:p-3 njc:rounded-md"),
  layout: clsx(scoped.layout, "njc:flex njc:flex-col"),
  month: clsx(scoped.month, "njc:shrink-0"),
  monthHeader: clsx(
    scoped.monthHeader,
    "njc:flex njc:items-center njc:justify-between njc:-my-[3px] njc:mx-0 njc:h-8",
  ),
  monthTitleWrapper: clsx(
    scoped.monthTitleWrapper,
    "njc:overflow-hidden njc:-ml-4 njc:pl-4 njc:flex-1",
  ),
  caret: clsx(
    scoped.caret,
    "njc:w-8 njc:h-8 njc:flex njc:items-center njc:justify-center njc:shrink-0 njc:rounded-full njc:p-0.5 njc:cursor-pointer",
  ),
  spacer: clsx(scoped.spacer, "njc:block njc:h-2"),
  grid: clsx(
    scoped.grid,
    "njc:block njc:relative njc:border-collapse njc:table-fixed njc:w-full",
  ),
  day: clsx(
    scoped.day,
    "njc:relative njc:block njc:w-8 njc:h-8 njc:rounded-sm njc:text-center njc:m-0",
  ),
  fields: clsx(scoped.fields, "njc:flex njc:flex-col njc:gap-2 njc:h-full"),
  fieldRows: clsx(scoped.fieldRows, "njc:flex njc:flex-col njc:gap-2"),
  fieldHeading: clsx(
    scoped.fieldHeading,
    "njc:flex njc:justify-between njc:items-center njc:mb-1 njc:text-[13px]/[19.5px] njc:text-gray-900",
  ),
  inputRow: clsx(scoped.inputRow, "njc:flex njc:gap-2"),
  dateInput: clsx(scoped.dateInput, "njc:w-full"),
  timeInput: clsx(scoped.timeInput, "njc:w-36"),
  apply: clsx(
    scoped.apply,
    "njc:flex njc:items-center njc:justify-center njc:relative njc:w-full njc:h-8 njc:px-1.5 njc:py-0 njc:rounded-md njc:cursor-pointer",
  ),
  enter: clsx(scoped.enter, "njc:absolute"),
  timezone: clsx(scoped.timezone, "njc:mt-2 njc:flex njc:justify-center"),
  presetWrapper: clsx(scoped.presetWrapper, "njc:relative njc:max-w-full"),
  presetControl: scoped.presetControl,
  presetMenu: clsx(
    scoped.presetMenu,
    surface,
    "njc:grid njc:overflow-auto njc:rounded-lg",
  ),
};

export default styles;
