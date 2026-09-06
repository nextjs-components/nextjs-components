"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function AcronymCsv({
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
      viewBox="0 0 21 16"
      width={width}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5 2.25H18.5C19.1904 2.25 19.75 2.80964 19.75 3.5V12.5C19.75 13.1904 19.1904 13.75 18.5 13.75H2.5C1.80964 13.75 1.25 13.1904 1.25 12.5V3.5C1.25 2.80964 1.80964 2.25 2.5 2.25ZM0 3.5C0 2.11929 1.11929 1 2.5 1H18.5C19.8807 1 21 2.11929 21 3.5V12.5C21 13.8807 19.8807 15 18.5 15H2.5C1.11929 15 0 13.8807 0 12.5V3.5ZM10.25 6.875C10.25 6.66789 10.4179 6.5 10.625 6.5H12V5H10.625C9.58947 5 8.75 5.83947 8.75 6.875C8.75 7.91053 9.58947 8.75 10.625 8.75C10.8321 8.75 11 8.91789 11 9.125C11 9.33211 10.8321 9.5 10.625 9.5H9V11H10.625C11.6605 11 12.5 10.1605 12.5 9.125C12.5 8.08947 11.6605 7.25 10.625 7.25C10.4179 7.25 10.25 7.08211 10.25 6.875ZM15.5 5V8.33579C15.5 8.40209 15.5263 8.46568 15.5732 8.51256L16 8.93934L16.4268 8.51256C16.4737 8.46568 16.5 8.40209 16.5 8.33579V5H18V8.33579C18 8.79991 17.8156 9.24504 17.4874 9.57322L16.5303 10.5303L16 11.0607L15.4697 10.5303L14.5126 9.57322C14.1844 9.24503 14 8.79991 14 8.33579V5H15.5ZM5.375 5C4.06332 5 3 6.06332 3 7.375V8.625C3 9.93668 4.06332 11 5.375 11C6.68668 11 7.75 9.93668 7.75 8.625V8.5H6.25V8.625C6.25 9.10825 5.85825 9.5 5.375 9.5C4.89175 9.5 4.5 9.10825 4.5 8.625V7.375C4.5 6.89175 4.89175 6.5 5.375 6.5H5.5C5.91421 6.5 6.25 6.83579 6.25 7.25H7.75C7.75 6.00736 6.74264 5 5.5 5H5.375Z"
        fill="currentColor"
      />
    </svg>
  );
}
