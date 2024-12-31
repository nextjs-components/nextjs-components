"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function BlendMode({
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
        d="M9.9923 9.9923C9.91219 9.99741 9.8314 10 9.75 10C7.67893 10 6 8.32107 6 6.25C6 6.1686 6.00259 6.08781 6.0077 6.0077C6.08781 6.0026 6.1686 6 6.25 6C8.32107 6 10 7.67893 10 9.75C10 9.8314 9.99741 9.91219 9.9923 9.9923ZM11.4969 9.56909C11.4036 6.81342 9.18658 4.59637 6.43091 4.50306C7.05913 3.31194 8.30974 2.5 9.75 2.5C11.8211 2.5 13.5 4.17893 13.5 6.25C13.5 7.69026 12.6881 8.94087 11.4969 9.56909ZM11.2751 11.2751C13.4308 10.6217 15 8.61909 15 6.25C15 3.35051 12.6495 1 9.75 1C7.38091 1 5.37832 2.56921 4.72494 4.72494C2.56921 5.37832 1 7.38091 1 9.75C1 12.6495 3.35051 15 6.25 15C8.61909 15 10.6217 13.4308 11.2751 11.2751ZM9.56909 11.4969C6.81342 11.4036 4.59637 9.18658 4.50306 6.43091C3.31194 7.05913 2.5 8.30974 2.5 9.75C2.5 11.8211 4.17893 13.5 6.25 13.5C7.69026 13.5 8.94087 12.6881 9.56909 11.4969Z"
        fill="currentColor"
      />
    </svg>
  );
}
