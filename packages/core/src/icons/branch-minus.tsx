"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function BranchMinus({
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
        fill="currentColor"
        fillRule="evenodd"
        d="M8 2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-1.553a6.75 6.75 0 0 1-5.526 4.687A3.001 3.001 0 1 1 3.25 9.095V1h1.5V9.095a3.006 3.006 0 0 1 2.135 2.08A5.25 5.25 0 0 0 10.855 8H10a2 2 0 0 1-2-2V2Zm1.625 1.375h4.75v1.25h-4.75v-1.25ZM5.5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
