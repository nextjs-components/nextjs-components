"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function BellOff({
  color = "currentcolor",
  size,
  ...props
}: Props) {
  const iconSize = useIconSize();
  const height = size || iconSize.size;
  const width = size || iconSize.size;
  const style = { color, ...props.style };
  return (
    <svg
      {...props}
      data-testid="geist-icon"
      height={height}
      strokeLinejoin="round"
      style={style}
      viewBox="0 0 16 16"
      width={width}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.53698 3.47633L11.5607 10.5H12H12.98C12.36 9.91233 12 9.09029 12 8.22059V5.5075C12 3.29422 10.2058 1.5 7.99249 1.5C6.52159 1.5 5.23456 2.29232 4.53698 3.47633ZM13.0607 12L15.2803 14.2197L15.8107 14.75L14.75 15.8107L14.2197 15.2803L0.719661 1.78033L0.189331 1.25L1.24999 0.18934L1.78032 0.71967L3.45132 2.39067C4.44349 0.947794 6.10679 0 7.99249 0C11.0342 0 13.5 2.46579 13.5 5.5075V8.22059C13.5 8.76913 13.7741 9.28137 14.2305 9.58565L14.666 9.87596L15 10.0986V10.5V11.25V12H14.25H13.0607ZM3.98499 7.75V7H2.48499V7.75V8.22669C2.48499 8.77318 2.2132 9.28388 1.75991 9.58912L1.33107 9.8779L0.999991 10.1009V10.5V11.25V12H1.74999H6.74999H7.49999V10.5H6.74999H3.01223C3.62798 9.91235 3.98499 9.09303 3.98499 8.22669V7.75ZM9.16777 13.5H10.7486L10.5867 13.9867C10.3988 14.5516 10.0074 15.0152 9.5148 15.3226C9.07839 15.5949 8.55541 15.75 8.00001 15.75C7.4446 15.75 6.92163 15.5949 6.48522 15.3226C5.99262 15.0152 5.60125 14.5516 5.41334 13.9867L5.25143 13.5H6.83224L6.83665 13.5133C6.90411 13.716 7.05457 13.9098 7.27935 14.0501C7.4766 14.1732 7.72425 14.25 8.00001 14.25C8.27577 14.25 8.52342 14.1732 8.72066 14.0501C8.94545 13.9098 9.0959 13.716 9.16336 13.5133L9.16777 13.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
