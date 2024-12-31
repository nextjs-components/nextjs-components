"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function WindowCritical({
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
        d="M.75 1H0v10.5A2.5 2.5 0 0 0 2.5 14h2.75v-1.5H2.5a1 1 0 0 1-1-1v-9h13V7H16V1H.75Zm3 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM7 4.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm1.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.25 11h2.5V9.5a1.25 1.25 0 1 0-2.5 0V11ZM9 11H8v3.65c0 .746.604 1.35 1.35 1.35h4.3A1.35 1.35 0 0 0 15 14.65V11h-1V9.5a2.5 2.5 0 0 0-5 0V11Z"
        fill="currentColor"
      />
    </svg>
  );
}
