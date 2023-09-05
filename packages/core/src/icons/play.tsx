"use client";

import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function Play({
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
      <polygon points="5 3 19 12 5 21 5 3" fill="var(--geist-fill)"></polygon>
    </svg>
  );
}
