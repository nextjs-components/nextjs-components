"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function CanaryBird({
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
        d="M7.50008 6.59197L7.06075 7.03131L4.30811 9.78395C5.10528 10.7976 6.43586 11.5 8.00001 11.5C10.6108 11.5 12.5 9.58894 12.5 7.5L12.5 6L12.5 4.98248C12.4906 3.60983 11.375 2.5 10.0001 2.5C8.61937 2.5 7.50008 3.61929 7.50008 5V5.97065V6.59197ZM13.8741 4C13.43 2.27477 11.8639 1 10.0001 1C7.79095 1 6.00008 2.79086 6.00008 5V5.96858L0.0596924 11.909L1.12036 12.9697L3.24058 10.8494C4.33746 12.1572 6.06137 13 8.00001 13H8.00003V15H9.50003V12.8267C12.0879 12.2161 14 10.0628 14 7.5H14.0001V6.99991L16 4H13.8741ZM10 6C10.5523 6 11 5.55228 11 5C11 4.44772 10.5523 4 10 4C9.44774 4 9.00003 4.44772 9.00003 5C9.00003 5.55228 9.44774 6 10 6Z"
        fill="currentColor"
      />
    </svg>
  );
}
