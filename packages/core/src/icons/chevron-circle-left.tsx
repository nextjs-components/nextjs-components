"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function ChevronCircleLeft({
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
        d="M8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5898 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5ZM16 8C16 3.58172 12.4183 -3.13124e-07 8 -6.99382e-07C3.58172 -1.08564e-06 1.08564e-06 3.58172 6.99382e-07 8C3.13124e-07 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8ZM8.46967 4.71967L5.88938 7.29996C5.50276 7.68658 5.50276 8.31342 5.88938 8.70004L8.46967 11.2803L9 11.8107L10.0607 10.75L9.53033 10.2197L7.31066 8L9.53033 5.78033L10.0607 5.25L9 4.18934L8.46967 4.71967Z"
        fill="currentColor"
      />
    </svg>
  );
}
