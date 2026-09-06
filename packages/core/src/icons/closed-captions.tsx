"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function ClosedCaptions({
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
        d="M0 3.5C0 2.11929 1.11929 1 2.5 1H13.5C14.8807 1 16 2.11929 16 3.5V12.5C16 13.8807 14.8807 15 13.5 15H2.5C1.11929 15 0 13.8807 0 12.5V3.5ZM2 7C2 5.75736 3.00736 4.75 4.25 4.75H5.25C6.49264 4.75 7.5 5.75736 7.5 7H6C6 6.58579 5.66421 6.25 5.25 6.25H4.25C3.83579 6.25 3.5 6.58579 3.5 7V9C3.5 9.41421 3.83579 9.75 4.25 9.75H5.25C5.66421 9.75 6 9.41421 6 9H7.5C7.5 10.2426 6.49264 11.25 5.25 11.25H4.25C3.00736 11.25 2 10.2426 2 9V7ZM10.75 4.75C9.50736 4.75 8.5 5.75736 8.5 7V9C8.5 10.2426 9.50736 11.25 10.75 11.25H11.75C12.9926 11.25 14 10.2426 14 9H12.5C12.5 9.41421 12.1642 9.75 11.75 9.75H10.75C10.3358 9.75 10 9.41421 10 9V7C10 6.58579 10.3358 6.25 10.75 6.25H11.75C12.1642 6.25 12.5 6.58579 12.5 7H14C14 5.75736 12.9926 4.75 11.75 4.75H10.75Z"
        fill="currentColor"
      />
    </svg>
  );
}
