"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function LogoBitbucketMonochrome({
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
        d="M15.2168 1.04401C15.1528 1.01411 15.0833 0.999103 15.0132 1.00004L0.986801 1.00254C0.916663 1.0016 0.847175 1.0166 0.78322 1.04651C0.719264 1.07641 0.662389 1.12048 0.616589 1.17562C0.570789 1.23077 0.537174 1.29565 0.518103 1.36571C0.499032 1.43577 0.494969 1.50932 0.506198 1.58119L1.75169 9.51738L1.15503 5.70409H5.66549L5.66549 5.70409H10.3922L9.54634 10.2909H9.54636L13.235 14.8353C13.133 14.9269 13.0065 14.983 12.8733 14.9967C13.0057 14.9831 13.1314 14.9279 13.2333 14.8376C13.3502 14.7341 13.4282 14.5911 13.4536 14.4338L15.4938 1.57869C15.505 1.50683 15.501 1.43328 15.4819 1.36322C15.4628 1.29315 15.4292 1.22827 15.3834 1.17313C15.3376 1.11798 15.2807 1.07391 15.2168 1.04401ZM3.02667 15H3.02458C3.02316 15 3.02174 15 3.02032 15C3.02243 15 3.02455 15 3.02667 15Z"
        fill="white"
        style={{ fill: "white", fillOpacity: "1" }}
      />
      <mask
        id="mask0_3908_2351"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="1"
        y="5"
        width="13"
        height="10"
      >
        <path
          d="M1.15503 5.7041H5.66549L6.42244 10.2909H9.54636L13.235 14.8354C13.1181 14.9403 12.969 14.9986 12.8145 15H3.02458C2.90938 15.0015 2.79749 14.96 2.70927 14.8831C2.62106 14.8062 2.5624 14.699 2.54397 14.5809L1.15503 5.7041Z"
          fill="url(#paint0_linear_3908_2351)"
          style={{}}
        />
      </mask>
      <g mask="url(#mask0_3908_2351)">
        <path
          d="M1.15503 5.7041H5.66549L6.42244 10.2909H9.54636L13.235 14.8354C13.1181 14.9403 12.969 14.9986 12.8145 15H3.02458C2.90938 15.0015 2.79749 14.96 2.70927 14.8831C2.62106 14.8062 2.5624 14.699 2.54397 14.5809L1.15503 5.7041Z"
          fill="white"
          style={{ fill: "white", fillOpacity: "1" }}
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_3908_2351"
          x1="0.112125"
          y1="6.98861"
          x2="7.77447"
          y2="12.7502"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0.18"
            stopOpacity="0.4"
            style={{ stopColor: "black", stopOpacity: "0.4" }}
          />
          <stop offset="1" style={{ stopColor: "black", stopOpacity: "1" }} />
        </linearGradient>
      </defs>
    </svg>
  );
}
