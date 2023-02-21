import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function CheckInCircleFill({
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
      <path
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
        fill="var(--geist-fill)"
        stroke="var(--geist-fill)"
      ></path>
      <path
        d="M8 11.8571L10.5 14.3572L15.8572 9"
        fill="none"
        stroke="var(--geist-stroke)"
      ></path>
    </svg>
  );
}
