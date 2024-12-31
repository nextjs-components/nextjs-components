"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function ChartBarRandom({
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
        d="M14 1V1.75V14.25V15H12.5V14.25V1.75V1H14ZM8.75 6V6.75V14.25V15H7.25V14.25V6.75V6H8.75ZM3.5 4.75V4H2V4.75V14.25V15H3.5V14.25V4.75Z"
        fill="currentColor"
      />
    </svg>
  );
}
