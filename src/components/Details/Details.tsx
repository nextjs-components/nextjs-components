import clsx from "clsx";
import styles from "./details.module.css";

interface DetailsProps {
  animate?: boolean;
  heightClosed?: number; // 32
  heightOpened?: number; // 400
  open?: boolean;
  summary?: React.ReactNode | string;
}

const Details: React.FC<DetailsProps> = ({
  children,
  heightClosed = 32,
  heightOpened = 400,
  summary,
  open,
}) => {
  return (
    <details
      open={open}
      className={styles.details}
      style={{
        // @ts-ignore
        "--details-open-height": heightOpened,
        "--details-closed-height": heightClosed,
      }}
    >
      <summary
        className={styles.summary}
        onClick={(e) => {
          if (typeof open !== "undefined") {
            e.preventDefault();
          }
        }}
      >
        <div>
          {children && (
            <span className={styles.icon}>
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                shapeRendering="geometricPrecision"
                style={{ color: "currentColor" }}
              >
                <path d="M9 18l6-6-6-6"></path>
              </svg>
            </span>
          )}
          {summary}
        </div>
      </summary>
      {children}
    </details>
  );
};

export default Details;
