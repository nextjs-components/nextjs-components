import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function Cpu({ color = "currentcolor", size, ...props }: Props) {
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
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
      <path d="M9 9h6v6H9z"></path>
      <path d="M9 1v3"></path>
      <path d="M15 1v3"></path>
      <path d="M9 20v3"></path>
      <path d="M15 20v3"></path>
      <path d="M20 9h3"></path>
      <path d="M20 14h3"></path>
      <path d="M1 9h3"></path>
      <path d="M1 14h3"></path>
    </svg>
  );
}
