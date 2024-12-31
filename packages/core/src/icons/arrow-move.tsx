"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function ArrowMove({
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
        d="M4.93933 2.99996L7.29288 0.646409C7.6834 0.255885 8.31657 0.255885 8.70709 0.646409L11.0606 2.99996L9.99999 4.06062L8.7501 2.81074V7.24996H13.1894L11.9394 5.99995L13.0001 4.93929L15.3536 7.29285C15.7441 7.68337 15.7441 8.31654 15.3536 8.70706L13.0001 11.0606L11.9394 9.99995L13.1894 8.74996H8.7501V13.1892L9.99999 11.9393L11.0606 13L8.70709 15.3535C8.31657 15.744 7.6834 15.744 7.29288 15.3535L4.93933 13L5.99999 11.9393L7.2501 13.1894V8.74996H2.81069L4.06068 9.99995L3.00002 11.0606L0.64647 8.70706C0.255946 8.31654 0.255946 7.68337 0.64647 7.29285L3.00002 4.93929L4.06068 5.99995L2.81068 7.24996H7.2501V2.81051L5.99999 4.06062L4.93933 2.99996Z"
        fill="currentColor"
      />
    </svg>
  );
}
