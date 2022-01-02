import { useIconSize } from "contexts/IconSizeContext";

const Unlock = ({ color = "currentColor" }) => {
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
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 019.9-1" />
    </svg>
  );
};

export default Unlock;
