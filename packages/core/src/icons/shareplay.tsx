"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Shareplay({
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
        d="M3.5 11.5H1.5V3.5H14.5V11.5H12.5H11.75V13H12.5H15C15.5523 13 16 12.5523 16 12V3C16 2.44772 15.5523 2 15 2H1C0.447714 2 0 2.44772 0 3V12C0 12.5523 0.447715 13 1 13H3.5H4.25V11.5H3.5ZM8.20801 10.312C8.10906 10.1636 7.89094 10.1636 7.79199 10.312L4.25912 15.6113C4.14836 15.7775 4.26746 16 4.46713 16H11.5329C11.7325 16 11.8516 15.7775 11.7409 15.6113L8.20801 10.312Z"
        fill="currentColor"
      />
    </svg>
  );
}
