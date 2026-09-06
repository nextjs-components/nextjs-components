"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function LayoutShift({
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
      <g clipPath="url(#clip0_4769_1958)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.24996 14.5L3 14.5L3 16L2.24996 16C1.00732 16 -3.60115e-05 14.9926 -3.61413e-05 13.75L-3.62704e-05 12.5L1.49996 12.5L1.49996 13.75C1.49996 14.1642 1.83575 14.5 2.24996 14.5ZM4 14.5L6 14.5L6 16L4 16L4 14.5ZM6 -2.62268e-07L4 -1.74846e-07L4 1.5L6 1.5L6 -2.62268e-07ZM1.5 2.25007L1.5 3.50012L-5.46387e-07 3.50012L-6.01028e-07 2.25007C-6.55345e-07 1.00743 1.00736 7.24352e-05 2.25 7.23809e-05L3 7.23481e-05L3 1.50007L2.25 1.50007C1.83579 1.50007 1.5 1.83586 1.5 2.25007ZM1.5 11.5L1.5 8.5L-3.27835e-07 8.5L-1.96701e-07 11.5L1.5 11.5ZM1.5 4.5L1.5 7.5L-3.71547e-07 7.5L-5.02681e-07 4.5L1.5 4.5ZM6.5 13.75C6.5 14.9926 7.50736 16 8.75 16L13.75 16C14.9927 16 16 14.9926 16 13.75L16 2.25C16 1.00736 14.9927 -6.5535e-07 13.75 -6.01033e-07L8.75 -3.82475e-07C7.50736 -3.28157e-07 6.5 1.00736 6.5 2.25L6.5 13.75ZM8.75 14.5C8.33579 14.5 8 14.1642 8 13.75L8 2.25C8 1.83579 8.33579 1.5 8.75 1.5L13.75 1.5C14.1642 1.5 14.5 1.83579 14.5 2.25L14.5 13.75C14.5 14.1642 14.1642 14.5 13.75 14.5L8.75 14.5Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_4769_1958">
          <rect
            width="16"
            height="16"
            fill="white"
            style={{ fill: "white", fillOpacity: "1" }}
            transform="translate(0 16) rotate(-90)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
