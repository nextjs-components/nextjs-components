"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function LayoutShiftUnread({
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
      <g clipPath="url(#clip0_4769_1975)">
        <circle cx="13.5" cy="2.5" r="2.5" fill="var(--ds-blue-900)" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 14.5L2.24996 14.5C1.83575 14.5 1.49996 14.1642 1.49996 13.75L1.49996 12.5L-3.62704e-05 12.5L-3.61413e-05 13.75C-3.60115e-05 14.9926 1.00732 16 2.24996 16L3 16L3 14.5ZM6 14.5L4 14.5L4 16L6 16L6 14.5ZM4 -1.74846e-07L6 -2.62268e-07L6 1.5L4 1.5L4 -1.74846e-07ZM1.5 3.50012L1.5 2.25007C1.5 1.83586 1.83579 1.50007 2.25 1.50007L3 1.50007L3 7.23481e-05L2.25 7.23809e-05C1.00736 7.24352e-05 -6.55345e-07 1.00743 -6.01028e-07 2.25007L-5.46387e-07 3.50012L1.5 3.50012ZM1.5 8.5L1.5 11.5L-1.96701e-07 11.5L-3.27835e-07 8.5L1.5 8.5ZM1.5 7.5L1.5 4.5L-5.02681e-07 4.5L-3.71547e-07 7.5L1.5 7.5ZM8.75 16C7.50736 16 6.5 14.9926 6.5 13.75L6.5 2.25C6.5 1.00736 7.50736 -3.28157e-07 8.75 -3.82475e-07L10.3773 -4.53607e-07C10.0287 0.434825 9.76912 0.944022 9.62602 1.5L8.75 1.5C8.33579 1.5 8 1.83579 8 2.25L8 13.75C8 14.1642 8.33579 14.5 8.75 14.5L13.75 14.5C14.1642 14.5 14.5 14.1642 14.5 13.75L14.5 6.37398C15.056 6.23087 15.5652 5.97124 16 5.62267L16 13.75C16 14.9926 14.9927 16 13.75 16L8.75 16Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_4769_1975">
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
