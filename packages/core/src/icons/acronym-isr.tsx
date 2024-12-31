"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function AcronymIsr({
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
        d="M2.5 2.25H17.5C18.1904 2.25 18.75 2.80964 18.75 3.5V12.5C18.75 13.1904 18.1904 13.75 17.5 13.75H2.5C1.80964 13.75 1.25 13.1904 1.25 12.5V3.5C1.25 2.80964 1.80964 2.25 2.5 2.25ZM0 3.5C0 2.11929 1.11929 1 2.5 1H17.5C18.8807 1 20 2.11929 20 3.5V12.5C20 13.8807 18.8807 15 17.5 15H2.5C1.11929 15 0 13.8807 0 12.5V3.5ZM13.5 11V9.16841C14.0912 9.44927 14.5 10.0519 14.5 10.75V11H16V10.75C16 9.96416 15.7211 9.24347 15.2569 8.68151C15.7064 8.36477 16 7.84167 16 7.25V6.75C16 5.7835 15.2165 5 14.25 5H13.5H12.75H12V5.75V8.25V9V11H13.5ZM14.25 7.5H13.5V6.5H14.25C14.3881 6.5 14.5 6.61193 14.5 6.75V7.25C14.5 7.38807 14.3881 7.5 14.25 7.5ZM5.5 5V11H4V5H5.5ZM8.5 6.875C8.5 6.66789 8.66789 6.5 8.875 6.5H10.25V5H8.875C7.83947 5 7 5.83947 7 6.875C7 7.91053 7.83947 8.75 8.875 8.75C9.08211 8.75 9.25 8.91789 9.25 9.125C9.25 9.33211 9.08211 9.5 8.875 9.5H7.25V11H8.875C9.91053 11 10.75 10.1605 10.75 9.125C10.75 8.08947 9.91053 7.25 8.875 7.25C8.66789 7.25 8.5 7.08211 8.5 6.875Z"
        fill="currentColor"
      />
    </svg>
  );
}
