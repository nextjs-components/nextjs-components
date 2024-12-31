"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function CornerUpLeft({
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
        d="M4.46967 10.0303L5 10.5607L6.06066 9.50001L5.53033 8.96968L3.56066 7.00001H13.25C13.3881 7.00001 13.5 7.11193 13.5 7.25001V13.5V14.25H15V13.5V7.25001C15 6.28351 14.2165 5.50001 13.25 5.50001H3.56066L5.53033 3.53034L6.06066 3.00001L5 1.93935L4.46967 2.46968L1.21967 5.71968C0.926777 6.01257 0.926777 6.48744 1.21967 6.78034L4.46967 10.0303Z"
        fill="currentColor"
      />
    </svg>
  );
}
