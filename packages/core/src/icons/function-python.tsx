"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function FunctionPython({
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
      <g clipPath="url(#clip0_1534_28977)">
        <path
          d="M15.25 8V2.25C15.25 1.42157 14.5784 0.75 13.75 0.75H2.25C1.42157 0.75 0.75 1.42157 0.75 2.25V13.75C0.75 14.5784 1.42157 15.25 2.25 15.25H8"
          stroke="currentColor"
          style={{ stroke: "currentColor" }}
          strokeWidth={1.5}
        />
        <path
          d="M9.24618 4.25V4.25C8.00565 4.25 7 5.25565 7 6.49618L7 9.50439C7 10.7446 5.99461 11.75 4.75439 11.75V11.75"
          stroke="currentColor"
          style={{ stroke: "currentColor" }}
          strokeWidth={1.5}
          strokeLinecap="square"
        />
        <path
          d="M5.25 7.75H8.75"
          stroke="currentColor"
          style={{ stroke: "currentColor" }}
          strokeWidth={1.5}
          strokeLinecap="square"
        />
        <path
          d="M14 15C14 15.5523 13.5523 16 13 16L12.5 16C11.9477 16 11.5 15.5523 11.5 15L11.5 13.5C11.5 12.9477 11.9477 12.5 12.5 12.5C13.0523 12.5 13.5 12.0523 13.5 11.5L13.5 11L14.25 11C15.2165 11 16 11.7835 16 12.75C16 13.7165 15.2165 14.5 14.25 14.5L14 14.5L14 15Z"
          fill="#FFC700"
          style={{
            fill: "#ffc700",
            fill: "color(display-p3 1 0.7804 0)",
            fillOpacity: "1",
          }}
        />
        <path
          d="M11 10C11 9.44772 11.4477 9 12 9H12.5C13.0523 9 13.5 9.44772 13.5 10V11.5C13.5 12.0523 13.0523 12.5 12.5 12.5C11.9477 12.5 11.5 12.9477 11.5 13.5V14H10.75C9.7835 14 9 13.2165 9 12.25C9 11.2835 9.7835 10.5 10.75 10.5H11V10Z"
          fill="#338ED8"
          style={{
            fill: "#338ed8",
            fill: "color(display-p3 0.2009 0.5579 0.8458)",
            fillOpacity: "1",
          }}
        />
      </g>
    </svg>
  );
}
