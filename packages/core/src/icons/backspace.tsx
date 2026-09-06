"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Backspace({
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
        d="M0 0.75V0H1.5V0.75V15.25V16H0V15.25V0.75ZM8.46967 3.21967L9 2.68934L10.0607 3.75L9.53033 4.28033L6.56066 7.25H15.25H16V8.75H15.25H6.56066L9.53033 11.7197L10.0607 12.25L9 13.3107L8.46967 12.7803L4.21967 8.53033C3.92678 8.23744 3.92678 7.76256 4.21967 7.46967L8.46967 3.21967Z"
        fill="currentColor"
      />
    </svg>
  );
}
