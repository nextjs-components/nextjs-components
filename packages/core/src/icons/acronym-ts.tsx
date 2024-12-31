"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function AcronymTs({
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 2.5C0 1.11929 1.11929 0 2.5 0H13.5C14.8807 0 16 1.11929 16 2.5V13.5C16 14.8807 14.8807 16 13.5 16H2.5C1.11929 16 0 14.8807 0 13.5V2.5ZM12.125 9.5C11.9179 9.5 11.75 9.66789 11.75 9.875C11.75 10.0821 11.9179 10.25 12.125 10.25C13.1605 10.25 14 11.0895 14 12.125C14 13.1605 13.1605 14 12.125 14H10.5V12.5H12.125C12.3321 12.5 12.5 12.3321 12.5 12.125C12.5 11.9179 12.3321 11.75 12.125 11.75C11.0895 11.75 10.25 10.9105 10.25 9.875C10.25 8.83947 11.0895 8 12.125 8H13.5V9.5H12.125ZM5 9.5H6.25V14H7.75V9.5H9V8H7H5V9.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
