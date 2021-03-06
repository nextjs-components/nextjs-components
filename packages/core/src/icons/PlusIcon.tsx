import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

const PlusIcon = ({ color = "currentcolor", size }: Props) => {
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
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
};

export default PlusIcon;
