"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function LogoHyper({
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
      <g clipPath="url(#clip0_872_3189)">
        <rect
          x="0.75"
          y="0.75"
          width="14.5"
          height="14.5"
          rx="3.25"
          fill="black"
          stroke="url(#paint0_linear_872_3189)"
          strokeWidth={1.5}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.49372 6.8037C7.48784 6.81773 7.47803 6.83032 7.46514 6.84039V6.83733L4.69115 8.97574C4.60503 9.03989 4.47584 8.96658 4.5189 8.87493L5.32275 7.1306C5.3319 7.11119 5.33297 7.08969 5.32579 7.06969C5.31861 7.04968 5.30361 7.03237 5.28327 7.02062L4.0488 6.30884C4.03476 6.30104 4.02306 6.29056 4.01463 6.27823C4.00619 6.2659 4.00126 6.25206 4.00021 6.23782C3.99916 6.22358 4.00204 6.20933 4.00861 6.1962C4.01517 6.18307 4.02525 6.17143 4.03803 6.16221L6.81919 4.0238C6.90173 3.95964 7.03092 4.03602 6.99144 4.12461L6.10865 5.99419C6.09848 6.01538 6.09799 6.03905 6.10729 6.06054C6.11659 6.08202 6.13499 6.09976 6.15889 6.11027L7.44002 6.6907C7.4557 6.69729 7.46926 6.70704 7.47952 6.7191C7.48979 6.73116 7.49644 6.74517 7.49892 6.75991C7.50139 6.77465 7.49961 6.78968 7.49372 6.8037ZM9.6225 7.7575C9.2787 7.7575 9 8.03621 9 8.38C9 8.7238 9.2787 9.0025 9.6225 9.0025H11.3775C11.7213 9.00251 12 8.7238 12 8.38C12 8.03621 11.7213 7.75751 11.3775 7.7575H9.6225Z"
          fill="white"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_872_3189"
          x1="8.25657"
          y1="0.835821"
          x2="8.25657"
          y2="15.9594"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F743B6" />
          <stop offset="1" stopColor="#FCC043" />
        </linearGradient>
        <clipPath id="clip0_872_3189">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
