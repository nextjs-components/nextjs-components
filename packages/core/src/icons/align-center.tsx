import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

const AlignCenter = ({ color = "currentcolor", size }: Props) => {
  const iconSize = useIconSize();
  return (
    <svg
      viewBox="0 0 24 24"
      width={size || iconSize.size}
      height={size || iconSize.size}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      style={{ color }}
    >
      <path d="M18 10H6" />
      <path d="M21 6H3" />
      <path d="M21 14H3" />
      <path d="M18 18H6" />
    </svg>
  );
};

export default AlignCenter;
