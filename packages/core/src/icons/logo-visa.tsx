"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function LogoVisa({
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
      <g clipPath="url(#clip0_4898_1862)">
        <path
          d="M0 0H16V16H0V0Z"
          fill="#1434CB"
          style={{
            fill: "#1434cb",
            fillOpacity: "1",
          }}
        />
        <path
          d="M9.70766 4.44446L7.85966 9.21868L7.08989 5.15557C6.98678 4.69868 6.62766 4.44446 6.26855 4.44446H3.60722L3.55566 4.64801C4.17166 4.80001 4.63478 4.95201 5.04544 5.15557C5.17344 5.21957 5.28011 5.33335 5.345 5.81601L6.67922 11.5556H8.57789L11.5557 4.44446H9.70766Z"
          fill="url(#paint0_linear_4898_1862)"
          style={{}}
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_4898_1862"
          x1="68.1717"
          y1="96.448"
          x2="69.5566"
          y2="40.8729"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="1"
            stopColor="white"
            style={{ stopColor: "white", stopOpacity: "1" }}
          />
        </linearGradient>
        <clipPath id="clip0_4898_1862">
          <rect
            width="16"
            height="16"
            rx="2"
            fill="white"
            style={{ fill: "white", fillOpacity: "1" }}
          />
        </clipPath>
      </defs>
    </svg>
  );
}
