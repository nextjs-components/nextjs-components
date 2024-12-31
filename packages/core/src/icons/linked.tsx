"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Linked({
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
        d="M4.25 1.5C1.90279 1.5 0 3.40279 0 5.75C0 6.78972 0.374315 7.74397 0.994693 8.48243L2.14319 7.51757C1.74136 7.03926 1.5 6.42379 1.5 5.75C1.5 4.23122 2.73122 3 4.25 3H8.5C10.0188 3 11.25 4.23122 11.25 5.75C11.25 7.26878 10.0188 8.5 8.5 8.5V10C10.8472 10 12.75 8.09721 12.75 5.75C12.75 3.40279 10.8472 1.5 8.5 1.5H4.25ZM11.75 13L7.5 13C5.98122 13 4.75 11.7688 4.75 10.25C4.75 8.73122 5.98122 7.5 7.5 7.5V6C5.15279 6 3.25 7.90279 3.25 10.25C3.25 12.5972 5.15279 14.5 7.5 14.5L11.75 14.5C14.0972 14.5 16 12.5972 16 10.25C16 9.21028 15.6257 8.25603 15.0053 7.51757L13.8568 8.48243C14.2586 8.96074 14.5 9.57621 14.5 10.25C14.5 11.7688 13.2688 13 11.75 13Z"
        fill="currentColor"
      />
    </svg>
  );
}
