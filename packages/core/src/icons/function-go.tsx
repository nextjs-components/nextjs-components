"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function FunctionGo({
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
      <g clipPath="url(#clip0_1535_29637)">
        <path
          d="M15.25 8V2.25C15.25 1.42157 14.5784 0.75 13.75 0.75H2.25C1.42157 0.75 0.75 1.42157 0.75 2.25V13.75C0.75 14.5784 1.42157 15.25 2.25 15.25H8"
          stroke="currentColor"
          style={{ stroke: "currentColor" }}
          strokeWidth={1.5}
        />
        <path
          d="M9.24618 4.25V4.25C8.00565 4.25 7 5.25565 7 6.49618L7 9.50439C7 10.7446 5.99461 11.75 4.75439 11.75V11.75"
          stroke="currentColor"
          style={{ stroke: "currentColor" }}
          strokeWidth={1.5}
          strokeLinecap="square"
        />
        <path
          d="M5.25 7.75H8.75"
          stroke="currentColor"
          style={{ stroke: "currentColor" }}
          strokeWidth={1.5}
          strokeLinecap="square"
        />
        <path
          d="M15.7221 11.1407C15.1916 11.2818 14.8294 11.3877 14.3073 11.5288C14.181 11.5641 14.1726 11.5729 14.0631 11.4406C13.9368 11.2906 13.8441 11.1936 13.6673 11.1054C13.1368 10.832 12.6231 10.9113 12.143 11.2377C11.5704 11.6258 11.2756 12.1992 11.2841 12.9137C11.2925 13.6194 11.7557 14.2015 12.4209 14.2986C12.9936 14.3779 13.4736 14.1662 13.8526 13.7164C13.9284 13.6194 13.9957 13.5135 14.0799 13.39C13.7768 13.39 13.3978 13.39 12.4546 13.39C12.2778 13.39 12.2357 13.2753 12.2946 13.1254C12.4041 12.8519 12.6062 12.3933 12.7241 12.1639C12.7494 12.111 12.8083 12.0228 12.9346 12.0228C13.3641 12.0228 14.9473 12.0228 16 12.0228C15.9832 12.2609 15.9832 12.4991 15.9495 12.7373C15.8568 13.3724 15.6295 13.9545 15.2589 14.4662C14.6526 15.3041 13.861 15.8246 12.8588 15.9657C12.0336 16.0804 11.2672 15.9128 10.5935 15.3835C9.97034 14.8896 9.61664 14.2368 9.52401 13.4253C9.41453 12.4638 9.68401 11.5994 10.2398 10.8408C10.8377 10.0204 11.6293 9.50001 12.5978 9.31477C13.3894 9.16482 14.1473 9.26185 14.8294 9.747C15.2758 10.0557 15.5958 10.4791 15.8063 10.9907C15.8568 11.0701 15.8232 11.1142 15.7221 11.1407Z"
          fill="#00ACD7"
          style={{
            fill: "#00acd7",
            fill: "color(display-p3 0 0.6745 0.8431)",
            fillOpacity: "1",
          }}
        />
      </g>
    </svg>
  );
}
