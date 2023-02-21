import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function ArrowDownCircleFill({
  color = "currentcolor",
  size,
  ...props
}: Props) {
  const iconSize = useIconSize();
  return (
    <svg
      {...props}
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
          ...props.style,
          color: color,
          "--geist-fill": "currentColor",
          "--geist-stroke": "var(--geist-background)",
        } as React.CSSProperties
      }
    >
      <circle cx="12" cy="12" r="10" fill="var(--geist-fill)"></circle>
      <path d="M8 12l4 4 4-4" fill="none" stroke="var(--geist-stroke)"></path>
      <path d="M12 8v8" stroke="var(--geist-stroke)"></path>
    </svg>
  );
}
