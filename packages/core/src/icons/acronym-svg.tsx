"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function AcronymSvg({
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
      style={{ width: 20, color: "currentColor" }}
      viewBox="0 0 20 16"
      width={width}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5 2.25H17.5C18.1904 2.25 18.75 2.80964 18.75 3.5V12.5C18.75 13.1904 18.1904 13.75 17.5 13.75H2.5C1.80964 13.75 1.25 13.1904 1.25 12.5V3.5C1.25 2.80964 1.80964 2.25 2.5 2.25ZM0 3.5C0 2.11929 1.11929 1 2.5 1H17.5C18.8807 1 20 2.11929 20 3.5V12.5C20 13.8807 18.8807 15 17.5 15H2.5C1.11929 15 0 13.8807 0 12.5V3.5ZM4.25 6.875C4.25 6.66789 4.41789 6.5 4.625 6.5H6V5H4.625C3.58947 5 2.75 5.83947 2.75 6.875C2.75 7.91053 3.58947 8.75 4.625 8.75C4.83211 8.75 5 8.91789 5 9.125C5 9.33211 4.83211 9.5 4.625 9.5H3V11H4.625C5.66053 11 6.5 10.1605 6.5 9.125C6.5 8.08947 5.66053 7.25 4.625 7.25C4.41789 7.25 4.25 7.08211 4.25 6.875ZM9 5V8.58579C9 8.65209 9.02634 8.71568 9.07322 8.76256L9.5 9.18934L9.92678 8.76256C9.97366 8.71568 10 8.65209 10 8.58579V5H11.5V8.58579C11.5 9.04992 11.3156 9.49504 10.9874 9.82322L10.0303 10.7803L9.5 11.3107L8.96967 10.7803L8.01256 9.82322C7.68437 9.49503 7.5 9.04992 7.5 8.58579V5H9ZM14.75 5C13.5074 5 12.5 6.00736 12.5 7.25V8.75C12.5 9.99264 13.5074 11 14.75 11H16C16.6904 11 17.25 10.4404 17.25 9.75V9.25C17.25 8.55964 16.6904 8 16 8H15.25V9.5H14.75C14.3358 9.5 14 9.16421 14 8.75V7.25C14 6.83579 14.3358 6.5 14.75 6.5H15.25C15.5261 6.5 15.75 6.72386 15.75 7H17.25C17.25 5.89543 16.3546 5 15.25 5H14.75Z"
        fill="currentColor"
      />
    </svg>
  );
}
