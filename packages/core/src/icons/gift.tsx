import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function Gift({
  color = "currentcolor",
  size,
  ...props
}: Props) {
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
      <path d="M20 12v10H4V12"></path>
      <path d="M2 7h20v5H2z"></path>
      <path d="M12 22V7"></path>
      <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"></path>
      <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"></path>
    </svg>
  );
}
