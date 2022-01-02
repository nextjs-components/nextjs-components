import { useIconSize } from "contexts/IconSizeContext";

export const ChevronUpDown = ({ color = "currentColor" }) => {
  const { size } = useIconSize();
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      style={{ color }}
    >
      <path d="M17 8.517L12 3 7 8.517M7 15.48l5 5.517 5-5.517"></path>
    </svg>
  );
};
