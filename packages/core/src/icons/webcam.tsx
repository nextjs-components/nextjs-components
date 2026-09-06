"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Webcam({
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
        d="M2.25 2C1.00736 2 0 3.00736 0 4.25V11.75C0 12.9926 1.00736 14 2.25 14H10.75H11.5V13.25V11.375L14.5 13.125L16 14V12.2634V3.73656V2L14.5 2.875L11.5 4.625V2.75V2H10.75H2.25ZM11.5 6.36156V9.63844L14.5 11.3884V4.61156L11.5 6.36156ZM10 5.5V3.5H2.25C1.83579 3.5 1.5 3.83579 1.5 4.25V11.75C1.5 12.1642 1.83579 12.5 2.25 12.5H10V10.5V5.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
