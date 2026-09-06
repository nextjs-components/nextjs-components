"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function ArrowUpDiagonalScale({
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
        d="M9.74944 1H8.99944V2.5H9.74944H12.4388L9.46911 5.46967L8.93878 6L9.99944 7.06066L10.5298 6.53033L13.4983 3.56182V6.25V7H14.9983V6.25V2C14.9983 1.44772 14.5506 1 13.9983 1H9.74944ZM2.50195 12.4382V9.75V9H1.00195V9.75V14C1.00195 14.5523 1.44967 15 2.00195 15H6.25079H7.00079V13.5H6.25079H3.56145L6.53112 10.5303L7.06145 10L6.00079 8.93934L5.47046 9.46967L2.50195 12.4382Z"
        fill="currentColor"
      />
    </svg>
  );
}
