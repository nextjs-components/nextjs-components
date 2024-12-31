"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function LogoNext({
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
      <g clipPath="url(#clip0_53_108)">
        <circle
          cx="8"
          cy="8"
          r="7.375"
          fill="black"
          stroke="var(--ds-gray-1000)"
          strokeWidth={1.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.63 11V5"
          stroke="url(#paint0_linear_53_108Rbkp3efdfbd3b)"
          strokeWidth={1.25}
          strokeMiterlimit={1.41421}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.995 5.00087V5H4.745V11H5.995V6.96798L12.3615 14.7076C12.712 14.4793 13.0434 14.2242 13.353 13.9453L5.99527 5.00065L5.995 5.00087Z"
          fill="url(#paint1_linear_53_108Rbkp3efdfbd3b)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_53_108Rbkp3efdfbd3b"
          x1="11.13"
          y1="5"
          x2="11.13"
          y2="11"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="0.609375" stopColor="white" stopOpacity="0.57" />
          <stop offset="0.796875" stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_53_108Rbkp3efdfbd3b"
          x1="9.9375"
          y1="9.0625"
          x2="13.5574"
          y2="13.3992"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <clipPath id="clip0_53_108">
          <rect width="16" height="16" fill="red" />
        </clipPath>
      </defs>
    </svg>
  );
}
