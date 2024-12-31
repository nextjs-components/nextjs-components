"use client";

import React from "react";
import type { CSSProperties } from "react";

import { useIconSize } from "../contexts/IconSizeContext";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export default function LogoRust({
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
        d="M6.71709 5.81132H8.67935C9.8869 5.81132 9.8869 7.01887 8.67935 7.01887H6.71709V5.81132ZM2.03784 11.3962H8.07558V9.73585H6.71709V8.5283H8.22652C9.8869 8.5283 8.98124 11.3962 10.3397 11.3962H14.1133V8.5283H13.2077V8.83019C13.2077 10.0377 11.8492 9.88679 11.6982 9.13208C11.5473 8.37736 10.9435 7.77359 10.7926 7.77359C13.0567 6.56604 11.6982 4.15094 9.8869 4.15094H2.79256V5.81132H4.30199V9.73585H2.03784V11.3962Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.150943}
        strokeLinejoin="round"
      />
      <path
        d="M8.00009 14.4906C11.5847 14.4906 14.4907 11.5846 14.4907 8C14.4907 4.41536 11.5847 1.50943 8.00009 1.50943C4.41545 1.50943 1.50952 4.41536 1.50952 8C1.50952 11.5846 4.41545 14.4906 8.00009 14.4906Z"
        stroke="currentColor"
        strokeWidth={1.35849}
        fill="transparent"
      />
      <path
        d="M14.9436 8.45283L15.6983 8L14.9436 7.54717V8.45283Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M14.7218 9.79872L15.5503 9.50183L14.8984 8.91046L14.7218 9.79872Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M14.2418 11.0755L15.1124 10.9459L14.5884 10.2388L14.2418 11.0755Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M13.5217 12.2341L14.4008 12.2768L14.0249 11.481L13.5217 12.2341Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M12.5896 13.2299L13.4434 13.4434L13.23 12.5895L12.5896 13.2299Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M11.4811 14.0248L12.2769 14.4007L12.2341 13.5216L11.4811 14.0248Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M10.239 14.5882L10.9461 15.1121L11.0757 14.2416L10.239 14.5882Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M8.91057 14.8983L9.50194 15.5502L9.79883 14.7216L8.91057 14.8983Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M7.54722 14.9434L8.00005 15.6981L8.45288 14.9434H7.54722Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M6.20134 14.7216L6.49823 15.5502L7.0896 14.8983L6.20134 14.7216Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M4.92475 14.2416L5.0543 15.1121L5.76147 14.5882L4.92475 14.2416Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M3.76601 13.5216L3.72323 14.4007L4.51904 14.0248L3.76601 13.5216Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M2.77025 12.5895L2.55678 13.4434L3.41064 13.2299L2.77025 12.5895Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M1.97536 11.481L1.59941 12.2768L2.47852 12.2341L1.97536 11.481Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M1.41196 10.2388L0.887987 10.9459L1.75854 11.0755L1.41196 10.2388Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M1.10188 8.91046L0.450006 9.50183L1.27856 9.79872L1.10188 8.91046Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M1.05664 7.54717L0.301924 8L1.05664 8.45284V7.54717Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M1.27849 6.20128L0.449934 6.49817L1.10181 7.08954L1.27849 6.20128Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M1.75845 4.92452L0.887888 5.05406L1.41187 5.76124L1.75845 4.92452Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M2.4785 3.76594L1.5994 3.72316L1.97534 4.51897L2.4785 3.76594Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M3.41066 2.77008L2.5568 2.55661L2.77026 3.41048L3.41066 2.77008Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M4.51914 1.9752L3.72333 1.59925L3.76611 2.47836L4.51914 1.9752Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M5.76128 1.41185L5.0541 0.887872L4.92456 1.75843L5.76128 1.41185Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M7.08967 1.10168L6.49831 0.449804L6.20142 1.27836L7.08967 1.10168Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M8.45302 1.05661L8.00019 0.301889L7.54736 1.05661L8.45302 1.05661Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M9.7989 1.27836L9.50201 0.449804L8.91064 1.10168L9.7989 1.27836Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M11.0755 1.75843L10.9459 0.887873L10.2388 1.41185L11.0755 1.75843Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M12.2342 2.47835L12.277 1.59925L11.4812 1.9752L12.2342 2.47835Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M13.23 3.41048L13.4435 2.55661L12.5896 2.77008L13.23 3.41048Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M14.0249 4.51897L14.4008 3.72316L13.5217 3.76594L14.0249 4.51897Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M14.5883 5.76124L15.1123 5.05406L14.2417 4.92452L14.5883 5.76124Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M14.8984 7.08954L15.5502 6.49817L14.7217 6.20128L14.8984 7.08954Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.45283}
        strokeLinejoin="round"
      />
      <path
        d="M6.94336 1.66038L7.99996 2.71698L9.05657 1.66038H6.94336Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.90566}
        strokeLinejoin="round"
      />
      <path
        d="M13.7026 5.03606L13.0243 6.36746L14.3557 7.04584L13.7026 5.03606Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.90566}
        strokeLinejoin="round"
      />
      <path
        d="M12.5811 12.5078L11.1052 12.2741L10.8714 13.7499L12.5811 12.5078Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.90566}
        strokeLinejoin="round"
      />
      <path
        d="M5.12842 13.7499L4.89466 12.274L3.4188 12.5078L5.12842 13.7499Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.90566}
        strokeLinejoin="round"
      />
      <path
        d="M1.64404 7.04584L2.97544 6.36746L2.29706 5.03606L1.64404 7.04584Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.90566}
        strokeLinejoin="round"
      />
    </svg>
  );
}
