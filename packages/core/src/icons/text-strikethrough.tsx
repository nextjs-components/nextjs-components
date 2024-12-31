"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function TextStrikethrough({
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
        d="M8.00001 0.583374C6.15186 0.583374 4.89601 1.20742 4.10921 2.08165C3.34402 2.93186 3.08334 3.95168 3.08334 4.66671C3.08334 5.30246 3.25446 5.98764 3.73035 6.62516C3.82673 6.75427 3.934 6.8793 4.05254 7H1.75H1V8.5H1.75H14.25H15V7H14.25H7.01815L6.51769 6.8024C5.6688 6.46724 5.19511 6.07985 4.93239 5.72789C4.67477 5.38278 4.58334 5.0232 4.58334 4.66671C4.58334 4.27063 4.73934 3.62378 5.22415 3.0851C5.68734 2.57044 6.51483 2.08337 8.00001 2.08337C9.99003 2.08337 10.8295 2.95573 11.1785 3.6895L11.5006 4.36679L12.8552 3.72252L12.5331 3.04522C11.9243 1.76535 10.5425 0.583374 8.00001 0.583374ZM12.9167 11.25V10.5H11.4167V11.25C11.4167 11.6491 11.2587 12.3206 10.7686 12.8815C10.302 13.4155 9.47586 13.9167 8.00001 13.9167C6.13953 13.9167 5.27285 13.0402 4.87848 12.3L4.52584 11.638L3.20199 12.3433L3.55464 13.0053C4.18889 14.1958 5.54264 15.4167 8.00001 15.4167C9.85749 15.4167 11.1147 14.7652 11.8981 13.8685C12.658 12.9988 12.9167 11.9621 12.9167 11.25Z"
        fill="currentColor"
      />
    </svg>
  );
}
