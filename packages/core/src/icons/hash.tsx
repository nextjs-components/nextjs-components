"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Hash({
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
        d="M7.24058 1.8685L7.35907 1.12792L5.87791 0.89093L5.75942 1.63151L5.22046 5H2.5H1.75V6.5H2.5H4.98046L4.42046 10H2.5H1.75V11.5H2.5H4.18046L3.75942 14.1315L3.64093 14.8721L5.12209 15.1091L5.24058 14.3685L5.69954 11.5H9.18046L8.75942 14.1315L8.64093 14.8721L10.1221 15.1091L10.2406 14.3685L10.6995 11.5H13.5H14.25V10H13.5H10.9395L11.4995 6.5H13.5H14.25V5H13.5H11.7395L12.2406 1.8685L12.3591 1.12792L10.8779 0.89093L10.7594 1.63151L10.2205 5H6.73954L7.24058 1.8685ZM9.98046 6.5H6.49954L5.93954 10H9.42046L9.98046 6.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
