"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function FunctionMiddleware({
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
      <g clipPath="url(#clip0_53_135Rbkm8efdfbd3b)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.25 0C1.00736 0 0 1.00736 0 2.25V13.75C0 14.9926 1.00736 16 2.25 16H13.75C14.9926 16 16 14.9926 16 13.75V2.25C16 1.00736 14.9926 0 13.75 0H2.25ZM1.5 2.25C1.5 1.83579 1.83579 1.5 2.25 1.5H13.75C14.1642 1.5 14.5 1.83579 14.5 2.25V13.75C14.5 14.1642 14.1642 14.5 13.75 14.5H2.25C1.83579 14.5 1.5 14.1642 1.5 13.75V2.25ZM5.5 10V7.125C5.5 6.64175 5.89175 6.25 6.375 6.25C6.85825 6.25 7.25 6.64175 7.25 7.125V10.5V11.25H8.75V10.5V7.125V7.12497C8.75 6.64172 9.14175 6.24997 9.625 6.24997C10.1082 6.24997 10.5 6.64172 10.5 7.12497V10.5V11.25H12V10.5V7.12497C12 5.81329 10.9367 4.74997 9.625 4.74997C8.99638 4.74997 8.42481 4.99419 7.99998 5.39292C7.57516 4.99421 7.0036 4.75 6.375 4.75C6.066 4.75 5.77078 4.80901 5.5 4.91638V4.75H4V5.5V7.125V10V10.5V10.75V11.25H5.5V10.75V10.5V10Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_53_135Rbkm8efdfbd3b">
          <rect width="16" height="16" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
}
