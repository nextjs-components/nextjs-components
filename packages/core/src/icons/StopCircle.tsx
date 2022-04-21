import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

const StopCircle = ({ color = "currentcolor", size }: Props) => {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M9 9h6v6H9z" />
    </svg>
  );
};

export default StopCircle;
