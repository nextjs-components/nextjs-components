import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function ArrowDownLeft({ color = "currentcolor", size }: Props) {
  const iconSize = useIconSize();
  return (
    <svg
      fill="none"
      height={size || iconSize.size}
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width={size || iconSize.size}
      style={{ color }}
    >
      <path d="M17 7L7 17"></path>
      <path d="M17 17H7V7"></path>
    </svg>
  );
}
