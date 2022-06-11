import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

const Info = ({ color = "currentcolor", size }: Props) => {
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
      <circle cx="12" cy="12" r="10" fill="var(--geist-fill)" />
      <path d="M12 16v-4" stroke="var(--geist-stroke)" />
      <path d="M12 8h.01" stroke="var(--geist-stroke)" />
    </svg>
  );
};

export default Info;
