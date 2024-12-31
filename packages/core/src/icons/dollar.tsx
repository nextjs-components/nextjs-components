"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Dollar({
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
        d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM8.62499 3.375V4V4.375H9C10.1736 4.375 11.125 5.3264 11.125 6.5H9.875C9.875 6.01675 9.48325 5.625 9 5.625H8.62499V7.375H9C10.1736 7.375 11.125 8.3264 11.125 9.5C11.125 10.6736 10.1736 11.625 9 11.625H8.62499V12V12.625H7.37499V12V11.625H7C5.8264 11.625 4.875 10.6736 4.875 9.5H6.125C6.125 9.98325 6.51675 10.375 7 10.375H7.37499V8.625H7C5.8264 8.625 4.875 7.6736 4.875 6.5C4.875 5.3264 5.8264 4.375 7 4.375H7.37499V4V3.375H8.62499ZM7.37499 5.625H7C6.51675 5.625 6.125 6.01675 6.125 6.5C6.125 6.98325 6.51675 7.375 7 7.375H7.37499V5.625ZM8.62499 8.625V10.375H9C9.48325 10.375 9.875 9.98325 9.875 9.5C9.875 9.01675 9.48325 8.625 9 8.625H8.62499Z"
        fill="currentColor"
      />
    </svg>
  );
}
