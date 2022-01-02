import { useIconSize } from "contexts/IconSizeContext";

const ArrowUp = ({ color = "currentcolor" }) => {
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
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  );
};

export default ArrowUp;
