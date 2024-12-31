"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Toolbar({
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
        d="M1.5 2.5H14.5V12.5C14.5 13.0523 14.0523 13.5 13.5 13.5H2.5C1.94772 13.5 1.5 13.0523 1.5 12.5V2.5ZM0 1H1.5H14.5H16V2.5V12.5C16 13.8807 14.8807 15 13.5 15H2.5C1.11929 15 0 13.8807 0 12.5V2.5V1ZM9.63378 10.5H6.36622H5.5C5.22386 10.5 5 10.2761 5 10C5 9.72386 5.22386 9.5 5.5 9.5H6.36622H9.63378H10.5C10.7761 9.5 11 9.72386 11 10C11 10.2761 10.7761 10.5 10.5 10.5H9.63378ZM10.5 8H5.5C4.39543 8 3.5 8.89543 3.5 10C3.5 11.1046 4.39543 12 5.5 12H10.5C11.6046 12 12.5 11.1046 12.5 10C12.5 8.89543 11.6046 8 10.5 8Z"
        fill="currentColor"
      />
    </svg>
  );
}
