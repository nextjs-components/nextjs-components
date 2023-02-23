import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function WifiOff({
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
      <path d="M1 1l22 22"></path>
      <path d="M16.72 11.06A10.94 10.94 0 0119 12.55"></path>
      <path d="M5 12.55a10.94 10.94 0 015.17-2.39"></path>
      <path d="M10.71 5.05A16 16 0 0122.58 9"></path>
      <path d="M1.42 9a15.91 15.91 0 014.7-2.88"></path>
      <path d="M8.53 16.11a6 6 0 016.95 0"></path>
      <path d="M12 20h.01"></path>
    </svg>
  );
}
