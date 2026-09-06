"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Pin({ color = "currentcolor", size, ...props }: Props) {
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
        d="M6.81065 1.24999L6.28032 1.78032L5.78489 2.27575L13.1824 5.75693L13.7197 5.21966L14.25 4.68933L15.3107 5.74999L14.7803 6.28032L11.0607 9.99999L15.2803 14.2197L15.8107 14.75L14.75 15.8107L14.2197 15.2803L9.99999 11.0607L6.28032 14.7803L5.74999 15.3107L4.68933 14.25L5.21966 13.7197L5.75693 13.1824L2.27575 5.78489L1.78032 6.28032L1.24999 6.81065L0.189331 5.74999L0.719661 5.21966L1.95737 3.98195C1.96537 3.97357 1.97358 3.96535 1.982 3.95732L3.95732 1.982C3.96535 1.97358 3.97357 1.96537 3.98195 1.95737L5.21966 0.719661L5.74999 0.189331L6.81065 1.24999ZM4.65759 3.40305L3.40305 4.65759L6.88423 12.0551L8.93933 9.99999L9.99999 8.93933L12.0551 6.88423L4.65759 3.40305Z"
        fill="currentColor"
      />
    </svg>
  );
}
