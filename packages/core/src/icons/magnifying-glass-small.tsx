"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function MagnifyingGlassSmall({
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
        d="M3.5 7C3.5 5.067 5.067 3.5 7 3.5C8.933 3.5 10.5 5.067 10.5 7C10.5 7.88461 10.1718 8.69256 9.63058 9.30876L9.30876 9.63058C8.69256 10.1718 7.88461 10.5 7 10.5C5.067 10.5 3.5 8.933 3.5 7ZM9.96544 11.0261C9.13578 11.6382 8.11014 12 7 12C4.23858 12 2 9.76142 2 7C2 4.23858 4.23858 2 7 2C9.76142 2 12 4.23858 12 7C12 8.11014 11.6382 9.13578 11.0261 9.96544L14.0303 12.9697L14.5607 13.5L13.5 14.5607L12.9697 14.0303L9.96544 11.0261Z"
        fill="currentColor"
      />
    </svg>
  );
}
