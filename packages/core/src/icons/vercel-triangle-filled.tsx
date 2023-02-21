import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function VercelTriangleFilled({
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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 2L2 19.7778H22L12 2Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
      ></path>
    </svg>
  );
}
