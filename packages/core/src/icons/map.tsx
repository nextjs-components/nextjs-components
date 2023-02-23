import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function Map({ color = "currentcolor", size, ...props }: Props) {
  const iconSize = useIconSize();
  return (
    <svg
      {...props}
      fill="none"
      height={size || iconSize.size}
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width={size || iconSize.size}
      style={{ ...props.style, color }}
    >
      <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z"></path>
      <path d="M8 2v16"></path>
      <path d="M16 6v16"></path>
    </svg>
  );
}
