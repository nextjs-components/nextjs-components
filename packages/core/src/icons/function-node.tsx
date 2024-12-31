"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function FunctionNode({
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
      <g clipPath="url(#clip0_1534_28976)">
        <path
          d="M15.25 8V2.25C15.25 1.42157 14.5784 0.75 13.75 0.75H2.25C1.42157 0.75 0.75 1.42157 0.75 2.25V13.75C0.75 14.5784 1.42157 15.25 2.25 15.25H8"
          stroke="currentColor"
          style={{ stroke: "currentColor", strokeOpacity: "1" }}
          strokeWidth={1.5}
          fill="transparent"
        />
        <path
          d="M9.24618 4.25V4.25C8.00565 4.25 7 5.25565 7 6.49618L7 9.50439C7 10.7446 5.99461 11.75 4.75439 11.75V11.75"
          stroke="currentColor"
          style={{ stroke: "currentColor", strokeOpacity: "1" }}
          strokeWidth={1.5}
          strokeLinecap="square"
        />
        <path
          d="M5.25 7.75H8.75"
          stroke="currentColor"
          style={{ stroke: "currentColor", strokeOpacity: "1" }}
          strokeWidth={1.5}
          strokeLinecap="square"
        />
        <path
          d="M13 9L16 10.75V14.25L13 16L10 14.25V10.75L13 9Z"
          fill="#46A758"
          style={{
            fill: "#46a758",
            fillOpacity: "1",
          }}
        />
      </g>
    </svg>
  );
}
