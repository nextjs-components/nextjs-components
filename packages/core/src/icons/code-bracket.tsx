"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function CodeBracket({
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
        d="M2.5 3.5C2.5 2.94771 2.94772 2.5 3.5 2.5H4.25V1H3.5C2.11929 1 1 2.11929 1 3.5V6.29449C1 6.65016 0.881575 6.86927 0.738252 7.00305C0.587949 7.14333 0.344525 7.24999 0 7.24999V8.74999C0.344525 8.74999 0.587948 8.85665 0.738251 8.99694C0.881575 9.13071 1 9.34982 1 9.70549V12.5C1 13.8807 2.11929 15 3.5 15H4.25V13.5H3.5C2.94772 13.5 2.5 13.0523 2.5 12.5V9.70549C2.5 9.03542 2.27894 8.44137 1.86198 7.99999C2.27894 7.55861 2.5 6.96457 2.5 6.29449V3.5ZM12.5 1H11.75V2.5H12.5C13.0523 2.5 13.5 2.94772 13.5 3.5V6.29449C13.5 6.96453 13.7212 7.5586 14.1382 7.99999C13.7212 8.44139 13.5 9.03545 13.5 9.70549V12.5C13.5 13.0523 13.0523 13.5 12.5 13.5H11.75V15H12.5C13.8807 15 15 13.8807 15 12.5V9.70549C15 9.35012 15.1184 9.13095 15.2618 8.99706C15.4122 8.85668 15.6556 8.74999 16 8.74999V7.24999C15.6556 7.24999 15.4122 7.1433 15.2618 7.00292C15.1184 6.86903 15 6.64986 15 6.29449V3.5C15 2.11928 13.8807 1 12.5 1ZM8.75 10.25V9.5H7.25V10.25V12.5986C7.25 13.0383 7.11985 13.4681 6.87596 13.834L6.45994 14.458L7.70801 15.2901L8.12404 14.666C8.5322 14.0538 8.75 13.3344 8.75 12.5986V10.25ZM8 7C8.69036 7 9.25 6.44036 9.25 5.75C9.25 5.05964 8.69036 4.5 8 4.5C7.30964 4.5 6.75 5.05964 6.75 5.75C6.75 6.44036 7.30964 7 8 7Z"
        fill="currentColor"
      />
    </svg>
  );
}
