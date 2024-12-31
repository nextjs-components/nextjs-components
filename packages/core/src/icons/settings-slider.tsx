"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function SettingsSlider({
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
        d="M5.77348 6.39779L4.75 7.5L3.72652 6.39779L1.76721 4.28776C1.59545 4.10279 1.5 3.85972 1.5 3.60731L1.5 0.999999C1.5 0.447715 1.94772 0 2.5 0H7C7.55229 0 8 0.447715 8 1L8 3.60731C8 3.85972 7.90455 4.1028 7.73279 4.28776L5.77348 6.39779ZM6.5 3.41096L4.75 5.29558L3 3.41096L3 1.5L6.5 1.5V3.41096ZM5.5 9.5V10.25V12L15.25 12H16L16 13.5H15.25L5.5 13.5V15.25V16H4V15.25V13.5L0.750001 13.5H0V12H0.749999L4 12V10.25V9.5H5.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
