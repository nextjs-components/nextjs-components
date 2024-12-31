"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function SpeakerVolumeQuietFill({
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
        d="M0 5V11C0 11.5523 0.447715 12 1 12H3L10 16V0L3 4H1C0.447715 4 0 4.44772 0 5ZM13.9115 5.64655L13.5581 4.98506L12.2351 5.69195L12.5885 6.35345C12.8503 6.84344 12.9991 7.40324 12.9991 8C12.9991 8.59676 12.8503 9.15657 12.5885 9.64655L12.2351 10.3081L13.558 11.0149L13.9115 10.3534C14.2867 9.65129 14.4991 8.84933 14.4991 8C14.4991 7.15067 14.2867 6.34871 13.9115 5.64655Z"
        fill="currentColor"
      />
    </svg>
  );
}
