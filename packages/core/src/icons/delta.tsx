"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Delta({
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
        d="M2.67705 15H1L1.75 13.5L6.16147 4.67705L6.15836 4.67082L6.16667 4.66667L7.16147 2.67705L8 1L8.83853 2.67705L14.25 13.5L15 15H13.3229H2.67705ZM7 6.3541L10.5729 13.5H3.42705L7 6.3541Z"
        fill="currentColor"
      />
    </svg>
  );
}
