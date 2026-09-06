"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function CornerRightDown({
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
        d="M2.75 2.75H2V1.25H2.75H9C9.9665 1.25 10.75 2.0335 10.75 3V12.6893L12.7197 10.7197L13.25 10.1893L14.3107 11.25L13.7803 11.7803L10.5303 15.0303C10.2374 15.3232 9.76256 15.3232 9.46967 15.0303L6.21967 11.7803L5.68934 11.25L6.75 10.1893L7.28033 10.7197L9.25 12.6893V3C9.25 2.86193 9.13807 2.75 9 2.75H2.75Z"
        fill="currentColor"
      />
    </svg>
  );
}
