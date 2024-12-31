"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function AccessibilityUnread({
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
      <circle cx="13.5" cy="2.5" r="2.5" fill="var(--ds-blue-900)" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0351 4.5H2V6H4.67148C5.89632 6 6.83343 7.09104 6.64857 8.30185L6.43 9.73346C6.3381 10.2159 6.1906 10.6874 6 11.1401L4.33 15.2L5.92164 15.888L7.594 11.9162C7.72668 11.6011 8.27332 11.6011 8.406 11.9162L10.0784 15.888L11.67 15.2L10 11.1401C9.8094 10.6874 9.6619 10.2159 9.57 9.73346L9.2835 8.42904C9.00946 7.18131 9.95947 6 11.2369 6H11.562C10.9272 5.64775 10.3983 5.12781 10.0351 4.5ZM9.5 1.5C9.5 2.32843 8.82843 3 8 3C7.17157 3 6.5 2.32843 6.5 1.5C6.5 0.671573 7.17157 0 8 0C8.82843 0 9.5 0.671573 9.5 1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
