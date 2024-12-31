"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function FunctionRuby({
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
        d="M15.7247 11.3855L14.5481 10.0481H10.4519L9.27523 11.3855C8.92446 11.7841 8.94646 12.3874 9.32532 12.7595L12.5 15.8773L15.6746 12.7595C16.0534 12.3874 16.0754 11.7842 15.7247 11.3855Z"
        fill="#CA2A30"
        style={{
          fill: "#ca2a30",
          fillOpacity: "1",
        }}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.466 9.48833C13.6685 9.4926 14.8003 9.91651 14.7972 10.5166C14.794 11.1166 13.7446 11.5332 12.5423 11.5287C11.34 11.5242 10.1983 11.1295 10.2016 10.5296C10.2044 9.92963 11.2637 9.48385 12.466 9.48833Z"
        fill="#F87274"
        style={{
          fill: "#f87274",
          fillOpacity: "1",
        }}
      />
    </svg>
  );
}
