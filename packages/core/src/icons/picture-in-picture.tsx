"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function PictureInPicture({
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
        d="M6.75 13.5H1.5V2.5H14.5V6.75V7.5H16V6.75V2C16 1.44772 15.5523 1 15 1H1C0.447714 1 0 1.44772 0 2V14C0 14.5523 0.447716 15 1 15H6.75H7.5V13.5H6.75ZM10.5 10.5H14.5V13.5H10.5V10.5ZM9 9H10.5H14.5H16V10.5V13.5V15H14.5H10.5H9V13.5V10.5V9Z"
        fill="currentColor"
      />
    </svg>
  );
}
