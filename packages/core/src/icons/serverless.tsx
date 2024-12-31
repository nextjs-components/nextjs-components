"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Serverless({
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
        d="M8.08422 1.97439C8.0056 1.91936 7.90243 1.91419 7.8187 1.96108L2.88355 4.72476C2.64669 4.8574 2.5 5.10767 2.5 5.37914V9.39218L9.36972 6.64429L9.37139 6.64848L14.0494 4.77726C14.26 4.7188 14.4873 4.75487 14.6705 4.8789C14.8766 5.01843 15 5.25109 15 5.49995V10.6208C15 11.4352 14.5599 12.186 13.8494 12.5839L8.91421 15.3476C8.32812 15.6758 7.6059 15.6396 7.05559 15.2544L3.49235 12.7601L5.15688 12.0943L7.91579 14.0255C7.9944 14.0805 8.09758 14.0857 8.1813 14.0388L13.1165 11.2751C13.3533 11.1425 13.5 10.8922 13.5 10.6208V6.60773L7.88025 8.85563L7.87861 8.85152L1.95134 11.2224C1.74058 11.2812 1.51296 11.2452 1.32953 11.121C1.12345 10.9815 1 10.7488 1 10.5V5.37914C1 4.56474 1.44008 3.81392 2.15064 3.416L7.08579 0.652317C7.67188 0.324109 8.39411 0.360336 8.94441 0.745547L12.5077 3.23987L10.8432 3.90569L8.08422 1.97439Z"
        fill="currentColor"
      />
    </svg>
  );
}
