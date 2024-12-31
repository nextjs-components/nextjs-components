"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Envelope({
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
        d="M13.2642 3.5H2.73578L8 8.01219L13.2642 3.5ZM1.5 4.41638V11.5C1.5 12.0523 1.94772 12.5 2.5 12.5H13.5C14.0523 12.5 14.5 12.0523 14.5 11.5V4.41638L8.48809 9.56944L8 9.98781L7.51191 9.56944L1.5 4.41638ZM0 2H1.5H14.5H16V3.5V11.5C16 12.8807 14.8807 14 13.5 14H2.5C1.11929 14 0 12.8807 0 11.5V3.5V2Z"
        fill="currentColor"
      />
    </svg>
  );
}
