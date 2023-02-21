import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function Wifi({
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
      <path d="M5 12.55a11 11 0 0114.08 0"></path>
      <path d="M1.42 9a16 16 0 0121.16 0"></path>
      <path d="M8.53 16.11a6 6 0 016.95 0"></path>
      <path d="M12 20h.01"></path>
    </svg>
  );
}
