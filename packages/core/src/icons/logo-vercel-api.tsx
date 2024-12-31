"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function LogoVercelApi({
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
      <g clipPath="url(#clip0_872_3535)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 2L15 14.5H1L8 2Z"
          stroke="currentColor"
          strokeWidth={1.25}
          strokeDasharray="1.25 1.25"
          fill="transparent"
        />
      </g>
      <defs>
        <clipPath id="clip0_872_3535">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
