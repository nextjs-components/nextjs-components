import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function Geist({
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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.67025 6.612L9.09631 7.63233L10.4037 8.36772L10.9772 7.34818C10.4872 7.1987 10.0429 6.94464 9.67025 6.612ZM13.0228 7.34818L13.5963 8.36772L14.9037 7.63233L14.3297 6.612C13.9571 6.94464 13.5128 7.1987 13.0228 7.34818ZM6.41944 20.75C6.4722 20.5084 6.49999 20.2574 6.49999 20C6.49999 19.7426 6.4722 19.4916 6.41945 19.25H7.49999V20.75H6.41944ZM5.32976 17.388L5.90367 16.3677L4.59631 15.6323L4.02284 16.6518C4.51277 16.8013 4.95708 17.0554 5.32976 17.388ZM17.5805 19.25C17.5278 19.4916 17.5 19.7426 17.5 20C17.5 20.2574 17.5278 20.5084 17.5805 20.75H16.5V19.25H17.5805ZM19.9771 16.6518C19.4872 16.8013 19.0429 17.0554 18.6702 17.388L18.0963 16.3677L19.4037 15.6323L19.9771 16.6518ZM9.50367 9.96772L8.60367 11.5677L7.29631 10.8323L8.19631 9.23233L9.50367 9.96772ZM7.70367 13.1677L6.80367 14.7677L5.49631 14.0323L6.39631 12.4323L7.70367 13.1677ZM15.3963 11.5677L14.4963 9.96772L15.8037 9.23233L16.7037 10.8323L15.3963 11.5677ZM17.1963 14.7677L16.2963 13.1677L17.6037 12.4323L18.5037 14.0323L17.1963 14.7677ZM12.9 20.75H14.7V19.25H12.9V20.75ZM9.29999 20.75H11.1V19.25H9.29999V20.75Z"
        fill="currentColor"
        strokeWidth="0"
      ></path>
      <circle
        cx="12"
        cy="4"
        r="2"
        stroke="currentColor"
        strokeWidth="1.5"
      ></circle>
      <circle
        cx="3"
        cy="20"
        r="2"
        stroke="currentColor"
        strokeWidth="1.5"
      ></circle>
      <circle
        cx="21"
        cy="20"
        r="2"
        stroke="currentColor"
        strokeWidth="1.5"
      ></circle>
    </svg>
  );
}
