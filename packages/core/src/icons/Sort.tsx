import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";

const Sort = ({ color = "currentcolor" }) => {
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
      <path d="M15 18H3M21 6H3M17 12H3" />
    </svg>
  );
};

export default Sort;
