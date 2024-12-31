"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function AcronymHttp({
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
      style={{ width: 26, color: "currentColor" }}
      viewBox="0 0 26 16"
      width={width}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.5 2.25H2.5C1.80964 2.25 1.25 2.80964 1.25 3.5V12.5C1.25 13.1904 1.80964 13.75 2.5 13.75H23.5C24.1904 13.75 24.75 13.1904 24.75 12.5V3.5C24.75 2.80964 24.1904 2.25 23.5 2.25ZM2.5 1C1.11929 1 0 2.11929 0 3.5V12.5C0 13.8807 1.11929 15 2.5 15H23.5C24.8807 15 26 13.8807 26 12.5V3.5C26 2.11929 24.8807 1 23.5 1H2.5ZM15 6.5H13.75V5H15.75H17.75V6.5H16.5V11H15V6.5ZM8.5 6.5H9.75V11H11.25V6.5H12.5V5H10.5H8.5V6.5ZM3 11V5H4.5V7.25H5.5V5H7V11H5.5V8.75H4.5V11H3ZM20.5 11V9H21.25C22.2165 9 23 8.2165 23 7.25V6.75C23 5.7835 22.2165 5 21.25 5H20.5H19.75H19V5.75V8.25V9V11H20.5ZM21.25 7.5H20.5V6.5H21.25C21.3881 6.5 21.5 6.61193 21.5 6.75V7.25C21.5 7.38807 21.3881 7.5 21.25 7.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
