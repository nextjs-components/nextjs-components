"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function CornerLeftUp({
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
        d="M9.78032 4.71967L10.3107 5.25L9.24999 6.31066L8.71966 5.78033L6.74999 3.81066V13.5C6.74999 13.6381 6.86192 13.75 6.99999 13.75H13.25H14V15.25H13.25H6.99999C6.03349 15.25 5.24999 14.4665 5.24999 13.5V3.81066L3.28032 5.78033L2.74999 6.31066L1.68933 5.25L2.21966 4.71967L5.46966 1.46967C5.76255 1.17678 6.23743 1.17678 6.53032 1.46967L9.78032 4.71967Z"
        fill="currentColor"
      />
    </svg>
  );
}
