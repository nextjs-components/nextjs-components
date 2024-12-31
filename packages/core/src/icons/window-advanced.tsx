"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function WindowAdvanced({
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
        d="M.75 1H0v10.5A2.5 2.5 0 0 0 2.5 14H6v-1.5H2.5a1 1 0 0 1-1-1v-9h13V7H16V1H.75Zm3 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM7 4.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm1.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
        fill="currentColor"
      />
      <g clipPath="url(#a)">
        <path
          d="M9 12.5 12.5 7v3.5H15L11.5 16v-3.5H9Z"
          fill="currentColor"
          stroke="currentColor"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" transform="translate(7 7)" d="M0 0h9v9H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
