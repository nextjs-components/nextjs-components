"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function LogoSanity({
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
        d="M3.20621 2.05371C3.20621 4.19758 4.53766 5.48389 7.20056 6.1609L10.0214 6.81535C12.5489 7.40209 14.0835 8.84638 14.0835 11.1933C14.1061 12.2089 13.7676 13.2018 13.1582 14.0142C13.1582 11.6673 11.9396 10.4035 9.02849 9.63622L6.25275 9.00435C4.01862 8.50787 2.30353 7.31182 2.30353 4.76175C2.30353 3.79137 2.61947 2.82099 3.20621 2.05371Z"
        fill="#F04939"
      />
      <path
        d="M11.4207 10.6065C12.6167 11.3738 13.1583 12.457 13.1583 14.0141C12.1428 15.3004 10.4052 16 8.35157 16C4.89883 16 2.43902 14.2849 1.91998 11.3286H5.23733C5.6661 12.6827 6.79445 13.3145 8.32901 13.3145C10.1569 13.3371 11.3981 12.3441 11.4207 10.6065ZM4.94396 5.23554C3.81561 4.55853 3.16117 3.33992 3.2063 2.03103C4.17668 0.767278 5.84664 0 7.87767 0C11.4207 0 13.4517 1.87306 13.9708 4.49083H10.7662C10.4052 3.45275 9.52506 2.64034 7.9228 2.64034C6.18514 2.66291 5.01166 3.65585 4.94396 5.23554Z"
        fill="#F37368"
      />
    </svg>
  );
}
