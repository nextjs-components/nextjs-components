"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function BrowserSafari({
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
        d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM12.5925 3.40746L8.75908 4.93074L6.01936 6.0194L4.9307 8.75912L3.40742 12.5926L7.24089 11.0693L9.9806 9.98064L11.0693 7.24092L12.5925 3.40746ZM9.25 7.99999C9.25 8.69035 8.69036 9.24999 8 9.24999C7.30964 9.24999 6.75 8.69035 6.75 7.99999C6.75 7.30964 7.30964 6.74999 8 6.74999C8.69036 6.74999 9.25 7.30964 9.25 7.99999Z"
        fill="currentColor"
      />
    </svg>
  );
}
