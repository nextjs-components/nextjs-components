"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Code({
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
        d="M4.21969 12.5303L4.75002 13.0607L5.81068 12L5.28035 11.4697L1.81068 7.99999L5.28035 4.53032L5.81068 3.99999L4.75002 2.93933L4.21969 3.46966L0.39647 7.29289C0.00594562 7.68341 0.00594562 8.31658 0.39647 8.7071L4.21969 12.5303ZM11.7804 12.5303L11.25 13.0607L10.1894 12L10.7197 11.4697L14.1894 7.99999L10.7197 4.53032L10.1894 3.99999L11.25 2.93933L11.7804 3.46966L15.6036 7.29289C15.9941 7.68341 15.9941 8.31658 15.6036 8.7071L11.7804 12.5303Z"
        fill="currentColor"
      />
    </svg>
  );
}
