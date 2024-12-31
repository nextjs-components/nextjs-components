"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function FunctionRectangleFill({
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
        d="M1 0H15V13.5C15 14.8807 13.8807 16 12.5 16H3.5C2.11929 16 1 14.8807 1 13.5V0ZM9.75 4.5C9.19772 4.5 8.75 4.94772 8.75 5.5V6.5H9.75H10.5V8H9.75H8.75V10.5C8.75 11.8807 7.63071 13 6.25 13H5.5V11.5H6.25C6.80228 11.5 7.25 11.0523 7.25 10.5V8H6.25H5.5V6.5H6.25H7.25V5.5C7.25 4.11929 8.36929 3 9.75 3H10.5V4.5H9.75Z"
        fill="currentColor"
      />
    </svg>
  );
}
