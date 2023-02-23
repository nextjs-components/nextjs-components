import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function Codepen({
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
      <path d="M12 2l10 6.5v7L12 22 2 15.5v-7L12 2z"></path>
      <path d="M12 22v-6.5"></path>
      <path d="M22 8.5l-10 7-10-7"></path>
      <path d="M2 15.5l10-7 10 7"></path>
      <path d="M12 2v6.5"></path>
    </svg>
  );
}
