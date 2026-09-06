"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function LogoNode({
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
      <mask
        id="mask0_872_3158"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="1"
        y="0"
        width="14"
        height="16"
      >
        <path
          d="M7.62322 0.101215L1.37744 3.72072C1.1435 3.85617 1 4.10623 1 4.37653V11.6206C1 11.8911 1.1435 12.141 1.37744 12.2764L7.62367 15.8987C7.85716 16.0338 8.14506 16.0338 8.37826 15.8987L14.6234 12.2764C14.8562 12.141 15 11.8909 15 11.6206V4.37653C15 4.10623 14.8562 3.85617 14.622 3.72072L8.37767 0.101215C8.26055 0.0337871 8.13009 0 7.99963 0C7.86917 0 7.73871 0.0337871 7.62159 0.101215"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_872_3158)">
        <path
          d="M21.3115 3.10613L3.71197 -5.55525L-5.31201 12.9276L12.2871 21.5894L21.3115 3.10613Z"
          fill="url(#paint0_linear_872_3158)"
        />
      </g>
      <mask
        id="mask1_872_3158"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="1"
        y="0"
        width="14"
        height="16"
      >
        <path
          d="M1.15454 12.0805C1.21429 12.1584 1.289 12.2258 1.37692 12.2764L6.73468 15.3836L7.62714 15.8986C7.76057 15.976 7.91267 16.0087 8.06211 15.9976C8.11192 15.9936 8.16173 15.9842 8.21036 15.9703L14.7977 3.86019C14.7473 3.80511 14.6883 3.75897 14.6222 3.72027L10.5325 1.34915L8.37077 0.100323C8.30939 0.0646001 8.24282 0.0392964 8.17507 0.0214348L1.15454 12.0805Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask1_872_3158)">
        <path
          d="M-6.45459 5.66793L5.97248 22.555L22.4075 10.3636L9.97968 -6.52305L-6.45459 5.66793Z"
          fill="url(#paint1_linear_872_3158)"
        />
      </g>
      <mask
        id="mask2_872_3158"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="1"
        y="0"
        width="14"
        height="16"
      >
        <path
          d="M7.92494 0.00417044C7.82013 0.0145897 7.71769 0.0473349 7.62325 0.101217L1.39526 3.7103L8.11099 15.9916C8.20439 15.9782 8.29631 15.947 8.37933 15.8988L14.6251 12.2764C14.8178 12.1642 14.9498 11.9743 14.9898 11.759L8.14361 0.0165236C8.0932 0.00655088 8.0428 0.00134277 7.99091 0.00134277C7.97016 0.00134277 7.9494 0.00238306 7.92865 0.00431807"
          fill="white"
        />
      </mask>
      <g mask="url(#mask2_872_3158)">
        <path
          d="M1.39502 0.00134277V15.9919H14.987V0.00134277H1.39502Z"
          fill="url(#paint2_linear_872_3158)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_872_3158"
          x1="12.5064"
          y1="-1.23818"
          x2="3.42452"
          y2="17.2146"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.3" stopColor="#3E863D" />
          <stop offset="0.5" stopColor="#55934F" />
          <stop offset="0.8" stopColor="#5AAD45" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_872_3158"
          x1="-0.166585"
          y1="14.2083"
          x2="16.3156"
          y2="2.07868"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.57" stopColor="#3E863D" />
          <stop offset="0.72" stopColor="#619857" />
          <stop offset="1" stopColor="#76AC64" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_872_3158"
          x1="1.39961"
          y1="7.99708"
          x2="14.9896"
          y2="7.99708"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.16" stopColor="#6BBF47" />
          <stop offset="0.38" stopColor="#79B461" />
          <stop offset="0.47" stopColor="#75AC64" />
          <stop offset="0.7" stopColor="#659E5A" />
          <stop offset="0.9" stopColor="#3E863D" />
        </linearGradient>
      </defs>
    </svg>
  );
}
