"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function AcronymJpg({
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
        d="M2.5 2.25H17.5C18.1904 2.25 18.75 2.80964 18.75 3.5V12.5C18.75 13.1904 18.1904 13.75 17.5 13.75H2.5C1.80964 13.75 1.25 13.1904 1.25 12.5V3.5C1.25 2.80964 1.80964 2.25 2.5 2.25ZM0 3.5C0 2.11929 1.11929 1 2.5 1H17.5C18.8807 1 20 2.11929 20 3.5V12.5C20 13.8807 18.8807 15 17.5 15H2.5C1.11929 15 0 13.8807 0 12.5V3.5ZM5 9.125V5H6.5V9.125C6.5 10.1605 5.66053 11 4.625 11C3.58947 11 2.75 10.1605 2.75 9.125V8.75H4.25V9.125C4.25 9.33211 4.41789 9.5 4.625 9.5C4.83211 9.5 5 9.33211 5 9.125ZM9.25 9V11H7.75V9V8.25V5.75V5H8.5H9.25H10C10.9665 5 11.75 5.7835 11.75 6.75V7.25C11.75 8.2165 10.9665 9 10 9H9.25ZM9.25 7.5H10C10.1381 7.5 10.25 7.38807 10.25 7.25V6.75C10.25 6.61193 10.1381 6.5 10 6.5H9.25V7.5ZM14.75 5C13.5074 5 12.5 6.00736 12.5 7.25V8.75C12.5 9.99264 13.5074 11 14.75 11H16C16.6904 11 17.25 10.4404 17.25 9.75V9.25C17.25 8.55964 16.6904 8 16 8H15.25V9.5H14.75C14.3358 9.5 14 9.16421 14 8.75V7.25C14 6.83579 14.3358 6.5 14.75 6.5H15.25C15.5261 6.5 15.75 6.72386 15.75 7H17.25C17.25 5.89543 16.3546 5 15.25 5H14.75Z"
        fill="currentColor"
      />
    </svg>
  );
}
