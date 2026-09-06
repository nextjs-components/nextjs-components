"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function MicrophoneOff({
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
        d="M15.5575 15.0813L15.0694 14.5119L12.5082 11.5238C13.4818 10.6496 14.2004 9.49577 14.5373 8.18692L14.7242 7.4606L13.2716 7.08671L13.0846 7.81304C12.8262 8.81714 12.2773 9.70629 11.5317 10.3846L10.3921 9.05497C11.0739 8.41634 11.5 7.50792 11.5 6.49998V3.49998C11.5 1.56698 9.93299 -2.05487e-05 7.99999 -2.05487e-05C6.45484 -2.05487e-05 5.14355 1.00125 4.67954 2.39035L3.06943 0.511886L2.58134 -0.0575562L1.44245 0.918631L1.93055 1.48807L13.9305 15.4881L14.4186 16.0575L15.5575 15.0813ZM5.99999 3.93087V3.49998C5.99999 2.39541 6.89542 1.49998 7.99999 1.49998C9.10456 1.49998 9.99999 2.39541 9.99999 3.49998V6.49998C9.99999 7.05119 9.77754 7.55128 9.41436 7.9143L5.99999 3.93087ZM1.46269 8.18692L1.27574 7.4606L2.7284 7.08671L2.91534 7.81304C3.49819 10.0776 5.55473 11.75 7.99999 11.75H8.74999L8.74999 12.5L8.74999 13.25L8.74999 15.25V16H7.24999V15.25V13.2088C4.44029 12.8983 2.15159 10.8635 1.46269 8.18692Z"
        fill="currentColor"
      />
    </svg>
  );
}
