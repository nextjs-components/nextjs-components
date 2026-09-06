"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function AcronymApi({
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
        d="M17.5 2.25H2.5C1.80964 2.25 1.25 2.80964 1.25 3.5V12.5C1.25 13.1904 1.80964 13.75 2.5 13.75H17.5C18.1904 13.75 18.75 13.1904 18.75 12.5V3.5C18.75 2.80964 18.1904 2.25 17.5 2.25ZM2.5 1C1.11929 1 0 2.11929 0 3.5V12.5C0 13.8807 1.11929 15 2.5 15H17.5C18.8807 15 20 13.8807 20 12.5V3.5C20 2.11929 18.8807 1 17.5 1H2.5ZM5.5 8V6.75C5.5 6.61193 5.61193 6.5 5.75 6.5H6.25C6.38807 6.5 6.5 6.61193 6.5 6.75V8H5.5ZM5.5 9.5V11H4V6.75C4 5.7835 4.7835 5 5.75 5H6.25C7.2165 5 8 5.7835 8 6.75V11H6.5V9.5H5.5ZM10.75 9V11H9.25V9V8.25V5.75V5H10H10.75H11.5C12.4665 5 13.25 5.7835 13.25 6.75V7.25C13.25 8.2165 12.4665 9 11.5 9H10.75ZM10.75 7.5H11.5C11.6381 7.5 11.75 7.38807 11.75 7.25V6.75C11.75 6.61193 11.6381 6.5 11.5 6.5H10.75V7.5ZM14.5 11H16V5H14.5V11Z"
        fill="currentColor"
      />
    </svg>
  );
}
