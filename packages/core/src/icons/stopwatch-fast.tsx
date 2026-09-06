"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function StopwatchFast({
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
        d="M7.00001 -0.25H7.75001H8.25001H9.75001H10.25H11V1.25H10.25H9.75001V2.03971C11.1207 2.18571 12.3732 2.72735 13.3911 3.54824L13.9697 2.96967L14.5 2.43934L15.5607 3.5L15.0303 4.03033L14.4518 4.6089C15.4202 5.80976 16 7.33717 16 9C16 12.866 12.866 16 9.00002 16C7.3965 16 5.91736 15.46 4.73698 14.5525H2.00002V13.0525H5.00002C5.17555 13.0525 5.34551 13.1141 5.48032 13.2265C6.4344 14.022 7.66041 14.5 9.00002 14.5C12.0376 14.5 14.5 12.0376 14.5 9C14.5 5.96243 12.0376 3.5 9.00002 3.5C7.25926 3.5 5.70766 4.30785 4.69866 5.57204L3.5263 4.63633C4.66119 3.21441 6.34099 2.24321 8.25001 2.03974V1.25H7.75001H7.00001V-0.25ZM11.6517 7.40901L11.1213 7.93934L9.53033 9.53033L9 10.0607L7.93934 9L8.46967 8.46967L10.0607 6.87868L10.591 6.34835L11.6517 7.40901ZM2 7H2.75H4.25H5V8.5H4.25H2.75H2V7ZM0.75 10H0V11.5H0.75H4.25H5V10H4.25H0.75Z"
        fill="currentColor"
      />
    </svg>
  );
}
