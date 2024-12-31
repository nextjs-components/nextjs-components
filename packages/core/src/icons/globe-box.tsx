"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function GlobeBox({
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
        d="M5.25 0.0986328L5.66601 0.375964L10.166 3.37584L10.5 3.59849V3.99989V5.00001H9.55173L6 7.17051V12.25V13.5873L4.85891 12.89L0.358912 10.14L0 9.92064V9.50001V3.99989V3.59849L0.333987 3.37584L4.83399 0.375964L5.25 0.0986328ZM5.25 5.87093L8.35666 3.97241L5.25 1.90139L2.14334 3.97241L5.25 5.87093ZM1.5 5.33718L4.5 7.17051V10.9127L1.5 9.07938V5.33718ZM13.2307 12C13.2 12.815 13.0938 13.6278 12.9124 14.4279C13.8564 13.9717 14.5462 13.0724 14.7118 12H13.2307ZM11.8047 14.7359C11.7044 14.7452 11.6028 14.75 11.5 14.75C11.3972 14.75 11.2956 14.7452 11.1953 14.7359C10.9494 13.839 10.8077 12.9211 10.77 12H12.23C12.1923 12.9211 12.0506 13.839 11.8047 14.7359ZM13.2307 11C13.2 10.185 13.0938 9.37224 12.9124 8.57213C13.8564 9.02834 14.5462 9.92764 14.7118 11H13.2307ZM12.23 11C12.1923 10.0789 12.0506 9.16097 11.8047 8.2641C11.7044 8.25477 11.6028 8.25 11.5 8.25C11.3972 8.25 11.2956 8.25477 11.1953 8.2641C10.9494 9.16097 10.8077 10.0789 10.77 11H12.23ZM9.76925 11C9.80005 10.185 9.90616 9.37224 10.0876 8.57213C9.1436 9.02834 8.45381 9.92764 8.28822 11H9.76925ZM10.0876 14.4279C9.90616 13.6278 9.80005 12.815 9.76925 12H8.28822C8.45381 13.0724 9.1436 13.9717 10.0876 14.4279ZM11.5 16C13.9853 16 16 13.9853 16 11.5C16 9.01472 13.9853 7 11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16Z"
        fill="currentColor"
      />
    </svg>
  );
}
