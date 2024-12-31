"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function ChevronLeftSmall({
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
        d="M9.24996 12.0607L8.71963 11.5303L5.89641 8.7071C5.50588 8.31657 5.50588 7.68341 5.89641 7.29288L8.71963 4.46966L9.24996 3.93933L10.3106 4.99999L9.78029 5.53032L7.31062 7.99999L9.78029 10.4697L10.3106 11L9.24996 12.0607Z"
        fill="currentColor"
      />
    </svg>
  );
}
