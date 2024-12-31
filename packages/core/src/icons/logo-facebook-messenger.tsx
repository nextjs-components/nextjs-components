"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function LogoFacebookMessenger({
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
        d="M8 0C3.494 0 0 3.302 0 7.76C0 10.092 0.956 12.108 2.512 13.5C2.642 13.616 2.722 13.78 2.726 13.956L2.77 15.38C2.7732 15.4848 2.80209 15.5872 2.85413 15.6782C2.90617 15.7692 2.97976 15.846 3.06844 15.9019C3.15712 15.9578 3.25818 15.991 3.36272 15.9987C3.46726 16.0064 3.57209 15.9883 3.668 15.946L5.256 15.246C5.39 15.186 5.542 15.176 5.684 15.214C6.414 15.414 7.19 15.522 8 15.522C12.506 15.522 16 12.22 16 7.762C16 3.304 12.506 0 8 0Z"
        fill="url(#paint0_radial_4759_1851)"
      />
      <path
        d="M3.19576 10.03L5.54576 6.30202C5.63417 6.16167 5.75071 6.04116 5.88803 5.94812C6.02536 5.85507 6.18048 5.79151 6.34361 5.76144C6.50674 5.73137 6.67433 5.73545 6.8358 5.77341C6.99728 5.81138 7.14913 5.88241 7.28176 5.98202L9.15176 7.38402C9.23525 7.44652 9.33681 7.48014 9.4411 7.47977C9.54538 7.47941 9.64672 7.4451 9.72976 7.38202L12.2538 5.46602C12.5898 5.21002 13.0298 5.61402 12.8058 5.97202L10.4538 9.69802C10.3654 9.83838 10.2488 9.95888 10.1115 10.0519C9.97417 10.145 9.81905 10.2085 9.65592 10.2386C9.49279 10.2687 9.3252 10.2646 9.16372 10.2266C9.00225 10.1887 8.8504 10.1176 8.71776 10.018L6.84776 8.61602C6.76428 8.55352 6.66271 8.51991 6.55843 8.52027C6.45414 8.52063 6.35281 8.55494 6.26976 8.61802L3.74576 10.534C3.40976 10.79 2.96976 10.388 3.19576 10.03Z"
        fill="white"
      />
      <defs>
        <radialGradient
          id="paint0_radial_4759_1851"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(2.68 16) scale(17.6)"
        >
          <stop
            stopColor="#0099FF"
            style={{
              stopColor: "#0099ff",
              stopColor: "color(display-p3 0 0.6 1)",
              stopOpacity: "1",
            }}
          />
          <stop
            offset="0.6"
            stopColor="#A033FF"
            style={{
              stopColor: "#a033ff",
              stopColor: "color(display-p3 0.6275 0.2 1)",
              stopOpacity: "1",
            }}
          />
          <stop
            offset="0.9"
            stopColor="#FF5280"
            style={{
              stopColor: "#ff5280",
              stopColor: "color(display-p3 1 0.3216 0.502)",
              stopOpacity: "1",
            }}
          />
          <stop
            offset="1"
            stopColor="#FF7061"
            style={{
              stopColor: "#ff7061",
              stopColor: "color(display-p3 1 0.4392 0.3804)",
              stopOpacity: "1",
            }}
          />
        </radialGradient>
      </defs>
    </svg>
  );
}
