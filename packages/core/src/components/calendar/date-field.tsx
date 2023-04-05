import { createCalendar } from "@internationalized/date";
import { useDateField, useDateSegment } from "@react-aria/datepicker";
import { useLocale } from "@react-aria/i18n";
import { useDateFieldState } from "@react-stately/datepicker";
import { useRef } from "react";
import { useFocusRing } from "react-aria";

export function DateField(props) {
  let { locale } = useLocale();
  let state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  let ref = useRef();
  let { fieldProps } = useDateField(props, state, ref);

  return (
    <div
      {...fieldProps}
      ref={ref}
      style={{ display: "flex", flexDirection: "row" }}
    >
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </div>
  );
}

function DateSegment({ segment, state }) {
  let ref = useRef();
  let { segmentProps } = useDateSegment(segment, state, ref);
  let { focusProps, isFocused } = useFocusRing();
  return (
    <div
      {...segmentProps}
      {...focusProps}
      ref={ref}
      style={{
        ...segmentProps.style,
        minWidth:
          segment.maxValue != null && String(segment.maxValue).length + "ch",
        paddingLeft: "0.5ch",
        paddingRight: "0.5ch",
        boxSizing: "content-box",
        fontVariantNumeric: "tabular-nums",
        textAlign: "right",
        outline: "none",
        borderRadius: "0.25rem",
        background: isFocused ? "var(--geist-violet)" : "",
      }}
    >
      {/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
      <span
        aria-hidden="true"
        className="block w-full text-center italic text-gray-500 group-focus:text-white"
        style={{
          display: "block",
          width: "100%",
          textAlign: "center",
          fontStyle: "italic",
          color: "var(--geist-foreground)",
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
