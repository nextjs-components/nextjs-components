"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function GitBranch({
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
        d="M4.75 1.75V1H3.25V1.75V9.09451C1.95608 9.42754 1 10.6021 1 12C1 13.6569 2.34315 15 4 15C5.42051 15 6.61042 14.0127 6.921 12.6869C8.37102 12.4872 9.7262 11.8197 10.773 10.773C11.8197 9.7262 12.4872 8.37102 12.6869 6.921C14.0127 6.61042 15 5.42051 15 4C15 2.34315 13.6569 1 12 1C10.3431 1 9 2.34315 9 4C9 5.37069 9.91924 6.52667 11.1749 6.8851C10.9929 7.94904 10.4857 8.9389 9.71231 9.71231C8.9389 10.4857 7.94904 10.9929 6.8851 11.1749C6.59439 10.1565 5.77903 9.35937 4.75 9.09451V1.75ZM13.5 4C13.5 4.82843 12.8284 5.5 12 5.5C11.1716 5.5 10.5 4.82843 10.5 4C10.5 3.17157 11.1716 2.5 12 2.5C12.8284 2.5 13.5 3.17157 13.5 4ZM4 13.5C4.82843 13.5 5.5 12.8284 5.5 12C5.5 11.1716 4.82843 10.5 4 10.5C3.17157 10.5 2.5 11.1716 2.5 12C2.5 12.8284 3.17157 13.5 4 13.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
