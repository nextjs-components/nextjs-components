import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function Layout({ color = "currentcolor", size }: Props) {
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
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <path d="M3 9h18"></path>
      <path d="M9 21V9"></path>
    </svg>
  );
}
