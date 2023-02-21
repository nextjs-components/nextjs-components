import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function Pin({ color = "currentcolor", size, ...props }: Props) {
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
      <path d="M6.52 10.2l4.24 5.65m.01-9.9a2 2 0 000-2.83l-.7-.71L3 9.49l.7.7a1.998 1.998 0 002.83 0m4.24 5.66l5.66-5.66m-5.66 5.66s-1.76 2.47.71 4.95l9.89-9.9c-2.47-2.48-4.95-.7-4.95-.7m-5.65 5.65l5.65-5.65m0 0l-5.66-4.25m5.66 9.9l4.24 4.24"></path>
    </svg>
  );
}
