"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function TextTitle({
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
        d="M2.5 0.75C1.94772 0.75 1.5 1.19772 1.5 1.75V2.75V3.5H3V2.75V2.25H7.25V13.5H6.75H6V15H6.75H7.25H8.75H9.25H10V13.5H9.25H8.75V2.25H13.25V2.75V3.5H14.75V2.75V1.75C14.75 1.19771 14.3023 0.75 13.75 0.75H2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
