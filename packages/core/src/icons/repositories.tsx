"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Repositories({
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
        clipRule="evenodd"
        d="M4.25 0C3.00736 0 2 1.00736 2 2.25V11V11.25V11.5C2 12.5252 2.61705 13.4062 3.5 13.792V11.5V11.25V11C3.5 10.4477 3.94772 10 4.5 10H12.5V11.2305V12.5H10.5V14H12.5H14V12.5V11.2305V10V8.5V0.75V0H13.25H4.25ZM12.5 8.5V1.5H4.25C3.83579 1.5 3.5 1.83579 3.5 2.25V8.70802C3.80623 8.57422 4.14445 8.5 4.5 8.5H12.5ZM5.5 11.5C5.22386 11.5 5 11.7239 5 12V16L7 14.75L9 16V12C9 11.7239 8.77614 11.5 8.5 11.5H5.5Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}
