import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function VercelTriangle({
  color = "currentcolor",
  size,
}: Props) {
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
      <path
        clip-rule="evenodd"
        d="M12 3 2 19h20L12 3Z"
        strokeWidth="1.5"
      ></path>
    </svg>
  );
}
