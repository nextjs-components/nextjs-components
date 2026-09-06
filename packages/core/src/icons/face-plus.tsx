"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function FacePlus({
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
        d="M12.375 5.375V4.75V3.625H11.25H10.625V2.375H11.25H12.375V1.25V0.625H13.625V1.25V2.375H14.75H15.375V3.625H14.75H13.625V4.75V5.375H12.375ZM7.5 2.5C4.18629 2.5 1.5 5.18629 1.5 8.5C1.5 11.8137 4.18629 14.5 7.5 14.5C10.8137 14.5 13.5 11.8137 13.5 8.5C13.5 8.00249 13.4396 7.52012 13.3261 7.05939L14.7826 6.70061C14.9248 7.27782 15 7.88064 15 8.5C15 12.6421 11.6421 16 7.5 16C3.35786 16 0 12.6421 0 8.5C0 4.35786 3.35786 1 7.5 1C8.11936 1 8.72218 1.07524 9.29939 1.21742L8.94061 2.67388C8.47988 2.56039 7.99751 2.5 7.5 2.5ZM4.78814 9.89406L5.18309 10.3785C5.73216 11.0519 6.56631 11.4802 7.50098 11.4802C8.43565 11.4802 9.26979 11.0519 9.81886 10.3785L10.2138 9.89406L11.1826 10.684L10.7876 11.1684C10.0114 12.1204 8.82714 12.7302 7.50098 12.7302C6.17481 12.7302 4.99057 12.1204 4.2143 11.1684L3.81935 10.684L4.78814 9.89406ZM5.5 8C6.05228 8 6.5 7.55228 6.5 7C6.5 6.44772 6.05228 6 5.5 6C4.94772 6 4.5 6.44772 4.5 7C4.5 7.55228 4.94772 8 5.5 8ZM10.5 7C10.5 7.55228 10.0523 8 9.5 8C8.94771 8 8.5 7.55228 8.5 7C8.5 6.44772 8.94771 6 9.5 6C10.0523 6 10.5 6.44772 10.5 7Z"
        fill="currentColor"
      />
    </svg>
  );
}
