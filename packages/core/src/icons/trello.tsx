"use client";

import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function Trello({
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
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <path d="M7 7h3v9H7z"></path>
      <path d="M14 7h3v5h-3z"></path>
    </svg>
  );
}
