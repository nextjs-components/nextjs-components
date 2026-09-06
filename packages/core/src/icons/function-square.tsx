"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function FunctionSquare({
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
        d="M0 2.25C0 1.00736 1.00736 0 2.25 0H13.75C14.9926 0 16 1.00736 16 2.25V13.75C16 14.9926 14.9926 16 13.75 16H2.25C1.00736 16 0 14.9926 0 13.75V2.25ZM2.25 1.5C1.83579 1.5 1.5 1.83579 1.5 2.25V13.75C1.5 14.1642 1.83579 14.5 2.25 14.5H13.75C14.1642 14.5 14.5 14.1642 14.5 13.75V2.25C14.5 1.83579 14.1642 1.5 13.75 1.5H2.25ZM10.2462 5C9.41986 5 8.75 5.66986 8.75 6.49618V7H9.75H10.5V8.5H9.75H8.75V9.50439C8.75 11.1588 7.40882 12.5 5.75439 12.5H5.00439V11H5.75439C6.58039 11 7.25 10.3304 7.25 9.50439V8.5H6.25H5.5V7H6.25H7.25V6.49618C7.25 4.84144 8.59144 3.5 10.2462 3.5H10.9962V5H10.2462Z"
        fill="currentColor"
      />
    </svg>
  );
}
