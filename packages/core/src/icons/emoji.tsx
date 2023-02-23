import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function Emoji({
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
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
      <path d="M7 14.5s0 4 5 4 5-4 5-4" fill="currentColor"></path>
      <path d="M7 14.5s0 4 5 4 5-4 5-4H7z"></path>
      <circle cx="15.5" cy="9.5" r=".75"></circle>
      <circle cx="8.5" cy="9.5" r=".75"></circle>
    </svg>
  );
}
