import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

const AlertCircle = ({ color = "currentColor", size }: Props) => {
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
      <circle cx="12" cy="12" r="10" fill="var(--geist-fill)" />
      <path d="M12 8v4" stroke="var(--geist-stroke)" />
      <path d="M12 16h.01" stroke="var(--geist-stroke)" />
    </svg>
  );
};

export default AlertCircle;
