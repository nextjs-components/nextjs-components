"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Fulcrum({
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
        d="M15.206 1.72114L15.9272 1.5151L15.5151 0.0728149L14.794 0.278856L0.793958 4.27886L0.0728149 4.4849L0.484897 5.92718L1.20604 5.72114L15.206 1.72114ZM7.11102 5.39697L8 4L8.88898 5.39697L14.0455 13.5L15 15H13.222H2.77796H0.999999L1.95454 13.5L7.11102 5.39697ZM3.73251 13.5L8 6.79394L12.2675 13.5H3.73251Z"
        fill="currentColor"
      />
    </svg>
  );
}
