"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function WindowVariable({
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
        d="M0.75 0H0V0.75V10.5C0 11.8807 1.11929 13 2.5 13H5.25V11.5H2.5C1.94772 11.5 1.5 11.0523 1.5 10.5V1.5H14.5V6H16V0.75V0H15.25H0.75ZM3.75 4.5C4.16421 4.5 4.5 4.16421 4.5 3.75C4.5 3.33579 4.16421 3 3.75 3C3.33579 3 3 3.33579 3 3.75C3 4.16421 3.33579 4.5 3.75 4.5ZM7 3.75C7 4.16421 6.66421 4.5 6.25 4.5C5.83579 4.5 5.5 4.16421 5.5 3.75C5.5 3.33579 5.83579 3 6.25 3C6.66421 3 7 3.33579 7 3.75ZM8.75 4.5C9.16421 4.5 9.5 4.16421 9.5 3.75C9.5 3.33579 9.16421 3 8.75 3C8.33579 3 8 3.33579 8 3.75C8 4.16421 8.33579 4.5 8.75 4.5ZM9.44936 10.5H8.5V9H9.44936C10.3955 9 11.2406 9.5919 11.5639 10.4811L11.8716 11.3271L13.6274 9.33169C13.7621 9.13162 13.9907 9 14.25 9C14.6642 9 15 9.33579 15 9.75C15 10.1642 14.6642 10.5 14.25 10.5C14.1535 10.5 14.0613 10.4818 13.9766 10.4486L12.2611 12.3983L12.8458 14.0063C12.9536 14.3027 13.2353 14.5 13.5506 14.5H14.5V16H13.5506C12.6045 16 11.7594 15.4081 11.4361 14.5189L11.1317 13.6818L9.31678 15.7444C9.30024 15.7632 9.28261 15.7804 9.26407 15.7961C9.12982 15.9225 8.94896 16 8.75 16C8.33579 16 8 15.6642 8 15.25C8 14.8358 8.33579 14.5 8.75 14.5C8.84959 14.5 8.94465 14.5194 9.0316 14.5547L10.7422 12.6106L10.1542 10.9937C10.0464 10.6973 9.76474 10.5 9.44936 10.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
