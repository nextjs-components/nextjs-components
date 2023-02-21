import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function Shuffle({
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
      <path d="M16 3h5v5"></path>
      <path d="M4 20L21 3"></path>
      <path d="M21 16v5h-5"></path>
      <path d="M15 15l6 6"></path>
      <path d="M4 4l5 5"></path>
    </svg>
  );
}
