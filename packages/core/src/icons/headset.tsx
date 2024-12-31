"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Headset({
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
        d="M8 1C4.13401 1 1 4.13401 1 8V11H1.75H2.5H3.25C4.35457 11 5.25 10.1046 5.25 9V8.25C5.25 7.14543 4.35457 6.25 3.25 6.25H2.78426C3.51526 4.0704 5.57424 2.5 8 2.5C10.4258 2.5 12.4847 4.0704 13.2157 6.25H12.75C11.6454 6.25 10.75 7.14543 10.75 8.25V9C10.75 10.1046 11.6454 11 12.75 11H13.5C13.5 12.3807 12.3807 13.5 11 13.5H10V13C10 12.4477 9.55229 12 9 12H7C6.44772 12 6 12.4477 6 13V14C6 14.5523 6.44772 15 7 15H9H10H11C13.2091 15 15 13.2091 15 11V8C15 4.13401 11.866 1 8 1ZM12.75 7.75H13.4944C13.4981 7.83287 13.5 7.91622 13.5 8V9.5H12.75C12.4739 9.5 12.25 9.27614 12.25 9V8.25C12.25 7.97386 12.4739 7.75 12.75 7.75ZM2.50558 7.75C2.50187 7.83287 2.5 7.91622 2.5 8V9.5H3.25C3.52614 9.5 3.75 9.27614 3.75 9V8.25C3.75 7.97386 3.52614 7.75 3.25 7.75H2.50558Z"
        fill="currentColor"
      />
    </svg>
  );
}
