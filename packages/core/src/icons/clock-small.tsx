"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function ClockSmall({
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
        d="M13.0138 8C13.0138 10.4853 10.999 12.5 8.51376 12.5C6.02848 12.5 4.01376 10.4853 4.01376 8C4.01376 5.51472 6.02848 3.5 8.51376 3.5C10.999 3.5 13.0138 5.51472 13.0138 8ZM14.5138 8C14.5138 11.3137 11.8275 14 8.51376 14C5.20005 14 2.51376 11.3137 2.51376 8C2.51376 4.68629 5.20005 2 8.51376 2C11.8275 2 14.5138 4.68629 14.5138 8ZM9.26376 5.75V5H7.76376V5.75V8V8.75H9.26376V8V5.75Z"
        fill="currentColor"
      />
    </svg>
  );
}
