"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Email({
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
        d="M8 0C3.57757 0 0 3.61682 0 8.03093C0 12.411 3.54999 16 7.9384 16C9.42621 16 10.8841 15.5819 12.1457 14.7934L12.3975 14.636L11.6025 13.364L11.3507 13.5214C10.3275 14.1609 9.14508 14.5 7.9384 14.5C4.38672 14.5 1.5 11.5909 1.5 8.03093C1.5 4.43692 4.4143 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8V8.60714C14.5 9.3764 13.8764 10 13.1071 10C12.2195 10 11.5 9.28046 11.5 8.39286V8V4.5H10V5.12734C9.43308 4.73191 8.74362 4.5 8 4.5C6.067 4.5 4.5 6.067 4.5 8C4.5 9.933 6.067 11.5 8 11.5C9.05713 11.5 10.0048 11.0313 10.6466 10.2904C11.2148 11.0262 12.1056 11.5 13.1071 11.5C14.7048 11.5 16 10.2048 16 8.60714V8C16 3.58172 12.4183 0 8 0ZM10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10C9.10457 10 10 9.10457 10 8Z"
        fill="currentColor"
      />
    </svg>
  );
}
