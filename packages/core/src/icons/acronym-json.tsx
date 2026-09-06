"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function AcronymJson({
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
      viewBox="0 0 27 14"
      width={width}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 1.25H3C2.30964 1.25 1.75 1.80964 1.75 2.5V11.5C1.75 12.1904 2.30964 12.75 3 12.75H24C24.6904 12.75 25.25 12.1904 25.25 11.5V2.5C25.25 1.80964 24.6904 1.25 24 1.25ZM3 0C1.61929 0 0.5 1.11929 0.5 2.5V11.5C0.5 12.8807 1.61929 14 3 14H24C25.3807 14 26.5 12.8807 26.5 11.5V2.5C26.5 1.11929 25.3807 0 24 0H3ZM19 4H19.75H20H20.4413L20.6556 4.38577L22 6.80566V4H23.5V9.25V10H22.75H22.5H22.0587L21.8444 9.61423L20.5 7.19434V10H19V4.75V4ZM5.5 8.125V4H7V8.125C7 9.16053 6.16053 10 5.125 10C4.08947 10 3.25 9.16053 3.25 8.125V7.75H4.75V8.125C4.75 8.33211 4.91789 8.5 5.125 8.5C5.33211 8.5 5.5 8.33211 5.5 8.125ZM13 6C13 4.89543 13.8954 4 15 4H15.75C16.8546 4 17.75 4.89543 17.75 6V8C17.75 9.10457 16.8546 10 15.75 10H15C13.8954 10 13 9.10457 13 8V6ZM15 5.5C14.7239 5.5 14.5 5.72386 14.5 6V8C14.5 8.27614 14.7239 8.5 15 8.5H15.75C16.0261 8.5 16.25 8.27614 16.25 8V6C16.25 5.72386 16.0261 5.5 15.75 5.5H15ZM9.75 5.875C9.75 5.66789 9.91789 5.5 10.125 5.5H11.5V4H10.125C9.08947 4 8.25 4.83947 8.25 5.875C8.25 6.91053 9.08947 7.75 10.125 7.75C10.3321 7.75 10.5 7.91789 10.5 8.125C10.5 8.33211 10.3321 8.5 10.125 8.5H8.5V10H10.125C11.1605 10 12 9.16053 12 8.125C12 7.08947 11.1605 6.25 10.125 6.25C9.91789 6.25 9.75 6.08211 9.75 5.875Z"
        fill="currentColor"
      />
    </svg>
  );
}
