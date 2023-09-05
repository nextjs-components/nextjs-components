"use client";

import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function DownloadCloud({
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
      <path d="M8 17l4 4 4-4"></path>
      <path d="M12 12v9"></path>
      <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"></path>
    </svg>
  );
}
