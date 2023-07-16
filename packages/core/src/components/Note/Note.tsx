import clsx from "clsx";

import AlertOctagon from "../../icons/alert-octagon";
import AlertTriangle from "../../icons/alert-triangle";
import CheckInCircle from "../../icons/check-in-circle";
import Info from "../../icons/info";
import styles from "./Note.module.css";

interface Props {
  size?: "small" | "large";
  /**
   * action={<Button size="small">Upgrade</Button>}
   */
  action?: React.ReactNode;
  type?: "secondary" | "success" | "error" | "warning" | "violet" | "cyan";
  label?: false | string;
  /** @deprecated */
  small?: boolean;
  fill?: boolean;
  style?: React.CSSProperties;
}

const Icon = ({ type }: { type?: Props["type"] }) => {
  let icon = null;
  if (!type || type === "secondary" || type === "violet" || type === "cyan") {
    icon = <Info size={16} />;
  }
  if (type === "success") {
    icon = <CheckInCircle size={16} />;
  }
  if (type === "warning") {
    icon = <AlertTriangle size={16} />;
  }
  if (type === "error") {
    icon = <AlertOctagon size={16} />;
  }
  return (
    <span
      style={{
        transform: `translateY(3px)`,
        display: `inline-block`,
      }}
    >
      {icon}
    </span>
  );
};

const Note: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  size,
  label,
  action,
  type,
  fill,
  style, // for mdx
}) => {
  return (
    <div
      {...{ style }}
      className={clsx(
        styles.note,
        // - .v3-colors replaces .geist-themed
        "v3-colors",
        {
          [styles.small]: size === "small",
          [styles.large]: size === "large",
          ["geist-secondary"]: type === "secondary",
          ["geist-success"]: type === "success",
          ["geist-error"]: type === "error",
          ["geist-warning"]: type === "warning",
          ["geist-cyan"]: type === "cyan",
          ["geist-violet"]: type === "violet",
          ["geist-secondary-fill"]: fill && type === "secondary",
          ["geist-success-fill"]: fill && type === "success",
          ["geist-error-fill"]: fill && type === "error",
          ["geist-warning-fill"]: fill && type === "warning",
          ["geist-cyan-fill"]: fill && type === "cyan",
          ["geist-violet-fill"]: fill && type === "violet",
        },
      )}
    >
      <span
        style={{
          display: "flex",
          gap: label ? 4 : 8,
        }}
      >
        {typeof label === "string" ? (
          <span className={"geist-text span"}>
            <b>{label}</b>
          </span>
        ) : null}
        {label === false ? undefined : null}
        {label === undefined ? <Icon type={type} /> : null}
        <span>{children}</span>
      </span>
      {action && <div>{action}</div>}
    </div>
  );
};

export default Note;
