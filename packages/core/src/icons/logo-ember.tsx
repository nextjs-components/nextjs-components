"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function LogoEmber({
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
        d="M8 0C12.4183 0 16 3.58175 16 8C16 12.4183 12.4183 16 8 16C3.58175 16 0 12.4183 0 8C0 3.58175 3.58175 0 8 0Z"
        fill="#E04E39"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.15823 3.016C9.18898 2.99562 9.91735 3.27512 10.5441 4.16475C11.9109 7.55337 7.02573 9.30225 6.82985 9.371L6.82373 9.373C6.82373 9.373 6.67623 10.2934 8.07723 10.258C9.80135 10.258 11.614 8.92162 12.3035 8.35675C12.3836 8.29088 12.4857 8.2577 12.5892 8.26384C12.6928 8.26998 12.7902 8.31499 12.862 8.38987L13.3782 8.92612C13.4508 9.00094 13.4922 9.10051 13.4942 9.20472C13.4962 9.30892 13.4585 9.40999 13.3889 9.4875C12.9401 9.98712 11.8871 11.0129 10.3019 11.6755C10.3019 11.6755 7.65685 12.9002 5.87435 11.7405C4.81148 11.0492 4.5191 10.2216 4.40023 9.36075C4.40085 9.36075 3.10973 9.29525 2.2806 8.9715C1.45123 8.6475 2.28673 7.67012 2.28673 7.67012C2.28673 7.67012 2.54173 7.266 3.02673 7.67012C3.5121 8.07362 4.41798 7.89162 4.41798 7.89162C4.49873 7.25425 4.63298 6.41312 5.02848 5.52537C5.85748 3.66475 7.1271 3.036 8.15823 3.016ZM8.76485 4.88037C8.21873 4.35412 6.64185 5.40562 6.58098 7.81162C6.58098 7.81162 7.04648 7.95337 8.07723 7.24537C9.10848 6.53775 9.31098 5.40562 8.76485 4.88037Z"
        fill="white"
      />
    </svg>
  );
}
