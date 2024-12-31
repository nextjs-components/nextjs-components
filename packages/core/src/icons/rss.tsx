"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Rss({ color = "currentcolor", size, ...props }: Props) {
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
        d="M1 2.5C7.90356 2.5 13.5 8.09644 13.5 15H15C15 7.26801 8.73199 1 1 1V2.5ZM8 15C8 11.134 4.86599 8 1 8V6.5C5.69442 6.5 9.5 10.3056 9.5 15H8ZM2.5 15C2.5 14.1716 1.82843 13.5 1 13.5V12C2.65685 12 4 13.3431 4 15H2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
