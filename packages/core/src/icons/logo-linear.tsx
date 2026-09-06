"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function LogoLinear({
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
        d="M1.17156 9.61319C1.14041 9.4804 1.2986 9.39676 1.39505 9.49321L6.50679 14.6049C6.60323 14.7014 6.5196 14.8596 6.38681 14.8284C3.80721 14.2233 1.77669 12.1928 1.17156 9.61319ZM1.00026 7.56447C0.997795 7.60413 1.01271 7.64286 1.0408 7.67096L8.32904 14.9592C8.35714 14.9873 8.39586 15.0022 8.43553 14.9997C8.76721 14.9791 9.09266 14.9353 9.41026 14.8701C9.51729 14.8481 9.55448 14.7166 9.47721 14.6394L1.36063 6.52279C1.28337 6.44552 1.15187 6.48271 1.12989 6.58974C1.06466 6.90734 1.02092 7.23278 1.00026 7.56447ZM1.58953 5.15875C1.56622 5.21109 1.57809 5.27224 1.6186 5.31275L10.6872 14.3814C10.7278 14.4219 10.7889 14.4338 10.8412 14.4105C11.0913 14.2991 11.3336 14.1735 11.5672 14.0347C11.6445 13.9888 11.6564 13.8826 11.5929 13.819L2.18099 4.40714C2.11742 4.34356 2.01121 4.35549 1.96529 4.43278C1.8265 4.66636 1.70091 4.9087 1.58953 5.15875ZM2.77222 3.53036C2.7204 3.47854 2.7172 3.39544 2.76602 3.34079C4.04913 1.9043 5.9156 1 7.99327 1C11.863 1 15 4.13702 15 8.00673C15 10.0844 14.0957 11.9509 12.6592 13.234C12.6046 13.2828 12.5215 13.2796 12.4696 13.2278L2.77222 3.53036Z"
        fill="#5E6AD2"
      />
    </svg>
  );
}
