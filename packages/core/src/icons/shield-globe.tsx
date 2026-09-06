"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function ShieldGlobe({
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
        d="M11.25 4.25V3.5C9.35033 2.86678 6 2.58921 6 0C6 2.58921 2.64967 2.86678 0.75 3.5V9.52717C0.75 11.2011 1.67915 12.7367 3.16197 13.5134L4.5 14.2143"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="square"
        fill="transparent"
      />
      <circle
        cx="11.5"
        cy="11.5"
        r="3.875"
        stroke="currentColor"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="transparent"
      />
      <path d="M8 11.5H15.25" stroke="currentColor" strokeLinejoin="bevel" />
      <path
        d="M10.75 15V15C10.0964 12.7124 10.0964 10.2876 10.75 8V8"
        stroke="currentColor"
        strokeLinejoin="bevel"
      />
      <path
        d="M12.25 15V15C12.9036 12.7124 12.9036 10.2876 12.25 8V8"
        stroke="currentColor"
        strokeLinejoin="bevel"
      />
    </svg>
  );
}
