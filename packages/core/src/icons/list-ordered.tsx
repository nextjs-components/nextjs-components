"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function ListOrdered({
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
        d="M3.6225 0.872994C3.6225 0.681304 3.53419 0.500304 3.3831 0.382336C3.232 0.264368 3.03499 0.222589 2.84902 0.26908L1.84902 0.51908L1.24511 0.670059L1.54707 1.87789L2.15098 1.72691L2.3775 1.67028V3.75049H2H1.3775V4.99549H2H3H4H4.6225V3.75049H4H3.6225V0.872994ZM7.75 2.12749H7.1275V3.37249H7.75H14.25H14.8725V2.12749H14.25H7.75ZM7.1275 7.37749H7.75H14.25H14.8725V8.62249H14.25H7.75H7.1275V7.37749ZM7.1275 12.6275H7.75H14.25H14.8725V13.8725H14.25H7.75H7.1275V12.6275ZM3.06804 11.7464C3.04537 11.739 3.00818 11.7331 2.94549 11.761L2.25283 12.0688L1.68399 12.3217L1.17834 11.184L1.74719 10.9311L2.43985 10.6233C3.87191 9.98682 5.13017 11.7951 4.03567 12.9167L2.72725 14.2575H4.00001H4.62251V15.5025H4.00001H2.43655C1.44311 15.5025 0.939354 14.307 1.63317 13.596L3.14462 12.0472C3.19253 11.9981 3.1999 11.9611 3.20092 11.9373C3.20227 11.9057 3.19218 11.8633 3.16328 11.8218C3.13438 11.7803 3.09812 11.7561 3.06804 11.7464Z"
        fill="currentColor"
      />
    </svg>
  );
}
