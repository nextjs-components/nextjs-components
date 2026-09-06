"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Prism({
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
        d="M6.14568 3.56625L7 2L7.85432 3.56625L9.03582 5.73233L11.908 2.03954L13.092 2.96046L9.81914 7.16843L9.86518 7.25282L15.5036 5.29163L15.9964 6.70837L10.5933 8.58771L10.6947 8.7736L15.8903 9.76325L15.6097 11.2368L11.6241 10.4776L12.1818 11.5L13 13H11.2914H2.70863H1L1.81818 11.5L3.31818 8.75H0V7.25H4.13636L6.14568 3.56625ZM3.52681 11.5L7 5.13249L10.4732 11.5H3.52681Z"
        fill="currentColor"
      />
    </svg>
  );
}
