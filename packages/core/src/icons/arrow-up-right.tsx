import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function ArrowUpRight({ color = "currentcolor", size }: Props) {
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
      <path d="M7 17L17 7"></path>
      <path d="M7 7h10v10"></path>
    </svg>
  );
}
