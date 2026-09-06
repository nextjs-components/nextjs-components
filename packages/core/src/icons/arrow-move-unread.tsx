"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function ArrowMoveUnread({
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
      <g clipPath="url(#clip0_4759_1928)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.61292 1.55236L8.70703 0.64647C8.31651 0.255946 7.68334 0.255946 7.29282 0.64647L5.46959 2.46969L4.93926 3.00002L5.99992 4.06068L6.53025 3.53035L7.25004 2.81057V7.25002H2.81062L3.53029 6.53034L4.06062 6.00002L2.99996 4.93935L2.46963 5.46969L0.646409 7.29291C0.255885 7.68343 0.255885 8.3166 0.646409 8.70712L2.46963 10.5303L2.99996 11.0607L4.06062 10L3.53029 9.46969L2.81063 8.75002H7.25004V13.1895L6.53025 12.4697L5.99992 11.9394L4.93926 13L5.46959 13.5304L7.29282 15.3536C7.68334 15.7441 8.31651 15.7441 8.70703 15.3536L10.5303 13.5304L11.0606 13L9.99992 11.9394L9.46959 12.4697L8.75004 13.1892V8.75002H13.1893L12.4697 9.46969L11.9393 10L13 11.0607L13.5303 10.5303L15.3536 8.70712C15.7441 8.3166 15.7441 7.68343 15.3536 7.29291L14.4477 6.38706C14.1439 6.46088 13.8265 6.5 13.5 6.5C13.058 6.5 12.6328 6.42831 12.2353 6.29593L12.4697 6.53034L13.1893 7.25002H8.75004V2.8108L9.46959 3.53035L9.70411 3.76487C9.5717 3.36732 9.5 2.94203 9.5 2.5C9.5 2.17351 9.53912 1.85615 9.61292 1.55236Z"
          fill="currentColor"
        />
        <circle cx="13.5" cy="2.5" r="2.5" fill="var(--ds-blue-900)" />
      </g>
      <defs>
        <clipPath id="clip0_4759_1928">
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
