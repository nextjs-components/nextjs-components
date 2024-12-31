"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function LogoVite({
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
      <g clipPath="url(#clip0_872_3154)">
        <path
          d="M15.5957 2.32291L8.41532 15.1627C8.26707 15.4278 7.88619 15.4294 7.73571 15.1656L0.41293 2.32415C0.248995 2.03667 0.494822 1.68845 0.820594 1.74668L8.00869 3.03151C8.05454 3.0397 8.10149 3.03963 8.14734 3.03127L15.1851 1.74852C15.5098 1.68934 15.7568 2.03487 15.5957 2.32291Z"
          fill="url(#paint0_linear_872_3154)"
        />
        <path
          d="M11.4327 0.0614385L6.11901 1.10264C6.03167 1.11975 5.96701 1.19377 5.96174 1.28259L5.63487 6.80312C5.62719 6.93315 5.7466 7.03407 5.87351 7.0048L7.35292 6.66337C7.49134 6.63145 7.61641 6.75336 7.58797 6.89256L7.14843 9.04488C7.11885 9.18974 7.25485 9.3136 7.39632 9.27063L8.31007 8.99301C8.45173 8.95001 8.58785 9.07422 8.55788 9.2192L7.85938 12.6C7.81567 12.8115 8.09696 12.9268 8.21427 12.7455L8.29263 12.6244L12.6225 3.9833C12.695 3.83861 12.57 3.67364 12.4111 3.7043L10.8883 3.9982C10.7452 4.02579 10.6234 3.89253 10.6638 3.75252L11.6577 0.306999C11.6982 0.166755 11.576 0.0333714 11.4327 0.0614385Z"
          fill="url(#paint1_linear_872_3154)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_872_3154"
          x1="0.234138"
          y1="1.2878"
          x2="9.17072"
          y2="13.4244"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#41D1FF" />
          <stop offset="1" stopColor="#BD34FE" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_872_3154"
          x1="7.59608"
          y1="0.344123"
          x2="9.21267"
          y2="11.4337"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFEA83" />
          <stop offset="0.0833333" stopColor="#FFDD35" />
          <stop offset="1" stopColor="#FFA800" />
        </linearGradient>
        <clipPath id="clip0_872_3154">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
