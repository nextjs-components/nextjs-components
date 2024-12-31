"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function LogoAngularColor({
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
        d="M8 0L0.5 2.656L1.64393 12.504L8 16L14.3561 12.504L15.5 2.656L8 0Z"
        fill="#DD0031"
      />
      <path
        d="M8 0V1.776V1.768V9.872V16L14.3561 12.504L15.5 2.656L8 0Z"
        fill="#C3002F"
      />
      <path
        d="M8.00003 1.768L3.31152 12.208H5.05964L6.00218 9.872H9.98177L10.9243 12.208H12.6724L8.00003 1.768ZM9.36952 8.432H6.63053L8.00003 5.16L9.36952 8.432Z"
        fill="white"
      />
    </svg>
  );
}
