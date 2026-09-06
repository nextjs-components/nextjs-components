"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function TextUppercase({
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
        d="M2.21981 13.2149L2.72027 11.5043H2.85H6.15H6.27971L6.78016 13.2149L6.86483 13.5043H7.57227H8.4277H9.13514L9.21981 13.2149L9.72027 11.5043H9.85H13.15H13.2797L13.7802 13.2149L13.8648 13.5043H15.4277L15.2198 12.7937L12.2198 2.53943L10.7802 2.53943L7.99999 12.0423L5.21983 2.53943L3.78017 2.53943L0.780159 12.7937L0.572266 13.5043H2.13514L2.21981 13.2149ZM12.7824 9.80429L11.5 5.42105L10.2176 9.80429H12.7824ZM5.78236 9.80429H3.21762L4.5 5.42105L5.78236 9.80429Z"
        fill="currentColor"
      />
    </svg>
  );
}
