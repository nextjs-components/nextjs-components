"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function ArrowCrossed({
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
        d="M10.7499 1H9.99987V2.5H10.7499H12.4392L1.46954 13.4697L0.939209 14L1.99987 15.0607L2.5302 14.5303L13.4987 3.56182V5.25V6H14.9987V5.25V2C14.9987 1.44772 14.551 1 13.9987 1H10.7499Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.0002 7.06067L5.46983 6.53038L1.4691 2.53034L0.938721 2.00005L1.99929 0.939301L2.52967 1.46959L6.5304 5.46963L7.06077 5.99992L6.0002 7.06067ZM12.4377 13.4994H10.7499H9.99994V14.9994H10.7499H13.9994C14.5517 14.9994 14.9994 14.5517 14.9994 13.9994V10.75V9.99999H13.4994V10.75V12.4398L10.5305 9.46978L10.0003 8.93934L8.93944 9.99979L9.46966 10.5302L12.4377 13.4994Z"
        fill="currentColor"
      />
    </svg>
  );
}
