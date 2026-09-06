"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function CornerDownRight({
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
        d="M2.5 3V2.25H1V3V9.25C1 10.2165 1.7835 11 2.75 11H12.4393L10.4697 12.9697L9.93934 13.5L11 14.5607L11.5303 14.0303L14.7803 10.7803C15.0732 10.4874 15.0732 10.0126 14.7803 9.71967L11.5303 6.46967L11 5.93934L9.93934 7L10.4697 7.53033L12.4393 9.5H2.75C2.61193 9.5 2.5 9.38807 2.5 9.25V3Z"
        fill="currentColor"
      />
    </svg>
  );
}
