"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function MessageTyping({
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
        d="M2.98327 10.6318L2.8914 10.4028L2.73103 10.2153C1.94229 9.29322 1.5 8.18175 1.5 7C1.5 4.14431 4.21574 1.5 8 1.5C11.7843 1.5 14.5 4.14431 14.5 7C14.5 9.85569 11.7843 12.5 8 12.5C7.61994 12.5 7.24851 12.4724 6.88809 12.4196L6.22471 12.3226L5.70994 12.7521C5.33961 13.0611 4.87888 13.3835 4.32918 13.6584C4.01409 13.8159 3.69637 13.9446 3.38773 14.0495C3.4564 13.7131 3.5 13.3588 3.5 13C3.5 12.1045 3.22909 11.2445 2.98327 10.6318ZM1 16C1 16 1.76096 16 2.8135 15.7653C3.46733 15.6195 4.23366 15.3832 5 15C5.66881 14.6656 6.22579 14.2753 6.67094 13.9038C7.10321 13.9671 7.54721 14 8 14C12.4183 14 16 10.866 16 7C16 3.13401 12.4183 0 8 0C3.58172 0 0 3.13401 0 7C0 8.57152 0.591845 10.0221 1.59114 11.1903C1.80733 11.7292 2 12.3826 2 13C2 13.4808 1.88317 13.9834 1.72937 14.4367C1.43322 15.3097 1 16 1 16ZM4.5 8C3.94772 8 3.5 7.55228 3.5 7C3.5 6.44772 3.94772 6 4.5 6C5.05228 6 5.5 6.44772 5.5 7C5.5 7.55228 5.05228 8 4.5 8ZM7 7C7 7.55228 7.44772 8 8 8C8.55228 8 9 7.55228 9 7C9 6.44772 8.55229 6 8 6C7.44772 6 7 6.44772 7 7ZM11.5 8C10.9477 8 10.5 7.55228 10.5 7C10.5 6.44772 10.9477 6 11.5 6C12.0523 6 12.5 6.44772 12.5 7C12.5 7.55228 12.0523 8 11.5 8Z"
        fill="currentColor"
      />
    </svg>
  );
}
