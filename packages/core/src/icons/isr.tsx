"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Isr({ color = "currentcolor", size, ...props }: Props) {
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
        d="M2.99999 0H3.74999H9.5H10.5964C10.8617 0 11.116 0.105357 11.3035 0.292893L15.7071 4.69645C15.8946 4.88398 16 5.13834 16 5.40355V6.49999L16 6.5H16V13.5C16 14.8807 14.8807 16 13.5 16H5.49999C4.11928 16 2.99999 14.8807 2.99999 13.5V9.31066L1.78032 10.5303L1.24999 11.0607L0.189331 10L0.719661 9.46967L3.04288 7.14645C3.43341 6.75592 4.06657 6.75592 4.4571 7.14645L6.78032 9.46967L7.31065 10L6.24999 11.0607L5.71966 10.5303L4.49999 9.31066V13.5C4.49999 14.0523 4.94771 14.5 5.49999 14.5H13.5C14.0523 14.5 14.5 14.0523 14.5 13.5V6.5H11H9.5V5V1.5H4.49999V4H2.99999V0.75V0ZM11 2.11067V5H13.8893L11 2.11067Z"
        fill="currentColor"
      />
    </svg>
  );
}
