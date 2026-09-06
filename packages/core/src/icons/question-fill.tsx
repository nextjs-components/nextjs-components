"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function QuestionFill({
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
        d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM9 11C9 11.5523 8.55229 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55229 10 9 10.4477 9 11ZM7.09586 5.82182C7.25718 5.48223 7.60222 5.25 8 5.25C8.55229 5.25 9 5.69772 9 6.25C9 6.75329 8.6275 7.17086 8.14338 7.23989C7.70369 7.3026 7.25 7.67511 7.25 8.25V8.5V9.25H8.75V8.63535C9.76444 8.31661 10.5 7.36971 10.5 6.25C10.5 4.86929 9.38072 3.75 8 3.75C7.00159 3.75 6.14138 4.3353 5.74097 5.17818L5.41915 5.85563L6.77404 6.49926L7.09586 5.82182Z"
        fill="currentColor"
      />
    </svg>
  );
}
