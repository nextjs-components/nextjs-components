"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Analytics({
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
        d="M1 1V12.75C1 13.9926 2.00736 15 3.25 15H15V13.5H3.25C2.83579 13.5 2.5 13.1642 2.5 12.75V1H1ZM14.2971 6.01303L14.8101 5.46596L13.716 4.43989L13.2029 4.98697L9.98259 8.42099L7.707 6.14629C7.31646 5.75589 6.6834 5.75595 6.29293 6.14642L4.21967 8.21967L3.68934 8.75L4.75 9.81066L5.28033 9.28033L7.0001 7.56057L9.28723 9.84681C9.68667 10.2461 10.3373 10.2356 10.7236 9.82361L14.2971 6.01303Z"
        fill="currentColor"
      />
    </svg>
  );
}
