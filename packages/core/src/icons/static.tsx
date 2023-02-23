import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function Static({
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
      <path
        d="M12.3509 4.60204L17.6961 9.78521C17.8904 9.97356 18 10.2326 18 10.5031V18.6799C18 19.2322 17.5523 19.6799 17 19.6799H7C6.44772 19.6799 6 19.2322 6 18.6799V5.31995C6 4.76766 6.44772 4.31995 7 4.31995H11.6548C11.9147 4.31995 12.1643 4.42112 12.3509 4.60204Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      ></path>
      <path
        d="M11.3999 4.31995V10.6199H18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
