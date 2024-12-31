"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Lifebuoy({
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
        d="M14.5 8C14.5 9.1074 14.2231 10.1501 13.7347 11.0627L11.3449 9.69707C11.604 9.1875 11.75 8.6108 11.75 8C11.75 7.38919 11.604 6.8125 11.3449 6.30291L13.7347 4.93732C14.2231 5.84989 14.5 6.8926 14.5 8ZM11.0627 2.26531C10.1501 1.77693 9.1074 1.5 8 1.5C6.8926 1.5 5.84988 1.77693 4.93732 2.26531L6.30291 4.65509C6.81249 4.39603 7.38919 4.25 8 4.25C8.61081 4.25 9.1875 4.39603 9.69709 4.65509L11.0627 2.26531ZM9.69711 11.3449L11.0627 13.7347C10.1501 14.2231 9.1074 14.5 8 14.5C6.8926 14.5 5.84988 14.2231 4.93732 13.7347L6.30291 11.3449C6.81249 11.604 7.38919 11.75 8 11.75C8.61082 11.75 9.18752 11.604 9.69711 11.3449ZM4.65509 9.69709C4.39603 9.18751 4.25 8.61081 4.25 8C4.25 7.38919 4.39603 6.81249 4.65509 6.30291L2.26531 4.93732C1.77693 5.84988 1.5 6.8926 1.5 8C1.5 9.1074 1.77693 10.1501 2.26532 11.0627L4.65509 9.69709ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM10.5 8C10.5 9.38071 9.38071 10.5 8 10.5C6.61929 10.5 5.5 9.38071 5.5 8C5.5 6.61929 6.61929 5.5 8 5.5C9.38071 5.5 10.5 6.61929 10.5 8Z"
        fill="currentColor"
      />
    </svg>
  );
}
