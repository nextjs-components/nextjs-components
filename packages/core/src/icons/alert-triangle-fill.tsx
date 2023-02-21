import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function AlertTriangleFill({
  color = "currentcolor",
  size,
}: Props) {
  const iconSize = useIconSize();
  return (
    <svg
      height={size || iconSize.size}
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width={size || iconSize.size}
      style={
        {
          color: color,
          "--geist-fill": "currentColor",
          "--geist-stroke": "var(--geist-background)",
        } as React.CSSProperties
      }
    >
      <path
        d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        fill="var(--geist-fill)"
      ></path>
      <path d="M12 9v4" stroke="var(--geist-stroke)"></path>
      <path d="M12 17h.01" stroke="var(--geist-stroke)"></path>
    </svg>
  );
}
