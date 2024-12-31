"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function BrowserChrome({
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
        d="M8.53216 11.3333L6.77086 14.3839C3.76871 13.8094 1.5 11.1696 1.5 8C1.5 6.86643 1.79018 5.80063 2.3003 4.87284L5.006 9.55925C5.56913 10.6383 6.69854 11.375 8 11.375C8.18107 11.375 8.35881 11.3607 8.53216 11.3333ZM10.8505 9.80787L8.14234 14.4985C11.6665 14.4228 14.5 11.5423 14.5 8C14.5 7.2549 14.3746 6.53909 14.1438 5.8725L10.6201 5.8725C11.0921 6.45305 11.375 7.19349 11.375 8C11.375 8.66509 11.1826 9.28525 10.8505 9.80787ZM8.13109 4.6275L13.5577 4.6275C12.4175 2.7524 10.355 1.5 8 1.5C6.0376 1.5 4.27831 2.36964 3.08649 3.74456L4.84694 6.79376C5.33242 5.52553 6.56104 4.625 8 4.625C8.0439 4.625 8.0876 4.62584 8.13109 4.6275ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5.875 8C5.875 6.8264 6.8264 5.875 8 5.875C9.1736 5.875 10.125 6.8264 10.125 8C10.125 9.1736 9.1736 10.125 8 10.125C6.8264 10.125 5.875 9.1736 5.875 8Z"
        fill="currentColor"
      />
    </svg>
  );
}
