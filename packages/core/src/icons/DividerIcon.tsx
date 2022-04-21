import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

const DividerIcon = ({ color = "currentcolor", size }: Props) => {
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
      <path d="M16.88 3.549L7.12 20.451" />
    </svg>
  );
};
export default DividerIcon;
