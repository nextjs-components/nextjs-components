"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Puzzle({
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
        d="M12.25 14.25V10L12.9212 10.1119C14.1403 10.315 15.25 9.37496 15.25 8.13908V7.86092C15.25 6.62504 14.1403 5.68496 12.9212 5.88813L12.25 6V1.75H8.235L8.30764 2.50382C8.41075 3.57386 7.56957 4.5 6.49457 4.5C5.42349 4.5 4.58361 3.58031 4.68058 2.51362L4.75 1.75H0.75V14.25H12.25Z"
        stroke="currentColor"
        fill="transparent"
        strokeWidth={1.5}
      />
    </svg>
  );
}
