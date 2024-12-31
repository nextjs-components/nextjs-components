"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Servers({
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
        d="M13.5 1.5L2.5 1.5L2.5 4.5C2.5 5.05228 2.94772 5.5 3.5 5.5L12.5 5.5C13.0523 5.5 13.5 5.05228 13.5 4.5V1.5ZM15 0H13.5H2.5H1V1.5V4.5C1 5.88071 2.11929 7 3.5 7L12.5 7C13.8807 7 15 5.88071 15 4.5V1.5V0ZM2.5 13.5V10.5H13.5V13.5C13.5 14.0523 13.0523 14.5 12.5 14.5H3.5C2.94772 14.5 2.5 14.0523 2.5 13.5ZM1 9H2.5H13.5H15V10.5V13.5C15 14.8807 13.8807 16 12.5 16H3.5C2.11929 16 1 14.8807 1 13.5V10.5V9ZM4.75 13.25C5.16421 13.25 5.5 12.9142 5.5 12.5C5.5 12.0858 5.16421 11.75 4.75 11.75C4.33579 11.75 4 12.0858 4 12.5C4 12.9142 4.33579 13.25 4.75 13.25ZM8 12.5C8 12.9142 7.66421 13.25 7.25 13.25C6.83579 13.25 6.5 12.9142 6.5 12.5C6.5 12.0858 6.83579 11.75 7.25 11.75C7.66421 11.75 8 12.0858 8 12.5ZM10.5 3.5C10.5 3.91421 10.8358 4.25 11.25 4.25C11.6642 4.25 12 3.91421 12 3.5C12 3.08579 11.6642 2.75 11.25 2.75C10.8358 2.75 10.5 3.08579 10.5 3.5ZM8.75 4.25C8.33579 4.25 8 3.91421 8 3.5C8 3.08579 8.33579 2.75 8.75 2.75C9.16421 2.75 9.5 3.08579 9.5 3.5C9.5 3.91421 9.16421 4.25 8.75 4.25Z"
        fill="currentColor"
      />
    </svg>
  );
}
