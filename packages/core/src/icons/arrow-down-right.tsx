"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function ArrowDownRight({
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
        d="M12.4994 11.4399V5.74999V4.99999H13.9994V5.74999V12.9994C13.9994 13.5517 13.5517 13.9994 12.9994 13.9994H5.74999H4.99999V12.4994H5.74999H11.4376L2.21908 3.28092L1.68875 2.75059L2.74941 1.68993L3.27974 2.22026L12.4994 11.4399Z"
        fill="currentColor"
      />
    </svg>
  );
}
