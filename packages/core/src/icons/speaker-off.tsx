"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function SpeakerOff({
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
        d="M14 1.25001V0.0551147L12.9239 0.574593L5.82844 4.00001H3.25001H2.67706L1.33542 3.32919L0.664595 2.99378L-0.00622559 4.33542L0.664595 4.67083L14.6646 11.6708L15.3354 12.0062L16.0062 10.6646L15.3354 10.3292L14 9.66148V9.50001V1.25001ZM12.5 8.91148V2.4449L6.37757 5.40056C6.24198 5.46601 6.09337 5.50001 5.94282 5.50001H5.67706L12.5 8.91148ZM3.50001 8.00001V7.25001H2.00001V8.00001V11C2.00001 11.5523 2.44772 12 3.00001 12H5.82844L12.9239 15.4254L14 15.9449V14.75V13.5V12.75H12.5V13.5V13.5551L6.37757 10.5995C6.24198 10.534 6.09337 10.5 5.94282 10.5H3.50001V8.00001Z"
        fill="currentColor"
      />
    </svg>
  );
}
