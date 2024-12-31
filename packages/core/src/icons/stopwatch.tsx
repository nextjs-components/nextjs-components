"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Stopwatch({
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
        d="M7.25 1.25V2.03971C5.87928 2.18571 4.62678 2.72736 3.6089 3.54824L3.03033 2.96967L2.5 2.43934L1.43934 3.5L1.96967 4.03033L2.54824 4.6089C1.57979 5.80976 1 7.33717 1 9C1 12.866 4.13401 16 8 16C11.866 16 15 12.866 15 9C15 7.33717 14.4202 5.80976 13.4518 4.6089L14.0303 4.03033L14.5607 3.5L13.5 2.43934L12.9697 2.96967L12.3911 3.54824C11.3732 2.72736 10.1207 2.18571 8.75 2.03971V1.25H9.25H10V-0.25H9.25H8.75H7.25H6.75H6V1.25H6.75H7.25ZM2.5 9C2.5 5.96243 4.96243 3.5 8 3.5C11.0376 3.5 13.5 5.96243 13.5 9C13.5 12.0376 11.0376 14.5 8 14.5C4.96243 14.5 2.5 12.0376 2.5 9ZM8.75 6.75V6H7.25V6.75V9V9.75H8.75V9V6.75Z"
        fill="currentColor"
      />
    </svg>
  );
}
