"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function AsteriskSmall({
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
        d="M7.25 13V10.165C7.25 9.78014 6.83333 9.53957 6.5 9.73202L4.04482 11.1495L3.29482 9.85048L5.74994 8.43302C6.08327 8.24057 6.08327 7.75944 5.74994 7.56699L3.2948 6.14952L4.0448 4.85048L6.5 6.26799C6.83333 6.46044 7.25 6.21988 7.25 5.83498V3H8.75V5.83491C8.75 6.21981 9.16667 6.46037 9.5 6.26792L11.9551 4.85048L12.7051 6.14952L10.2499 7.56699C9.9166 7.75944 9.9166 8.24057 10.2499 8.43302L12.7051 9.85048L11.9551 11.1495L9.5 9.73209C9.16667 9.53964 8.75 9.78021 8.75 10.1651V13H7.25Z"
        fill="currentColor"
      />
    </svg>
  );
}
