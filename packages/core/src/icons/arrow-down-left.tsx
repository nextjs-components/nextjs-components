"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function ArrowDownLeft({
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
        d="M4.5595 12.5H10.25H11V14H10.25H3C2.44772 14 2 13.5523 2 13V5.75001V5.00001H3.5V5.75001V11.4382L12.7185 2.21968L13.2488 1.68935L14.3095 2.75001L13.7792 3.28034L4.5595 12.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
