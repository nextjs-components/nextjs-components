"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function DeviceAlternateSmall({
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
        d="M0.5 3.25C0.5 1.45507 1.95507 0 3.75 0H8.25C10.0449 0 11.5 1.45507 11.5 3.25V11.25V12H10.75H1.25H0.5V11.25V3.25ZM3.75 1.5C2.7835 1.5 2 2.2835 2 3.25V10.5H10V3.25C10 2.2835 9.2165 1.5 8.25 1.5H3.75ZM3 3.5C3 2.94772 3.44772 2.5 4 2.5H8C8.55228 2.5 9 2.94772 9 3.5V7H3V3.5ZM6.5 9.5H9V8H6.5V9.5Z"
        fill="currentColor"
        transform="translate(2.5, 2)"
      />
    </svg>
  );
}
