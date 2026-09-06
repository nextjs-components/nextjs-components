"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function LogoYCombinator({
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
      <path d="M16 0H0V16H16V0Z" fill="#FB651E" />
      <path
        d="M7.46089 9.04661L4.7146 3.90197H5.96969L7.58516 7.15776C7.61001 7.21575 7.63901 7.27581 7.67215 7.33795C7.70528 7.40008 7.73428 7.46428 7.75913 7.53056C7.7757 7.55541 7.78813 7.5782 7.79641 7.59891C7.8047 7.61962 7.81298 7.63826 7.82127 7.65483C7.86269 7.73767 7.89997 7.81844 7.93311 7.89715C7.96624 7.97585 7.99524 8.04834 8.02009 8.11461C8.08637 7.97378 8.15886 7.82259 8.23756 7.66104C8.31626 7.49949 8.39703 7.33173 8.47988 7.15776L10.1202 3.90197H11.2883L8.51716 9.10875V12.4267H7.46089V9.04661Z"
        fill="white"
      />
    </svg>
  );
}
