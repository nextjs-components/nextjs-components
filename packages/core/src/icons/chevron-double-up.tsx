"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function ChevronDoubleUp({
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
        d="M8.7071 3.14644C8.31657 2.75591 7.68341 2.75592 7.29288 3.14644L3.46966 6.96966L2.93933 7.49999L3.99999 8.56065L4.53032 8.03032L7.99999 4.56065L11.4697 8.03032L12 8.56065L13.0607 7.49999L12.5303 6.96966L8.7071 3.14644ZM8.7071 8.14644C8.31657 7.75592 7.68341 7.75592 7.29288 8.14644L3.46966 11.9697L2.93933 12.5L3.99999 13.5607L4.53032 13.0303L7.99999 9.56065L11.4697 13.0303L12 13.5607L13.0607 12.5L12.5303 11.9697L8.7071 8.14644Z"
        fill="currentColor"
      />
    </svg>
  );
}
