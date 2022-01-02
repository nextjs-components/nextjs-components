export const MoreVertical = ({
  width = 24,
  height = 24,
  color = "var(--geist-foreground)",
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      style={{ color }}
    >
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="5" r="1" fill="currentColor" />
      <circle cx="12" cy="19" r="1" fill="currentColor" />
    </svg>
  );
};
