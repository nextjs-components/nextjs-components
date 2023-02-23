import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function Repeat({
  color = "currentcolor",
  size,
  ...props
}: Props) {
  const iconSize = useIconSize();
  return (
    <svg
      {...props}
      fill="none"
      height={size || iconSize.size}
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width={size || iconSize.size}
      style={{ ...props.style, color }}
    >
      <path d="M17 1l4 4-4 4"></path>
      <path d="M3 11V9a4 4 0 014-4h14"></path>
      <path d="M7 23l-4-4 4-4"></path>
      <path d="M21 13v2a4 4 0 01-4 4H3"></path>
    </svg>
  );
}
