"use client";

import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function CornerRightDown({
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
      <path d="M10 15l5 5 5-5"></path>
      <path d="M4 4h7a4 4 0 014 4v12"></path>
    </svg>
  );
}
