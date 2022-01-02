import { useIconSize } from "contexts/IconSizeContext";

const StopCirccle = ({ color = "currentColor)" }) => {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M9 9h6v6H9z" />
    </svg>
  );
};

export default StopCirccle;
