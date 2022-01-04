import React from "react";
import clsx from "clsx";

import { CopyIcon } from "../../icons";
import { useToasts } from "../Toast";

import styles from "./Snippet.module.css";

interface Props {
  prompt?: boolean;
  text: string | string[];
  width?: React.CSSProperties["width"];
  display?: string;
  type?: "success" | "error" | "warning" | "secondary" | "lite";
  fill?: boolean;
}
const Snippet: React.ComponentType<Props> = ({
  prompt = true,
  width,
  text,
  type,
  fill,
}) => {
  const toasts = useToasts();
  return (
    <div
      className={clsx(styles.snippet, {
        [styles.prompt]: prompt,
        ["geist-themed"]: !!type,
        [`geist-${type}`]: !!type,
        [`geist-${type}-fill`]: !!type && !!fill,
      })}
      style={{ width }}
    >
      {Array.isArray(text) ? (
        text.map((e, i) => {
          const key = `${e}-${i}`;
          return (
            <pre key={key} className="geist-overflow-scroll-y">
              {e}
            </pre>
          );
        })
      ) : (
        <pre className="geist-overflow-scroll-y">{text}</pre>
      )}

      <button
        aria-label="Copy text to clipboard"
        className={clsx("geist-reset", styles.copy)}
        onClick={() => {
          navigator.clipboard.writeText(
            Array.isArray(text) ? text.join("\n") : text
          );
          toasts.current?.message({ text: "Copied to clipboard!" });
        }}
      >
        <CopyIcon height={22} width={22} />
      </button>
    </div>
  );
};

export default Snippet;
