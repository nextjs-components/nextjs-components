"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Codepen({
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
        d="M8 0.0994263L8.40611 0.360987L15.6561 5.03048L16 5.25197V5.66102V10.3305V10.7396L15.6561 10.961L8.40611 15.6305L8 15.8921L7.59389 15.6305L0.343892 10.961L0 10.7396V10.3305V5.66102V5.25197L0.343892 5.03048L7.59389 0.360987L8 0.0994263ZM1.5 9.16029L3.24781 7.99577L1.5 6.83124V9.16029ZM2.0654 5.70591L4.375 7.24474L7.375 5.24591L7.375 2.28616L2.0654 5.70591ZM11.625 7.24474L8.625 5.24591V2.28616L13.9346 5.70591L11.625 7.24474ZM14.5 6.83124L12.7522 7.99577L14.5 9.16029V6.83124ZM10.4978 7.99577L8 6.33153L5.50219 7.99577L8 9.66L10.4978 7.99577ZM7.375 10.7456L4.375 8.74679L2.0654 10.2856L7.375 13.7054V10.7456ZM8.625 13.7054L13.9346 10.2856L11.625 8.74679L8.625 10.7456V13.7054Z"
        fill="currentColor"
      />
    </svg>
  );
}
