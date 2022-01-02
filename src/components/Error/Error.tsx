import clsx from "clsx";
import { AlertCircle } from "icons";
import styles from "./error.module.css";

interface ErrorProps {
  label?: string;
  size?: "small" | "large";
}
const Error: React.ComponentType<ErrorProps> = ({
  label = "Error",
  children,
  size,
}) => {
  return (
    <div
      className={clsx(styles.error, {
        [styles.small]: size === "small",
        [styles.large]: size === "large",
      })}
    >
      <div aria-hidden="true">
        <AlertCircle color="var(--geist-error)" width={20} height={20} />
      </div>
      <div className={styles.text}>
        <b>{label}:</b>
        <span
          aria-hidden="true"
          className={clsx("geist-spacer", "inline")}
          style={{ marginLeft: "5px" }}
        />
        {children}
      </div>
    </div>
  );
};

export default Error;
