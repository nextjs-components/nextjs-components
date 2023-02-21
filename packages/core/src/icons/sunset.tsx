import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function Sunset({
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
      <path d="M17 18a5 5 0 00-10 0"></path>
      <path d="M12 9V2"></path>
      <path d="M4.22 10.22l1.42 1.42"></path>
      <path d="M1 18h2"></path>
      <path d="M21 18h2"></path>
      <path d="M18.36 11.64l1.42-1.42"></path>
      <path d="M23 22H1"></path>
      <path d="M16 5l-4 4-4-4"></path>
    </svg>
  );
}
