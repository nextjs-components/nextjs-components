"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function LogoNewRelic({
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
        d="M12.261 5.53863V10.4613L7.99854 12.9232V16L14.9272 12.0002V3.99973L12.261 5.53863Z"
        fill="#00AC69"
        style={{
          fill: "#00ac69",
          fill: "color(display-p3 0 0.6745 0.4118)",
          fillOpacity: "1",
        }}
      />
      <path
        d="M7.99893 3.07782L12.2614 5.53866L14.9275 3.99976L7.99893 0L1.07031 3.99976L3.73547 5.53866L7.99893 3.07782Z"
        fill="#1CE783"
        style={{
          fill: "#1ce783",
          fill: "color(display-p3 0.1098 0.9059 0.5137)",
          fillOpacity: "1",
        }}
      />
      <path
        d="M5.33352 9.53937V14.4621L7.99868 16V8.00046L1.07007 3.99969V7.07751L5.33352 9.53937Z"
        fill="#1D252C"
        style={{
          fill: "#1d252c",
          fill: "color(display-p3 0.1137 0.1451 0.1725)",
          fillOpacity: "1",
        }}
      />
    </svg>
  );
}
