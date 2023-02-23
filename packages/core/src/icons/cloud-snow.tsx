import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function CloudSnow({
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
      <path d="M20 17.58A5 5 0 0018 8h-1.26A8 8 0 104 16.25"></path>
      <path d="M8 16h.01"></path>
      <path d="M8 20h.01"></path>
      <path d="M12 18h.01"></path>
      <path d="M12 22h.01"></path>
      <path d="M16 16h.01"></path>
      <path d="M16 20h.01"></path>
    </svg>
  );
}
