"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function ArrowUpLeft({
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
        d="M1.99939 10.25V11H3.49939V10.25V4.56008L12.7191 13.7798L13.2495 14.3101L14.3101 13.2494L13.7798 12.7191L4.56121 3.50058H10.25H11V2.00058H10.25H2.99939C2.4471 2.00058 1.99939 2.4483 1.99939 3.00058V10.25Z"
        fill="currentColor"
      />
    </svg>
  );
}
