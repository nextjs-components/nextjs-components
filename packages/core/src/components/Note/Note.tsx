import clsx from "clsx";

import CheckCircle from "../../icons/check-circle";
import Information from "../../icons/information";
import Stop from "../../icons/stop";
import Warning from "../../icons/warning";
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
  disabled?: boolean;
}

const Icon = ({ type }: { type?: Props["type"] }) => {
  let icon = null;
  if (!type || type === "secondary" || type === "violet" || type === "cyan") {
    icon = <Information size={16} />;
  }
  if (type === "success") {
    icon = <CheckCircle size={16} />;
  }
  if (type === "warning") {
    icon = <Warning size={16} />;
  }
  if (type === "error") {
    icon = <Stop size={16} />;
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
  disabled,
}) => {
  return (
    <div
      data-geist-note=""
      data-version="v1"
      {...{ style }}
      className={clsx(
        styles.note,
        {
          [styles.small]: size === "small",
          [styles.large]: size === "large",
          [styles.disabled]: disabled,
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
        "v3-colors", // - .v3-colors replaces .geist-themed
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
