import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function ZapOff({
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
      <path d="M12.41 6.75L13 2l-2.43 2.92"></path>
      <path d="M18.57 12.91L21 10h-5.34"></path>
      <path d="M8 8l-5 6h9l-1 8 5-6"></path>
      <path d="M1 1l22 22"></path>
    </svg>
  );
}
