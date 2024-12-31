"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Cloud({
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
        d="M12 6.50879L11.25 6.50798L11.2492 7.20768L11.9472 7.25693L12 6.50879ZM12 6.5L12.75 6.50081V6.5H12ZM4 6.5H3.25L3.25 6.50081L4 6.5ZM4.00001 6.50879L4.05281 7.25693L4.75077 7.20767L4.75001 6.50798L4.00001 6.50879ZM4.25 12.75C2.73122 12.75 1.5 11.5188 1.5 10H0C0 12.3472 1.90279 14.25 4.25 14.25V12.75ZM11.75 12.75H4.25V14.25H11.75V12.75ZM14.5 10C14.5 11.5188 13.2688 12.75 11.75 12.75V14.25C14.0972 14.25 16 12.3472 16 10H14.5ZM11.9472 7.25693C13.3736 7.35759 14.5 8.54758 14.5 10H16C16 7.75454 14.2591 5.91635 12.0528 5.76065L11.9472 7.25693ZM11.25 6.49919L11.25 6.50798L12.75 6.50961L12.75 6.50081L11.25 6.49919ZM8 3.25C9.79493 3.25 11.25 4.70507 11.25 6.5H12.75C12.75 3.87665 10.6234 1.75 8 1.75V3.25ZM4.75 6.5C4.75 4.70507 6.20507 3.25 8 3.25V1.75C5.37665 1.75 3.25 3.87665 3.25 6.5H4.75ZM4.75001 6.50798L4.75 6.49919L3.25 6.50081L3.25001 6.5096L4.75001 6.50798ZM1.5 10C1.5 8.54758 2.62644 7.35759 4.05281 7.25693L3.94721 5.76065C1.74094 5.91635 0 7.75454 0 10H1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
