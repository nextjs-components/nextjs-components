"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function AcronymPage({
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
      style={{ width: 28, color: "currentColor" }}
      viewBox="0 0 28 16"
      width={width}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5 2.25H25.5C26.1904 2.25 26.75 2.80964 26.75 3.5V12.5C26.75 13.1904 26.1904 13.75 25.5 13.75H2.5C1.80964 13.75 1.25 13.1904 1.25 12.5V3.5C1.25 2.80964 1.80964 2.25 2.5 2.25ZM0 3.5C0 2.11929 1.11929 1 2.5 1H25.5C26.8807 1 28 2.11929 28 3.5V12.5C28 13.8807 26.8807 15 25.5 15H2.5C1.11929 15 0 13.8807 0 12.5V3.5ZM10.5 6.75V8H11.5V6.75C11.5 6.61193 11.3881 6.5 11.25 6.5H10.75C10.6119 6.5 10.5 6.61193 10.5 6.75ZM10.5 11V9.5H11.5V11H13V6.75C13 5.7835 12.2165 5 11.25 5H10.75C9.7835 5 9 5.7835 9 6.75V11H10.5ZM5.5 11V9H6.25C7.2165 9 8 8.2165 8 7.25V6.75C8 5.7835 7.2165 5 6.25 5H5.5H4.75H4V5.75V8.25V9V11H5.5ZM6.25 7.5H5.5V6.5H6.25C6.38807 6.5 6.5 6.61193 6.5 6.75V7.25C6.5 7.38807 6.38807 7.5 6.25 7.5ZM14 7.25C14 6.00736 15.0074 5 16.25 5H16.75C17.8546 5 18.75 5.89543 18.75 7H17.25C17.25 6.72386 17.0261 6.5 16.75 6.5H16.25C15.8358 6.5 15.5 6.83579 15.5 7.25V8.75C15.5 9.16421 15.8358 9.5 16.25 9.5H16.75V8H17.5C18.1904 8 18.75 8.55964 18.75 9.25V9.75C18.75 10.4404 18.1904 11 17.5 11H16.25C15.0074 11 14 9.99264 14 8.75V7.25ZM21.75 5C20.7835 5 20 5.7835 20 6.75V7.985V9.25C20 10.2165 20.7835 11 21.75 11H24V9.5H21.75C21.6119 9.5 21.5 9.38807 21.5 9.25V8.735H24V7.235H21.5V6.75C21.5 6.61193 21.6119 6.5 21.75 6.5H24V5H21.75Z"
        fill="currentColor"
      />
    </svg>
  );
}
