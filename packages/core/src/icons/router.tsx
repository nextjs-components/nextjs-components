"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Router({
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
        d="M5.71051 1.74152L6.33567 1.32719C7.60121 0.488465 9.1197 7.12626e-08 10.75 0C12.3803 -7.12625e-08 13.8988 0.488465 15.1643 1.32719L15.7895 1.74152L14.9608 2.99185L14.3357 2.57752C13.3082 1.8966 12.0766 1.5 10.75 1.5C9.42343 1.5 8.19176 1.8966 7.16433 2.57752L6.53916 2.99185L5.71051 1.74152ZM11.25 8.00003V5.99996H9.75V8.00003H1.5H0V9.50003V13.5C0 14.8807 1.11929 16 2.5 16H13.5C14.8807 16 16 14.8807 16 13.5V9.50003V8.00003H14.5H11.25ZM1.5 9.50003H14.5V13.5C14.5 14.0523 14.0523 14.5 13.5 14.5H2.5C1.94772 14.5 1.5 14.0523 1.5 13.5V9.50003ZM3.75 12.5C4.16421 12.5 4.5 12.1642 4.5 11.75C4.5 11.3358 4.16421 11 3.75 11C3.33579 11 3 11.3358 3 11.75C3 12.1642 3.33579 12.5 3.75 12.5ZM7 11.75C7 12.1642 6.66421 12.5 6.25 12.5C5.83579 12.5 5.5 12.1642 5.5 11.75C5.5 11.3358 5.83579 11 6.25 11C6.66421 11 7 11.3358 7 11.75ZM8.39655 3.58749L7.73506 3.94094L8.44195 5.26393L9.10345 4.91048C9.59344 4.64868 10.1532 4.49994 10.75 4.49994C11.3468 4.49994 11.9066 4.64868 12.3966 4.91048L13.0581 5.26393L13.7649 3.94094L13.1034 3.58749C12.4013 3.21232 11.5993 2.99994 10.75 2.99994C9.90067 2.99994 9.09871 3.21232 8.39655 3.58749Z"
        fill="currentColor"
      />
    </svg>
  );
}
