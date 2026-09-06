"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function FlagPriority({
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
        d="M1.74999 0H2.49999C5.11908 0 7.29 1.31258 9.15128 2.49139C9.26323 2.56229 9.37392 2.63265 9.48348 2.70228C10.3093 3.22718 11.0711 3.71143 11.8308 4.08469C12.6834 4.50368 13.4718 4.75 14.25 4.75L14.666 6.12404L14.25 5.5C14.666 6.12404 14.6659 6.12415 14.6657 6.12427L14.6652 6.12455L14.6641 6.1253L14.6609 6.12746L14.6502 6.13446L14.6129 6.1587C14.5809 6.17926 14.535 6.20844 14.476 6.245C14.358 6.3181 14.1874 6.42085 13.971 6.54332C13.5387 6.78799 12.9213 7.11291 12.174 7.4378C10.6899 8.08306 8.6446 8.75 6.49999 8.75C4.61937 8.75 3.6362 9.21932 3.12951 9.67995C2.62324 10.1402 2.50002 10.6752 2.50002 11V11.75H2.5V15.25V16H1V15.25V0.750011V1.0848e-05H1.74999V0ZM2.5 1.5V8.26607C3.37658 7.64746 4.66583 7.25 6.49999 7.25C8.35537 7.25 10.185 6.66694 11.5759 6.0622C11.7551 5.98431 11.9261 5.90643 12.0881 5.82988C11.7754 5.71357 11.4692 5.57832 11.1692 5.43094C10.3302 5.01865 9.49337 4.48639 8.67739 3.96738C8.56743 3.89744 8.45785 3.82775 8.3487 3.75861C6.45997 2.56242 4.6309 1.5 2.5 1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
