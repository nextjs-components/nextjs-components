import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function Aperture({
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
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M14.31 8l5.74 9.94"></path>
      <path d="M9.69 8h11.48"></path>
      <path d="M7.38 12l5.74-9.94"></path>
      <path d="M9.69 16L3.95 6.06"></path>
      <path d="M14.31 16H2.83"></path>
      <path d="M16.62 12l-5.74 9.94"></path>
    </svg>
  );
}
