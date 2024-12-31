"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function ChevronCircleUpFill({
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
        d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4.71967 8.46967L4.18934 9L5.25 10.0607L5.78033 9.53033L8 7.31066L10.2197 9.53033L10.75 10.0607L11.8107 9L11.2803 8.46967L8.70711 5.89645C8.31658 5.50592 7.68342 5.50592 7.29289 5.89645L4.71967 8.46967Z"
        fill="currentColor"
      />
    </svg>
  );
}
