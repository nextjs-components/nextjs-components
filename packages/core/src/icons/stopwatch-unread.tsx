"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function StopwatchUnread({
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
      <g clipPath="url(#clip0_4759_1908)">
        <circle cx="13.5" cy="2.5" r="2.5" fill="var(--ds-blue-900)" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 0.561996V-0.25H9.25H8.75H7.25H6.75H6V1.25H6.75H7.25V2.03971C5.87928 2.18571 4.62678 2.72736 3.6089 3.54824L3.03033 2.96967L2.5 2.43934L1.43934 3.5L1.96967 4.03033L2.54824 4.6089C1.57979 5.80976 1 7.33717 1 9C1 12.866 4.13401 16 8 16C11.866 16 15 12.866 15 9C15 8.07214 14.8195 7.18645 14.4916 6.37613C14.1745 6.45701 13.8423 6.5 13.5 6.5C13.2874 6.5 13.0788 6.48342 12.8752 6.45149C13.2743 7.21335 13.5 8.08031 13.5 9C13.5 12.0376 11.0376 14.5 8 14.5C4.96243 14.5 2.5 12.0376 2.5 9C2.5 5.96243 4.96243 3.5 8 3.5C8.5954 3.5 9.1687 3.59461 9.70569 3.76961C9.57227 3.37071 9.5 2.94379 9.5 2.5C9.5 2.38689 9.50469 2.27488 9.5139 2.16414C9.26401 2.10905 9.00912 2.06731 8.75 2.03971V1.25H9.25H9.69919C9.77813 1.00982 9.87921 0.779681 10 0.561996ZM8.75 6V6.75V9V9.75H7.25V9V6.75V6H8.75Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_4759_1908">
          <rect
            width="16"
            height="16"
            fill="white"
            style={{ fill: "white", fillOpacity: "1" }}
          />
        </clipPath>
      </defs>
    </svg>
  );
}
