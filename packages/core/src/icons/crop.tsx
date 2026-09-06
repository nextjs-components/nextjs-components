"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Crop({
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
        d="M5 0.75V0H3.5V0.75V3.5H0.75H0V5H0.75H3.5V11.5C3.5 12.0523 3.94771 12.5 4.5 12.5H11V15.25V16H12.5V15.25V12.5H15.25H16V11H15.25H12.5V4.5C12.5 3.94772 12.0523 3.5 11.5 3.5H5V0.75ZM5 5V11H11V5H5Z"
        fill="currentColor"
      />
    </svg>
  );
}
