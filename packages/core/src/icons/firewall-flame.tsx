"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function FirewallFlame({
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
      <g clipPath="url(#clip0_4629_1942)">
        <mask id="path-1-inside-1_4629_1942" fill="white">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 1.25C0 0.559645 0.559644 0 1.25 0H14.75C15.4404 0 16 0.559644 16 1.25V4.75V5.5H15.25H6V8.75V9.5H5.25H1.5V12H4.5V13.5H1.25C0.559644 13.5 0 12.9404 0 12.25V1.25ZM1.5 8H4.5V5.5H1.5V8ZM4.5 4H1.5V1.5H4.5V4ZM6 1.5V4H10V1.5H6ZM14.5 4H11.5V1.5H14.5V4ZM9 10L9.36184 10.2412C9.99043 10.6603 10.8397 10.4904 11.2588 9.86184C11.4161 9.6259 11.5 9.34869 11.5 9.06512V7C11.5 7 15 9 15 12.41C15 13.8506 14.1825 15.0831 13 15.6565V15.5C13 14.6716 12.3284 14 11.5 14C10.6716 14 10 14.6716 10 15.5V15.6565C8.81753 15.0831 8 13.8506 8 12.41C8 11 9 10 9 10Z"
          />
        </mask>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 1.25C0 0.559645 0.559644 0 1.25 0H14.75C15.4404 0 16 0.559644 16 1.25V4.75V5.5H15.25H6V8.75V9.5H5.25H1.5V12H4.5V13.5H1.25C0.559644 13.5 0 12.9404 0 12.25V1.25ZM1.5 8H4.5V5.5H1.5V8ZM4.5 4H1.5V1.5H4.5V4ZM6 1.5V4H10V1.5H6ZM14.5 4H11.5V1.5H14.5V4ZM9 10L9.36184 10.2412C9.99043 10.6603 10.8397 10.4904 11.2588 9.86184C11.4161 9.6259 11.5 9.34869 11.5 9.06512V7C11.5 7 15 9 15 12.41C15 13.8506 14.1825 15.0831 13 15.6565V15.5C13 14.6716 12.3284 14 11.5 14C10.6716 14 10 14.6716 10 15.5V15.6565C8.81753 15.0831 8 13.8506 8 12.41C8 11 9 10 9 10Z"
          fill="currentColor"
          style={{ fill: "currentColor", fillOpacity: "1" }}
        />
      </g>
      <defs>
        <clipPath id="clip0_4629_1942">
          <rect
            width="16"
            height="16"
            fill="white"
            style={{ fill: "white", fillOpacity: "1" }}
          />
        </clipPath>
      </defs>
    </svg>
  );
}
