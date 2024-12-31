"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function MagnifyingGlassMinus({
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
        d="M6.5 1.5C3.73858 1.5 1.5 3.73858 1.5 6.5C1.5 9.26142 3.73858 11.5 6.5 11.5C9.26142 11.5 11.5 9.26142 11.5 6.5C11.5 3.73858 9.26142 1.5 6.5 1.5ZM0 6.5C0 2.91015 2.91015 0 6.5 0C10.0899 0 13 2.91015 13 6.5C13 8.02469 12.475 9.42677 11.596 10.5353L15.0303 13.9697L15.5607 14.5L14.5 15.5607L13.9697 15.0303L10.5353 11.596C9.42677 12.475 8.02469 13 6.5 13C2.91015 13 0 10.0899 0 6.5ZM4.75 5.875H4.125V7.125H4.75H8.25H8.875V5.875H8.25H4.75Z"
        fill="currentColor"
      />
    </svg>
  );
}
