import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function BoxWithRing({
  color = "currentcolor",
  size,
  ...props
}: Props) {
  const iconSize = useIconSize();
  return (
    <svg
      {...props}
      fill="none"
      height={size || iconSize.size}
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width={size || iconSize.size}
      style={{ ...props.style, color }}
    >
      <svg
        {...props}
        viewBox="0 0 42 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.99992 23L6 25.14C5.99611 25.6991 6.14853 26.2481 6.44008 26.7252C6.73162 27.2023 7.15069 27.5884 7.65 27.84L19.65 33.84C20.0668 34.0485 20.5264 34.1571 20.9925 34.1571C21.4586 34.1571 21.9182 34.0485 22.335 33.84L34.335 27.84C34.8348 27.5916 35.2554 27.2087 35.5496 26.7344C35.8437 26.2601 35.9997 25.7131 36 25.155L35.9999 23M6 14V10.86C6.00029 10.3019 6.15628 9.75488 6.45042 9.28055C6.74455 8.80622 7.16518 8.42335 7.665 8.17498L19.665 2.17498C20.0798 1.96884 20.5368 1.86157 21 1.86157C21.4632 1.86157 21.9202 1.96884 22.335 2.17498L34.335 8.17498C34.8348 8.42335 35.2554 8.80622 35.5496 9.28055C35.8437 9.75488 35.9997 10.3019 36 10.86V14"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M6.48 9.23999L21 16.5L35.52 9.23999"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M21 34.14V30M21 16.5V21"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M39 15.4611L40.5205 16.24L21.0005 26L1.48047 16.24L3.00094 15.4611"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </svg>
  );
}
