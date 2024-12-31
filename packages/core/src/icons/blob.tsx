"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Blob({
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
        d="M2.19338 12.2035C1.92748 11.7599 1.75 11.1309 1.75 10.2159C1.75 8.37501 2.4707 6.35242 3.64834 4.79604C4.83005 3.23427 6.38227 2.25 8 2.25C9.61773 2.25 11.17 3.23427 12.3517 4.79604C13.5293 6.35242 14.25 8.37501 14.25 10.2159C14.25 11.1309 14.0725 11.7599 13.8066 12.2035C13.5451 12.6398 13.1629 12.9556 12.6437 13.1877C11.5482 13.6774 9.9652 13.75 8 13.75C6.0348 13.75 4.45177 13.6774 3.3563 13.1877C2.83709 12.9556 2.45492 12.6398 2.19338 12.2035ZM2.74421 14.5571C4.18223 15.1999 6.09921 15.25 8 15.25C9.90079 15.25 11.8178 15.1999 13.2558 14.5571C14.0033 14.223 14.6463 13.7202 15.0932 12.9747C15.5357 12.2364 15.75 11.3203 15.75 10.2159C15.75 8.01826 14.9037 5.68289 13.5478 3.89095C12.196 2.10441 10.2483 0.75 8 0.75C5.75174 0.75 3.80396 2.10441 2.45217 3.89095C1.0963 5.68289 0.25 8.01826 0.25 10.2159C0.25 11.3203 0.464272 12.2364 0.906809 12.9747C1.35371 13.7202 1.99667 14.223 2.74421 14.5571Z"
        fill="currentColor"
      />
    </svg>
  );
}
