"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function PlusSquareSmall({
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
        d="M5 4.25H11C11.4142 4.25 11.75 4.58579 11.75 5V11C11.75 11.4142 11.4142 11.75 11 11.75H5C4.58579 11.75 4.25 11.4142 4.25 11V5C4.25 4.58579 4.58579 4.25 5 4.25ZM3 5C3 3.89543 3.89543 3 5 3H11C12.1046 3 13 3.89543 13 5V11C13 12.1046 12.1046 13 11 13H5C3.89543 13 3 12.1046 3 11V5ZM7.375 10.375V9.75V8.625H6.25H5.625V7.375H6.25H7.375V6.25V5.625H8.625V6.25V7.375H9.75H10.375V8.625H9.75H8.625V9.75V10.375H7.375Z"
        fill="currentColor"
      />
    </svg>
  );
}
