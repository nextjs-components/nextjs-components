import { useIconSize } from "contexts/IconSizeContext";

const MoreHorizontal = ({ color = "currentColor" }) => {
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
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="19" cy="12" r="1" fill="currentColor" />
      <circle cx="5" cy="12" r="1" fill="currentColor" />
    </svg>
  );
};

export default MoreHorizontal;
