import clsx from "clsx";
import React, { useState } from "react";
import { useFocus } from "react-aria";

import CopyIcon from "../../icons/copy";
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

  const [focused, setFocused] = useState(false);
  const { focusProps } = useFocus({
    onFocusChange: setFocused,
  });

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
        {...focusProps}
        aria-label="Copy text to clipboard"
        className={clsx("geist-reset", styles.copy, {
          ["focus-visible"]: focused,
        })}
        data-focus-visible-added={focused ? "" : undefined}
        onClick={() => {
          navigator.clipboard.writeText(
            Array.isArray(text) ? text.join("\n") : text,
          );
          toasts.current?.message({ text: "Copied to clipboard!" });
        }}
      >
        <CopyIcon size={22} />
      </button>
    </div>
  );
};

export default Snippet;
