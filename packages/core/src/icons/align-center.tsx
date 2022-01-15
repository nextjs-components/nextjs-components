import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";

const AlignCenter = ({ color = "currentcolor" }) => {
  const { size } = useIconSize();
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
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
