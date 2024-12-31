"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function GridMasonry({
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
        d="M2.5 6.5V2.5H5.5V6.5H2.5ZM1 2C1 1.44772 1.44772 1 2 1H6C6.55228 1 7 1.44772 7 2V7C7 7.55228 6.55228 8 6 8H2C1.44772 8 1 7.55228 1 7V2ZM2.5 13.5V11.5H5.5V13.5H2.5ZM1 11C1 10.4477 1.44772 10 2 10H6C6.55228 10 7 10.4477 7 11V14C7 14.5523 6.55228 15 6 15H2C1.44772 15 1 14.5523 1 14V11ZM10.5 2.5V4.5H13.5V2.5H10.5ZM10 1C9.44772 1 9 1.44772 9 2V5C9 5.55228 9.44772 6 10 6H14C14.5523 6 15 5.55228 15 5V2C15 1.44772 14.5523 1 14 1H10ZM13.5 13.5H10.5V9.5H13.5V13.5ZM9 9C9 8.44772 9.44772 8 10 8H14C14.5523 8 15 8.44772 15 9V14C15 14.5523 14.5523 15 14 15H10C9.44772 15 9 14.5523 9 14V9Z"
        fill="currentColor "
      />
    </svg>
  );
}
