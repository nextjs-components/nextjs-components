"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Cursor({
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
        d="M0.547184 1.51189L-0.0255737 -0.0255127L1.51183 0.547244L14.2618 5.29724L15.9637 5.93129L14.3103 6.68283L9.79559 8.73499L14.5303 13.4697L13.4697 14.5304L8.73493 9.79565L6.68277 14.3104L5.93123 15.9638L5.29718 14.2619L0.547184 1.51189ZM8.53103 7.6621L12.0363 6.06882L2.52556 2.52562L6.06876 12.0363L7.66204 8.53109C7.83713 8.1459 8.14584 7.83719 8.53103 7.6621Z"
        fill="currentColor"
      />
    </svg>
  );
}
