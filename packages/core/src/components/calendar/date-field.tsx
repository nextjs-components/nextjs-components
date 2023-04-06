import { createCalendar } from "@internationalized/date";
import { useDateField, useDateSegment } from "@react-aria/datepicker";
import { useLocale } from "@react-aria/i18n";
import { mergeProps } from "@react-aria/utils";
import { useDateFieldState } from "@react-stately/datepicker";
import type { AriaDatePickerProps, DateValue } from "@react-types/datepicker";
import { useRef, useState } from "react";
import { useFocusRing, useFocusWithin } from "react-aria";
import type {
  DateFieldState as IDateFieldState,
  DateSegment as IDateSegment,
} from "react-stately";

export function DateField(props: AriaDatePickerProps<DateValue>) {
  let { locale } = useLocale();
  let state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  let ref = useRef();
  let { fieldProps } = useDateField(props, state, ref);

  const [focusWithin, setFocusWithin] = useState(false);
  let { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: setFocusWithin,
  });
  return (
    <div
      {...mergeProps(focusWithinProps, fieldProps)}
      ref={ref}
      // TODO: move to css
      style={{
        // @ts-ignore
        "--themed-border":
          state.validationState === "invalid"
            ? "var(--geist-error)"
            : focusWithin
            ? "var(--geist-foreground)"
            : "var(--accents-2)",
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: "0 8px",
        border: "1px solid var(--themed-border,var(--accents-2))",
        borderRadius: "var(--geist-radius)",
        fontSize: "var(--geist-form-small-font)",
        height: "var(--geist-form-small-height)",
      }}
    >
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </div>
  );
}

interface DateSegmentProps {
  segment: IDateSegment;
  state: IDateFieldState;
}

function DateSegment({ segment, state }: DateSegmentProps) {
  let ref = useRef();
  let { segmentProps } = useDateSegment(segment, state, ref);
  let { focusProps, isFocused } = useFocusRing();

  return (
    <div
      {...mergeProps(segmentProps, focusProps)}
      ref={ref}
      // TODO: move to css
      style={{
        ...segmentProps.style,
        minWidth:
          segment.maxValue != null && String(segment.maxValue).length + "ch",
        paddingLeft: "0.25ch",
        paddingRight: "0.25ch",
        paddingTop: 4,
        paddingBottom: 4,
        boxSizing: "content-box",
        fontVariantNumeric: "tabular-nums",
        textAlign: "right",
        outline: "none",
        color: isFocused ? "var(--geist-foreground)" : "var(--geist-secondary)",
        borderRadius: "var(--geist-radius)",
        background: isFocused ? "var(--accents-2)" : undefined,
      }}
    >
      {/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
      <span
        aria-hidden="true"
        // TODO: move to css
        style={{
          display: "block",
          width: "100%",
          textAlign: "center",
          color: isFocused
            ? "var(--geist-foreground)"
            : "var(--geist-secondary)",
          visibility: segment.isPlaceholder ? "visible" : "hidden",
          height: segment.isPlaceholder ? "" : 0,
          pointerEvents: "none",
        }}
      >
        {segment.placeholder}
      </span>
      {segment.isPlaceholder ? "" : segment.text}
    </div>
  );
}
