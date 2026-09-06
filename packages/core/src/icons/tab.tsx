"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Tab({ color = "currentcolor", size, ...props }: Props) {
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
        d="M16 0.75V0H14.5V0.75V15.25V16H16V15.25V0.75ZM7.53033 3.21967L7 2.68934L5.93934 3.75L6.46967 4.28033L9.43934 7.25H0.75H0V8.75H0.75H9.43934L6.46967 11.7197L5.93934 12.25L7 13.3107L7.53033 12.7803L11.7803 8.53033C12.0732 8.23744 12.0732 7.76256 11.7803 7.46967L7.53033 3.21967Z"
        fill="currentColor"
      />
    </svg>
  );
}
