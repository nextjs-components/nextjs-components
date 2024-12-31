"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Question({
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
        d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM9 11C9 11.5523 8.55229 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55229 10 9 10.4477 9 11ZM7.09584 5.82182C7.25716 5.48223 7.6022 5.25 7.99999 5.25C8.55227 5.25 8.99999 5.69772 8.99999 6.25C8.99999 6.75329 8.62748 7.17086 8.14337 7.23989C7.70367 7.3026 7.24999 7.67511 7.24999 8.25V8.5V9.25H8.74999V8.63535C9.76443 8.31661 10.5 7.36971 10.5 6.25C10.5 4.86929 9.3807 3.75 7.99999 3.75C7.00158 3.75 6.14136 4.3353 5.74095 5.17818L5.41913 5.85563L6.77402 6.49926L7.09584 5.82182Z"
        fill="currentColor"
      />
    </svg>
  );
}
