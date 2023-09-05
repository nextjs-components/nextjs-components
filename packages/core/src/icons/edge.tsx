"use client";

import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function Edge({
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
      viewBox="0 0 20 20"
      width={size || iconSize.size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M10.6574 2.90814C10.6268 2.82954 10.5583 2.77187 10.4757 2.75501C10.393 2.73816 10.3075 2.76441 10.2485 2.82473L5.81436 7.36075C5.73192 7.44509 5.72018 7.57577 5.78626 7.67345C5.85235 7.77113 5.97803 7.80885 6.08697 7.76369L9.90239 6.18246L13.8926 12.565C13.9606 12.6737 14.1 12.7128 14.2146 12.6553C14.3291 12.5978 14.3811 12.4627 14.3345 12.3433L10.6574 2.90814ZM8.23968 9.08197C8.3038 8.97153 8.27369 8.83046 8.17006 8.75583C8.06644 8.68119 7.92309 8.69734 7.83866 8.79315L1.81201 15.6323C1.75416 15.6979 1.73514 15.7892 1.76194 15.8725C1.78874 15.9558 1.8574 16.0188 1.94268 16.0384L7.96933 17.4236C8.08396 17.45 8.20134 17.3923 8.25051 17.2854C8.29968 17.1786 8.26713 17.0519 8.17256 16.982L5.01038 14.6441L8.23968 9.08197ZM16.2431 10.7079C16.204 10.5929 16.0874 10.5232 15.9675 10.543C15.8477 10.5629 15.7598 10.6665 15.7598 10.788V14.6852L8.40437 14.8292C8.27597 14.8317 8.17068 14.9317 8.16156 15.0598C8.15245 15.1879 8.24252 15.3018 8.36927 15.3225L17.9617 16.8866C18.0478 16.9007 18.135 16.8685 18.1913 16.8019C18.2476 16.7353 18.2649 16.6441 18.2367 16.5615L16.2431 10.7079Z"
        fill="var(--geist-foreground)"
        fillRule="evenodd"
        stroke="var(--geist-foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.2"
      ></path>
    </svg>
  );
}
