import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function Move({
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
      <path d="M5 9l-3 3 3 3"></path>
      <path d="M9 5l3-3 3 3"></path>
      <path d="M15 19l-3 3-3-3"></path>
      <path d="M19 9l3 3-3 3"></path>
      <path d="M2 12h20"></path>
      <path d="M12 2v20"></path>
    </svg>
  );
}
