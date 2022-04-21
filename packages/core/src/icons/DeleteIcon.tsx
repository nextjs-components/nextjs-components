import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

const DeleteIcon = ({ color = "currentcolor", size }: Props) => {
  const iconSize = useIconSize();
  return (
    <svg
      viewBox="0 0 24 24"
      width={size || iconSize.size}
      height={size || iconSize.size}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      style={{ color }}
    >
      <path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z" />
      <path d="M18 9l-6 6" />
      <path d="M12 9l6 6" />
    </svg>
  );
};
export default DeleteIcon;
