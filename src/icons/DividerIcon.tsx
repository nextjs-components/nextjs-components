const DividerIcon = ({
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
      <path d="M16.88 3.549L7.12 20.451" />
    </svg>
  );
};
export default DividerIcon;
