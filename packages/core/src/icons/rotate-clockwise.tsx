"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function RotateClockwise({
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
        d="M2.5 8C2.5 4.96643 4.97431 2.5 8.03548 2.5C10.5716 2.5 12.7064 4.19393 13.3628 6.5H10.75H10V8H10.75H15.25C15.6642 8 16 7.66421 16 7.25V2.75V2H14.5V2.75V5.23347C13.4215 2.74164 10.9316 1 8.03548 1C4.1539 1 1 4.13001 1 8C1 11.87 4.1539 15 8.03548 15C10.3763 15 12.4513 13.8617 13.7295 12.1122L14.172 11.5066L12.9609 10.6217L12.5184 11.2273C11.5117 12.6051 9.87945 13.5 8.03548 13.5C4.97431 13.5 2.5 11.0336 2.5 8Z"
        fill="currentColor"
      />
    </svg>
  );
}
