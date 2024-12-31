"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Notes({
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
        d="M13 2.5H3V4.5H13V2.5ZM3 7.5V5.75H4.75L4.75 7.5H3ZM4.75 8.75H3V10.5H4.75V8.75ZM6 10.5L6 8.75H13V10.5H6ZM4.75 11.75H3V12.5C3 13.0523 3.44772 13.5 4 13.5H4.75V11.75ZM6 13.5V11.75H13V12.5C13 13.0523 12.5523 13.5 12 13.5H6ZM6 7.5V5.75H13V7.5H6ZM3 1H1.5V2.5V12.5C1.5 13.8807 2.61929 15 4 15H12C13.3807 15 14.5 13.8807 14.5 12.5V2.5V1H13H3Z"
        fill="currentColor"
      />
    </svg>
  );
}
