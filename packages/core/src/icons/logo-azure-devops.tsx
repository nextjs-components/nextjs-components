"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function LogoAzureDevops({
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
        d="M16 2.99657V12.5L12 16L6 14V15.9806L2 11.5L12 12.5V3.5L16 2.99657ZM12 3.5L7 0V2.28686L1.5 4L0 5.56457V10.5L2 11.5V5.56457L12 3.5Z"
        fill="#0078D4"
      />
    </svg>
  );
}
