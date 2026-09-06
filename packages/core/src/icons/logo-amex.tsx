"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function LogoAmex({
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
      <g clipPath="url(#clip0_4898_1833)">
        <rect
          width="16"
          height="16"
          rx="2"
          fill="#016FD0"
          style={{
            fill: "#016fd0",
            fillOpacity: "1",
          }}
        />
        <path
          d="M7.0999 2.5H15.9999L16 13.5H6.5V8.5H4.3999L7.0999 2.5Z"
          fill="white"
          style={{ fill: "white", fillOpacity: "1" }}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.7934 3.5L6 7.5H7.23L7.56817 6.69894H9.40141L9.73957 7.5H11L9.21413 3.5H7.7934ZM7.94742 5.80125L8.4851 4.52789L9.02246 5.80125H7.94742ZM7.5 8.5V12.5H11H12.3746L13.4985 11.2196L14.6339 12.5H16V12.4435L14.2131 10.4977L16 8.53136V8.5H14.6475L13.5287 9.76772L12.413 8.5H11H7.5ZM11 8.5L12.8255 10.4977L11 12.5V11.5677H8.63346V10.9533H10.9436V10.047H8.63346V9.42145H11V8.5ZM11 3.5V7.4907H12.0499V4.74932L13.0462 7.4907H13.9901L14.9661 4.75862V7.5L16 7.4907V3.5H14.3933L13.5285 5.95927L12.6694 3.50589L11 3.5Z"
          fill="#016FD0"
          style={{
            fill: "#016fd0",
            fillOpacity: "1",
          }}
        />
      </g>
      <defs>
        <clipPath id="clip0_4898_1833">
          <rect
            width="16"
            height="16"
            rx="2"
            fill="white"
            style={{ fill: "white", fillOpacity: "1" }}
          />
        </clipPath>
      </defs>
    </svg>
  );
}
