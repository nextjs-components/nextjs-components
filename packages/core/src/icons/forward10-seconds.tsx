"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Forward10Seconds({
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
        d="M0 7.94513C0 5.05057 1.75642 2.56706 4.26177 1.50116L1.75 1.50116H1L1 0.00115967H1.75H5.92462C6.47691 0.00115967 6.92462 0.448875 6.92462 1.00116V5.17578V5.92578H5.42462V5.17578V2.67388C3.15496 3.3511 1.5 5.45533 1.5 7.94513C1.5 10.9827 3.96243 13.4451 7 13.4451H7.75V14.9451H7C3.13401 14.9451 0 11.8111 0 7.94513ZM14.37 5.6275C13.4739 5.6275 12.7475 6.35392 12.7475 7.25V9.38C12.7475 10.2761 13.4739 11.0025 14.37 11.0025C15.2661 11.0025 15.9925 10.2761 15.9925 9.38V7.25C15.9925 6.35392 15.2661 5.6275 14.37 5.6275ZM13.9925 7.25C13.9925 7.04151 14.1615 6.8725 14.37 6.8725C14.5785 6.8725 14.7475 7.04151 14.7475 7.25V9.38C14.7475 9.58849 14.5785 9.7575 14.37 9.7575C14.1615 9.7575 13.9925 9.58849 13.9925 9.38V7.25ZM11.2425 6.37299C11.2425 6.1813 11.1542 6.0003 11.0031 5.88233C10.852 5.76436 10.655 5.72258 10.469 5.76907L9.46902 6.01907L8.8651 6.17005L9.16706 7.37788L9.77097 7.2269L9.99749 7.17027V9.75049H9.62H8.99749V10.9955H9.62H10.62H11.62H12.2425V9.75049H11.62H11.2425V6.37299Z"
        fill="currentColor"
      />
    </svg>
  );
}
