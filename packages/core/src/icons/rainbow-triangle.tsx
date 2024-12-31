"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function RainbowTriangle({
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
        d="M9 7L12.5 2.5"
        stroke="#E5484D"
        style={{
          stroke: "#e5484d",
          stroke: "color(display-p3 0.898 0.2824 0.302)",
          strokeOpacity: "1",
        }}
        strokeWidth={1.5}
      />
      <path
        d="M10.5 9.5L15.75 10.5"
        stroke="#52AEFF"
        style={{
          stroke: "#52aeff",
          stroke: "color(display-p3 0.3216 0.6824 1)",
          strokeOpacity: "1",
        }}
        strokeWidth={1.5}
      />
      <path
        d="M10 8L15.75 6"
        stroke="#45DEC4"
        style={{
          stroke: "#45dec4",
          stroke: "color(display-p3 0.2706 0.8706 0.7686)",
          strokeOpacity: "1",
        }}
        strokeWidth={1.5}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.14568 3.56625L7 2L7.85432 3.56625L12.1818 11.5L13 13H11.2914H2.70863H1L1.81818 11.5L3.31818 8.75H0V7.25H4.13636L6.14568 3.56625ZM3.52681 11.5L7 5.13249L10.4732 11.5H3.52681Z"
        fill="currentColor"
      />
    </svg>
  );
}
