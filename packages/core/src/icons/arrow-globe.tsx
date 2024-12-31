"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function ArrowGlobe({
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
        d="M13.3341 5.625C13.2884 6.50207 13.1465 7.37534 12.9085 8.22871C13.84 7.67688 14.5122 6.73338 14.6981 5.625H13.3341ZM11.4354 8.72499C11.2926 8.74151 11.1473 8.75 11 8.75C10.8527 8.75 10.7074 8.74151 10.5645 8.72499C10.1945 7.72152 9.97894 6.67668 9.9178 5.625H12.0822C12.021 6.67668 11.8055 7.72152 11.4354 8.72499ZM13.3341 4.375C13.2884 3.49793 13.1465 2.62466 12.9085 1.77129C13.84 2.32312 14.5122 3.26663 14.6981 4.375H13.3341ZM12.0822 4.375C12.021 3.32332 11.8055 2.27848 11.4354 1.27501C11.2926 1.25849 11.1473 1.25 11 1.25C10.8527 1.25 10.7074 1.25849 10.5645 1.27501C10.1945 2.27848 9.97894 3.32332 9.9178 4.375H12.0822ZM8.66591 4.375C8.71158 3.49793 8.85345 2.62466 9.0915 1.77129C8.15995 2.32312 7.48779 3.26663 7.30184 4.375H8.66591ZM9.0915 8.22871C8.85344 7.37533 8.71158 6.50207 8.66591 5.625H7.30184C7.48779 6.73337 8.15995 7.67688 9.0915 8.22871ZM11 10C13.7614 10 16 7.76142 16 5C16 2.23858 13.7614 0 11 0C8.23857 0 5.99999 2.23858 5.99999 5C5.99999 7.76142 8.23857 10 11 10ZM2.24999 9.5H1.49999V11H2.24999H3.93933L0.719661 14.2197L0.189331 14.75L1.24999 15.8107L1.78032 15.2803L4.99999 12.0607V13.75V14.5H6.49999V13.75V10.5C6.49999 9.94771 6.05228 9.5 5.49999 9.5H2.24999Z"
        fill="currentColor"
      />
    </svg>
  );
}
