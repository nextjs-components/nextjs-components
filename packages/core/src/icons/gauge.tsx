"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function Gauge({
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
        d="M8.99107 1.57556C7.01494 1.27234 4.92586 1.88176 3.40381 3.40381C0.865398 5.94221 0.865398 10.0578 3.40381 12.5962L3.93414 13.1265L2.87348 14.1872L2.34315 13.6569C-0.781049 10.5327 -0.781049 5.46734 2.34315 2.34315C4.40973 0.276566 7.32564 -0.423021 9.96727 0.244385L8.99107 1.57556ZM13.8304 5.12254C15.0295 7.55167 14.6181 10.5743 12.5962 12.5962L12.0659 13.1265L13.1265 14.1872L13.6569 13.6569C16.334 10.9797 16.7171 6.87715 14.8061 3.79209L13.8304 5.12254ZM8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9ZM8 10.5C9.38071 10.5 10.5 9.38071 10.5 8C10.5 7.42572 10.3064 6.89666 9.98082 6.47456L13.4475 2.14119C13.0815 1.80067 12.6834 1.49405 12.2585 1.22632L8.74837 5.61394C8.51209 5.53991 8.2607 5.5 8 5.5C6.61929 5.5 5.5 6.61929 5.5 8C5.5 9.38071 6.61929 10.5 8 10.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
