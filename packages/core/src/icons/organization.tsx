import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function Organization({
  color = "currentcolor",
  size,
  ...props
}: Props) {
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
      <path d="M17.4662 10.8176L20.0981 11.9361C20.7965 12.233 21.25 12.9184 21.25 13.6773V19.8041C21.25 20.3265 20.8265 20.75 20.3041 20.75H17.4662L17.4662 5.14189C17.4662 4.09703 16.6192 3.25 15.5743 3.25H5.64189C4.59703 3.25 3.75 4.09703 3.75 5.14189V20.75M12.7365 20.75V16.9662C12.7365 16.705 12.5247 16.4932 12.2635 16.4932H8.9527C8.69149 16.4932 8.47973 16.705 8.47973 16.9662V20.75M8.47973 7.03378H8.9527M12.2635 7.03378H12.7365M8.47973 9.87162H8.9527M12.2635 9.87162H12.7365M8.47973 12.7095H8.9527M12.2635 12.7095H12.7365"></path>
    </svg>
  );
}
