"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function ChartTrendingDown({
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
        d="M13.4382 11.5H10.8242H10.0742V13H10.8242H14.9988C15.5511 13 15.9988 12.5523 15.9988 12V7.82537V7.07537H14.4988V7.82537V10.4393L9.20706 5.14755C8.81659 4.75708 8.18353 4.75702 7.79298 5.14742L5.50009 7.43942L1.78032 3.71966L1.24999 3.18933L0.189331 4.24999L0.719662 4.78032L4.79292 8.85357C5.18339 9.24404 5.81645 9.2441 6.207 8.8537L8.49989 6.5617L13.4382 11.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
