"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function SecureConnection({
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
        d="M11 3.75C11 4.44036 11.5596 5 12.25 5C12.9404 5 13.5 4.44036 13.5 3.75C13.5 3.05964 12.9404 2.5 12.25 2.5C11.5596 2.5 11 3.05964 11 3.75ZM9.84848 5.09086C9.62652 4.69418 9.5 4.23687 9.5 3.75C9.5 2.23122 10.7312 1 12.25 1C13.7688 1 15 2.23122 15 3.75C15 5.26878 13.7688 6.5 12.25 6.5C11.7631 6.5 11.3058 6.37348 10.9091 6.15152L6.15153 10.9091C6.37348 11.3058 6.5 11.7631 6.5 12.25C6.5 13.7688 5.26878 15 3.75 15C2.23122 15 1 13.7688 1 12.25C1 10.7312 2.23122 9.5 3.75 9.5C4.23687 9.5 4.69419 9.62652 5.09087 9.84848L9.84848 5.09086ZM2.5 12.25C2.5 12.9404 3.05964 13.5 3.75 13.5C4.44036 13.5 5 12.9404 5 12.25C5 11.5596 4.44036 11 3.75 11C3.05964 11 2.5 11.5596 2.5 12.25ZM3.75 5C3.05964 5 2.5 4.44036 2.5 3.75C2.5 3.05964 3.05964 2.5 3.75 2.5C4.44036 2.5 5 3.05964 5 3.75C5 4.44036 4.44036 5 3.75 5ZM1 3.75C1 5.26878 2.23122 6.5 3.75 6.5C5.26878 6.5 6.5 5.26878 6.5 3.75C6.5 2.23122 5.26878 1 3.75 1C2.23122 1 1 2.23122 1 3.75ZM11 12.25C11 12.9404 11.5596 13.5 12.25 13.5C12.9404 13.5 13.5 12.9404 13.5 12.25C13.5 11.5596 12.9404 11 12.25 11C11.5596 11 11 11.5596 11 12.25ZM12.25 15C10.7312 15 9.5 13.7688 9.5 12.25C9.5 10.7312 10.7312 9.5 12.25 9.5C13.7688 9.5 15 10.7312 15 12.25C15 13.7688 13.7688 15 12.25 15Z"
        fill="currentColor"
      />
    </svg>
  );
}
