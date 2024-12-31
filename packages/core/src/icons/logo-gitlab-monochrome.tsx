"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function LogoGitlabMonochrome({
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
      <g clipPath="url(#clip0_3908_2369)">
        <path
          d="M15.5273 6.68664L15.5054 6.63069L13.3858 1.0989C13.3427 0.990478 13.2663 0.898505 13.1676 0.836175C13.0689 0.774904 12.9538 0.745394 12.8378 0.751629C12.7218 0.757865 12.6105 0.799545 12.5189 0.871043C12.4284 0.944593 12.3627 1.04426 12.3308 1.15647L10.8996 5.53519H5.10431L3.67312 1.15647C3.64208 1.04365 3.57625 0.943483 3.485 0.870232C3.39343 0.798734 3.28213 0.757054 3.16613 0.750818C3.05012 0.744583 2.935 0.774093 2.8363 0.835364C2.73788 0.897946 2.66158 0.989838 2.61817 1.09809L0.49449 6.62744L0.473407 6.68339C0.168277 7.48065 0.130614 8.3555 0.366096 9.17603C0.601578 9.99656 1.09744 10.7183 1.77892 11.2324L1.78621 11.2381L1.80567 11.2519L5.03458 13.6699L6.632 14.8789L7.60505 15.6136C7.71887 15.7 7.85785 15.7468 8.00076 15.7468C8.14366 15.7468 8.28264 15.7 8.39646 15.6136L9.36951 14.8789L10.9669 13.6699L14.2153 11.2373L14.2234 11.2308C14.9034 10.7166 15.3981 9.99558 15.6332 9.17616C15.8683 8.35673 15.8312 7.48313 15.5273 6.68664Z"
          fill="white"
          style={{ fill: "white", fillOpacity: "1" }}
        />
      </g>
      <defs>
        <clipPath id="clip0_3908_2369">
          <rect
            width="16"
            height="16"
            fill="white"
            style={{ fill: "white", fillOpacity: "1" }}
          />
        </clipPath>
      </defs>
    </svg>
  );
}
