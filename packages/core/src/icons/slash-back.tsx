"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function SlashBack({
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
        d="M11.9849 15.3939L11.6894 14.7046L5.68942 0.704556L5.39398 0.0151978L4.01526 0.606077L4.3107 1.29544L10.3107 15.2954L10.6061 15.9848L11.9849 15.3939Z"
        fill="currentColor"
      />
    </svg>
  );
}
