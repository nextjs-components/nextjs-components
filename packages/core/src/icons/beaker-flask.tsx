"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function BeakerFlask({
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
        d="M9 7.6736V7V2.5H7V7V7.6736L6.49655 8.12111L4.38279 10L11.6172 10L9.50345 8.12111L9 7.6736ZM5.5 2.5H4V1H5.5H7H9H10.5H12V2.5H10.5V7L14.0735 10.1765C14.6628 10.7003 15 11.4511 15 12.2396C15 13.7641 13.7641 15 12.2396 15H3.7604C2.23587 15 1 13.7641 1 12.2396C1 11.4511 1.33718 10.7003 1.92649 10.1765L5.5 7V2.5ZM2.5 12.2396C2.5 11.9717 2.58527 11.7133 2.7398 11.5L13.2602 11.5C13.4147 11.7133 13.5 11.9717 13.5 12.2396C13.5 12.9357 12.9357 13.5 12.2396 13.5H3.7604C3.0643 13.5 2.5 12.9357 2.5 12.2396Z"
        fill="currentColor"
      />
    </svg>
  );
}
