import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function Sliders({
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
      <path d="M4 21v-7"></path>
      <path d="M4 10V3"></path>
      <path d="M12 21v-9"></path>
      <path d="M12 8V3"></path>
      <path d="M20 21v-5"></path>
      <path d="M20 12V3"></path>
      <path d="M1 14h6"></path>
      <path d="M9 8h6"></path>
      <path d="M17 16h6"></path>
    </svg>
  );
}
