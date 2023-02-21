import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function RotateCw({ color = "currentcolor", size }: Props) {
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
      <path d="M23 4v6h-6"></path>
      <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"></path>
    </svg>
  );
}
