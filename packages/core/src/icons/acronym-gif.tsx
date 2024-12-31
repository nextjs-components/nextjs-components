"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function AcronymGif({
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
        d="M2.5 2.25H17.5C18.1904 2.25 18.75 2.80964 18.75 3.5V12.5C18.75 13.1904 18.1904 13.75 17.5 13.75H2.5C1.80964 13.75 1.25 13.1904 1.25 12.5V3.5C1.25 2.80964 1.80964 2.25 2.5 2.25ZM0 3.5C0 2.11929 1.11929 1 2.5 1H17.5C18.8807 1 20 2.11929 20 3.5V12.5C20 13.8807 18.8807 15 17.5 15H2.5C1.11929 15 0 13.8807 0 12.5V3.5ZM6 5C4.75736 5 3.75 6.00736 3.75 7.25V8.75C3.75 9.99264 4.75736 11 6 11H7.25C7.94036 11 8.5 10.4404 8.5 9.75V9.25C8.5 8.55964 7.94036 8 7.25 8H6.5V9.5H6C5.58579 9.5 5.25 9.16421 5.25 8.75V7.25C5.25 6.83579 5.58579 6.5 6 6.5H6.5C6.77614 6.5 7 6.72386 7 7H8.5C8.5 5.89543 7.60457 5 6.5 5H6ZM11.25 11H9.75V5H11.25V11ZM13.25 5H12.5V5.75V8.25V11H14V9H16.5V7.5H14V6.5H16.5V5H13.25Z"
        fill="currentColor"
      />
    </svg>
  );
}
