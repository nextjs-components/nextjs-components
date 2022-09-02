import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

const ArrowUpRight = ({ color = "currentcolor", size }: Props) => {
  const iconSize = useIconSize();

  return (
    <svg
      fill="none"
      width={size || iconSize.size}
      height={size || iconSize.size}
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      style={{ color }}
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
};

export default ArrowUpRight;
