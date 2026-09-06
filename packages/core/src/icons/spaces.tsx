"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Spaces({
  color = "currentcolor",
  size,
  ...props
}: Props) {
  const iconSize = useIconSize();
  const height = size || iconSize.size;
  const width = size || iconSize.size;
  const style = { color, ...props.style };
  return (
    <svg
      {...props}
      data-testid="geist-icon"
      height={height}
      strokeLinejoin="round"
      style={style}
      viewBox="0 0 16 16"
      width={width}
    >
      <path
        d="M12.7421 5.77649C12.7473 5.685 12.75 5.59281 12.75 5.5C12.75 2.87665 10.6234 0.75 8 0.75C5.37665 0.75 3.25 2.87665 3.25 5.5C3.25 8.12335 5.37665 10.25 8 10.25C8.76247 10.25 9.48297 10.0704 10.1215 9.75107"
        stroke="currentColor"
        fill="transparent"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.26165 6.30945C1.76685 7.10954 0.75 8.68605 0.75 10.5001C0.75 13.1234 2.87665 15.2501 5.5 15.2501C8.12335 15.2501 10.25 13.1234 10.25 10.5001C10.25 8.79399 9.35056 7.298 8 6.46041"
        stroke="currentColor"
        fill="transparent"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.85547 9.5C6.31469 7.35683 8.21971 5.75 10.5 5.75C13.1234 5.75 15.25 7.87665 15.25 10.5C15.25 13.1234 13.1234 15.25 10.5 15.25C9.58272 15.25 8.72615 14.99 8 14.5396"
        stroke="currentColor"
        fill="transparent"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
