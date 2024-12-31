"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function UserLink({
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
        d="M9.72 7.22a3.578 3.578 0 1 1 5.06 5.06l-.5.5-1.06-1.06.5-.5a2.079 2.079 0 0 0-2.94-2.94l-.5.5-1.06-1.06zm3.31 2.81-3 3-1.06-1.06 3-3zm-5.81 4.75a3.58 3.58 0 0 0 5.06 0l.5-.5-1.06-1.06-.5.5a2.078 2.078 0 1 1-2.94-2.94l.5-.5-1.06-1.06-.5.5a3.58 3.58 0 0 0 0 5.06M2.5 3.25A3.25 3.25 0 0 1 5.75 0h.5A3.25 3.25 0 0 1 9.5 3.25v.5A3.25 3.25 0 0 1 6.25 7h-.5A3.25 3.25 0 0 1 2.5 3.75zM5.75 1.5A1.75 1.75 0 0 0 4 3.25v.5c0 .966.784 1.75 1.75 1.75h.5A1.75 1.75 0 0 0 8 3.75v-.5A1.75 1.75 0 0 0 6.25 1.5zM4.5 9.082C2.473 9.42.944 10.79.069 12.686l-.069.15V16h4.5v-1.5h-3v-1.33c.664-1.351 1.692-2.257 3-2.559z"
        fill="currentColor"
      />
    </svg>
  );
}
