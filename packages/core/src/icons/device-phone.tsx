"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function DevicePhone({
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
        d="M5.25 0C3.73122 0 2.5 1.23122 2.5 2.75V13.25C2.5 14.7688 3.73122 16 5.25 16H10.75C12.2688 16 13.5 14.7688 13.5 13.25V2.75C13.5 1.23122 12.2688 0 10.75 0H5.25ZM4 2.75C4 2.05964 4.55964 1.5 5.25 1.5H10.75C11.4404 1.5 12 2.05964 12 2.75V13.25C12 13.9404 11.4404 14.5 10.75 14.5H5.25C4.55964 14.5 4 13.9404 4 13.25V2.75ZM6.25 4.75C6.80228 4.75 7.25 4.30228 7.25 3.75C7.25 3.19772 6.80228 2.75 6.25 2.75C5.69772 2.75 5.25 3.19772 5.25 3.75C5.25 4.30228 5.69772 4.75 6.25 4.75Z"
        fill="currentColor"
      />
    </svg>
  );
}
