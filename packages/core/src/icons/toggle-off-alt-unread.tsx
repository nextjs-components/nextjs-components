"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function ToggleOffAltUnread({
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
        d="M15.62 5.893A6 6 0 0 1 10 14H6A6 6 0 0 1 6 2h3.531a4.039 4.039 0 0 0 .095 1.5H6a4.5 4.5 0 0 0 0 9h4a4.5 4.5 0 0 0 4.22-6.065c.506-.092.98-.279 1.4-.542ZM6 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM6 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        clipRule="evenodd"
      />
      <circle cx="13.5" cy="2.5" r="2.5" fill="var(--ds-blue-900)" />
    </svg>
  );
}
