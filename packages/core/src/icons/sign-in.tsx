"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function SignIn({
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
        d="M13.5 2.5L9.25 2.5V1H14C14.5523 1 15 1.44771 15 2L15 14C15 14.5523 14.5523 15 14 15H9.25V13.5H13.5L13.5 2.5ZM8.43934 7.24999L6.46967 5.28031L5.93934 4.74998L7 3.68932L7.53033 4.21965L10.6036 7.29288C10.9941 7.6834 10.9941 8.31657 10.6036 8.70709L7.53033 11.7803L7 12.3106L5.93934 11.25L6.46967 10.7197L8.43934 8.74999L1.75 8.74999H1V7.24999H1.75L8.43934 7.24999Z"
        fill="currentColor"
      />
    </svg>
  );
}
