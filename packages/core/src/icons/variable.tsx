"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Variable({
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
        d="M13.5 4.5C14.3284 4.5 15 3.82843 15 3C15 2.17157 14.3284 1.5 13.5 1.5C13.1212 1.5 12.7752 1.64043 12.5111 1.87207C12.4768 1.89889 12.4444 1.92909 12.4143 1.96262L8.29606 6.55029L7.64437 4.68404C6.97852 2.77723 5.17966 1.5 3.15993 1.5H2V3H3.15993C4.54185 3 5.77265 3.87389 6.22823 5.17855L7.1522 7.82454L4.24177 11.0667C3.85139 11.5016 3.16427 11.5008 2.57158 11.5001C2.54756 11.5 2.52369 11.5 2.5 11.5C1.67157 11.5 1 12.1716 1 13C1 13.8284 1.67157 14.5 2.5 14.5C2.87465 14.5 3.21721 14.3627 3.48009 14.1356C3.52245 14.1049 3.56223 14.0692 3.59859 14.0287L7.71672 9.44115L8.87551 12.7596C9.23003 13.7748 10.1878 14.4548 11.2631 14.4548C11.9338 14.4548 12.5771 14.1884 13.0514 13.7141L14.5303 12.2352L13.4697 11.1745L11.9907 12.6534C11.7978 12.8464 11.536 12.9548 11.2631 12.9548C10.8256 12.9548 10.4359 12.6781 10.2917 12.2651L8.86058 8.1669L11.7636 4.93297C12.1536 4.49852 12.8399 4.49929 13.4317 4.49995C13.4546 4.49997 13.4774 4.5 13.5 4.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
