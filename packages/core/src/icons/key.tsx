"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Key({ color = "currentcolor", size, ...props }: Props) {
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
        d="M6.5 5.5C6.5 3.29086 8.29086 1.5 10.5 1.5C12.7091 1.5 14.5 3.29086 14.5 5.5C14.5 7.70914 12.7091 9.5 10.5 9.5C10.0496 9.5 9.61798 9.42583 9.21589 9.28964L9.09885 9.25H8.97528H8H7.25V10V12.25H5.75H5V13V14.5H1.5V11.5818L6.38022 7.14521L6.70674 6.84837L6.60585 6.41878C6.53673 6.12449 6.5 5.81702 6.5 5.5ZM10.5 0C7.46243 0 5 2.46243 5 5.5C5 5.77753 5.02062 6.05064 5.06048 6.31778L0.245495 10.695L0 10.9182V11.25V15.25V16H0.75H5.75H6.5V15.25V13.75H8H8.75V13V10.75H8.85639C9.37626 10.9126 9.92859 11 10.5 11C13.5376 11 16 8.53757 16 5.5C16 2.46243 13.5376 0 10.5 0ZM10.5 6.5C11.0523 6.5 11.5 6.05228 11.5 5.5C11.5 4.94772 11.0523 4.5 10.5 4.5C9.94771 4.5 9.5 4.94772 9.5 5.5C9.5 6.05228 9.94771 6.5 10.5 6.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
