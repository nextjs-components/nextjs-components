"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function DoubleCheck({
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
        d="M11.5015 3.85991L11.0459 4.45567L7.70569 8.82361L7.29118 8.4091L6.63564 7.75356L9.85434 3.5445L10.3099 2.94873L11.5015 3.85991ZM4.1092 11.5911L4.9023 12.3842C4.2256 12.8947 3.24471 12.8554 2.61219 12.223L0.669181 10.2804L0.138794 9.75014L1.19934 8.68937L1.72973 9.21964L3.67274 11.1622C3.68536 11.1748 3.69895 11.1858 3.71326 11.1951L4.1092 11.5911ZM15.296 4.45568L15.7515 3.85991L14.56 2.94874L14.1044 3.54451L8.29816 11.1373C8.20632 11.2574 8.02973 11.2691 7.92281 11.1623L5.97971 9.21964L5.44932 8.68937L4.38879 9.75017L4.91918 10.2804L6.86228 12.223C7.6107 12.9713 8.84683 12.8892 9.48969 12.0485L15.296 4.45568Z"
        fill="currentColor"
      />
    </svg>
  );
}
