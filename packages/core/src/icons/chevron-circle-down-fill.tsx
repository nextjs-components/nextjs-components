"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function ChevronCircleDownFill({
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
        d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM11.2803 7.53033L11.8107 7L10.75 5.93934L10.2197 6.46967L8 8.68934L5.78033 6.46967L5.25 5.93934L4.18934 7L4.71967 7.53033L7.29289 10.1036C7.68342 10.4941 8.31658 10.4941 8.70711 10.1036L11.2803 7.53033Z"
        fill="currentColor"
      />
    </svg>
  );
}
