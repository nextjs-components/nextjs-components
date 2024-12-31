"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function ToggleOffAlt({
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
        d="M6 3.5H10C12.4853 3.5 14.5 5.51472 14.5 8C14.5 10.4853 12.4853 12.5 10 12.5H6C3.51472 12.5 1.5 10.4853 1.5 8C1.5 5.51472 3.51472 3.5 6 3.5ZM0 8C0 4.68629 2.68629 2 6 2H10C13.3137 2 16 4.68629 16 8C16 11.3137 13.3137 14 10 14H6C2.68629 14 0 11.3137 0 8ZM7.5 8C7.5 8.82843 6.82843 9.5 6 9.5C5.17157 9.5 4.5 8.82843 4.5 8C4.5 7.17157 5.17157 6.5 6 6.5C6.82843 6.5 7.5 7.17157 7.5 8ZM9 8C9 9.65685 7.65685 11 6 11C4.34315 11 3 9.65685 3 8C3 6.34315 4.34315 5 6 5C7.65685 5 9 6.34315 9 8Z"
        fill="currentColor"
      />
    </svg>
  );
}
