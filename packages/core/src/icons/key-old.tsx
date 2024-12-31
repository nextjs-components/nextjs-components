"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function KeyOld({
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
        d="M11.25 1.5C9.45507 1.5 7.99999 2.95507 7.99999 4.75C7.99999 6.54493 9.45507 8 11.25 8C13.0449 8 14.5 6.54493 14.5 4.75C14.5 2.95507 13.0449 1.5 11.25 1.5ZM6.49999 4.75C6.49999 2.12665 8.62664 0 11.25 0C13.8733 0 16 2.12665 16 4.75C16 7.37335 13.8733 9.5 11.25 9.5C10.209 9.5 9.24618 9.16512 8.46345 8.5972L7.06065 10L9.03032 11.9697L9.56065 12.5L9.03032 13.0303L6.78032 15.2803L6.24999 15.8107L5.71966 15.2803L3.74999 13.3107L1.78032 15.2803L1.24999 15.8107L0.189331 14.75L0.719661 14.2197L2.68933 12.25L3.21966 11.7197L5.46966 9.46967L5.99999 8.93934L7.40279 7.53654C6.83488 6.75381 6.49999 5.79101 6.49999 4.75ZM4.81065 12.25L6.24999 13.6893L7.43933 12.5L5.99999 11.0607L4.81065 12.25Z"
        fill="currentColor"
      />
    </svg>
  );
}
