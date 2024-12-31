"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Clipboard({
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
        d="M6.75 1.5H9.25C9.52614 1.5 9.75 1.72386 9.75 2C9.75 2.27614 9.52614 2.5 9.25 2.5H6.75C6.47386 2.5 6.25 2.27614 6.25 2C6.25 1.72386 6.47386 1.5 6.75 1.5ZM4.81301 1.5C5.03503 0.637386 5.81808 0 6.75 0H9.25C10.1819 0 10.965 0.637386 11.187 1.5H13.25H14V2.25V12.75C14 14.5449 12.5449 16 10.75 16H5.25C3.45507 16 2 14.5449 2 12.75V2.25V1.5H2.75H4.81301ZM5.01756 3H5H3.5V12.75C3.5 13.7165 4.2835 14.5 5.25 14.5H10.75C11.7165 14.5 12.5 13.7165 12.5 12.75V3H11H10.9824C10.6366 3.5978 9.99028 4 9.25 4H6.75C6.00972 4 5.36337 3.5978 5.01756 3Z"
        fill="currentColor"
      />
    </svg>
  );
}
