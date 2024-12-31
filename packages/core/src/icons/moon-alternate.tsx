"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function MoonAlternate({
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
      <g clipPath="url(#clip0_174_19363)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.88067 14.5 2.27454 12.3027 1.64496 9.37151C1.81218 9.77621 2.05228 10.1443 2.36758 10.4596C4.04598 12.138 7.21941 11.6857 9.45566 9.44949C11.6919 7.21325 12.1441 4.03981 10.4657 2.36142C10.1601 2.05583 9.80498 1.82087 9.41495 1.65445C12.3244 2.30033 14.5 4.8961 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_174_19363">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
