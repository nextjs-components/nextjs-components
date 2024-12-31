"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function BranchPlus({
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
        d="M10 0a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h.854a5.25 5.25 0 0 1-3.969 3.175 3.006 3.006 0 0 0-2.135-2.08V1h-1.5V9.095a3.001 3.001 0 1 0 3.671 3.592A6.75 6.75 0 0 0 12.447 8H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-4Zm.25 3.375h-.625v1.25h1.75v1.75h1.25v-1.75h1.75v-1.25h-1.75v-1.75h-1.25v1.75H10.25ZM5.5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
