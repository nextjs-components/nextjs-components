"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Rewind10Seconds({
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
        d="M16 7.94513C16 5.05057 14.2436 2.56706 11.7382 1.50116L14.25 1.50116H15V0.00115967H14.25H10.0754C9.5231 0.00115967 9.07539 0.448875 9.07539 1.00116V5.17578V5.92578H10.5754V5.17578V2.67388C12.8451 3.3511 14.5 5.45533 14.5 7.94513C14.5 10.9827 12.0376 13.4451 9.00001 13.4451H8.25001V14.9451H9.00001C12.866 14.9451 16 11.8111 16 7.94513ZM5.37 5.6275C4.47392 5.6275 3.7475 6.35392 3.7475 7.25V9.38C3.7475 10.2761 4.47392 11.0025 5.37 11.0025C6.26609 11.0025 6.9925 10.2761 6.9925 9.38V7.25C6.9925 6.35392 6.26609 5.6275 5.37 5.6275ZM4.9925 7.25C4.9925 7.04151 5.16152 6.8725 5.37 6.8725C5.57849 6.8725 5.7475 7.04151 5.7475 7.25V9.38C5.7475 9.58849 5.57849 9.7575 5.37 9.7575C5.16152 9.7575 4.9925 9.58849 4.9925 9.38V7.25ZM2.2425 6.37299C2.2425 6.1813 2.15419 6.0003 2.0031 5.88233C1.85201 5.76436 1.65499 5.72258 1.46903 5.76907L0.469026 6.01907L-0.134888 6.17005L0.167069 7.37788L0.770983 7.2269L0.997504 7.17027V9.75049H0.620004H-0.00249553V10.9955H0.620004H1.62H2.62H3.2425V9.75049H2.62H2.2425V6.37299Z"
        fill="currentColor"
      />
    </svg>
  );
}
