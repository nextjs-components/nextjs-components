import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function AlertCircleFill({
  color = "currentcolor",
  size,
}: Props) {
  const iconSize = useIconSize();
  return (
    <svg
      width={size || iconSize.size}
      height={size || iconSize.size}
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      style={
        {
          color: color,
          "--geist-fill": "currentColor",
          "--geist-stroke": "var(--geist-background)",
        } as React.CSSProperties
      }
    >
      <circle cx="12" cy="12" r="10" fill="var(--geist-fill)"></circle>
      <path d="M12 8v4" stroke="var(--geist-stroke)"></path>
      <path d="M12 16h.01" stroke="var(--geist-stroke)"></path>
    </svg>
  );
}
