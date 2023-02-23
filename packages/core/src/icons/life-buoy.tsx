import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function LifeBuoy({
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
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M4.93 4.93l4.24 4.24"></path>
      <path d="M14.83 14.83l4.24 4.24"></path>
      <path d="M14.83 9.17l4.24-4.24"></path>
      <path d="M14.83 9.17l3.53-3.53"></path>
      <path d="M4.93 19.07l4.24-4.24"></path>
    </svg>
  );
}
