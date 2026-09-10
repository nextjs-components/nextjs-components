"use client";

import clsx from "clsx";
import { Highlight, type PrismTheme } from "prism-react-renderer";
import {
  useEffect,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import styles from "./CodeBlock.module.css";
import { CodeBlockFrame, type CodeBlockFrameProps } from "./CodeBlockFrame";
import { Prism } from "./prism";

export type CodeBlockSwitcher = {
  ariaLabel?: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
};

export interface CodeBlockProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  children: string;
  language: string;
  filename?: string;
  hideLineNumbers?: boolean;
  highlightedLinesNumbers?: number[];
  addedLinesNumbers?: number[];
  removedLinesNumbers?: number[];
  switcher?: CodeBlockSwitcher;
  tabs?: CodeBlockSwitcher;
  textToCopy?: string;
  preClassName?: string;
  maxHeight?: CSSProperties["maxHeight"];
  pure?: boolean;
  headerActions?: ReactNode;
  copyButtonPlacement?: "header" | "overlay";
  trackCopy?: () => void;
  v0?: "ask" | "build";
}

// Keep Prism's token classes; colors come from the current Geist theme.
export const codeBlockTheme: PrismTheme = { plain: {}, styles: [] };

function blockHash(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index++) {
    hash = ((hash << 5) - hash + value.charCodeAt(index)) | 0;
  }
  return Math.abs(hash).toString(16).padStart(8, "0").slice(0, 8);
}

function prismLanguage(language: string, filename?: string) {
  if (
    /^(text|plaintext)$/i.test(language) &&
    filename?.toLowerCase().endsWith(".toml")
  )
    return "toml";
  switch (language.toLowerCase()) {
    case "next":
    case "svelte":
    case "astro":
      return "jsx";
    case "vue":
      return "markup";
    case "md":
    case "mdx":
      return "markdown";
    default:
      return language.toLowerCase();
  }
}

export function CodeBlock({
  children,
  language,
  filename,
  className,
  hideLineNumbers = false,
  highlightedLinesNumbers,
  addedLinesNumbers,
  removedLinesNumbers,
  preClassName,
  maxHeight,
  pure = false,
  ...props
}: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);
  const blockId = blockHash(props.id ?? filename ?? children);

  useEffect(() => {
    const activate = () => {
      const id = window.location.hash.slice(1);
      const lines = codeRef.current?.querySelectorAll<HTMLElement>(
        "[data-geist-code-block-line]",
      );
      lines?.forEach((line) => {
        if (line.id === id) {
          line.dataset.active = "true";
          line.scrollIntoView?.({ block: "center" });
        } else {
          delete line.dataset.active;
        }
      });
    };
    activate();
    window.addEventListener("hashchange", activate);
    return () => window.removeEventListener("hashchange", activate);
  }, [blockId]);

  const content = (
    <Highlight
      code={children || ""}
      language={prismLanguage(language, filename)}
      prism={Prism}
      theme={codeBlockTheme}
    >
      {({ className: prismClassName, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={clsx(
            prismClassName,
            styles.pre,
            preClassName,
            pure && styles.pure,
          )}
          style={{ maxHeight }}
        >
          <code
            ref={codeRef}
            className={styles.code}
            data-geist-code-block="true"
            style={{ fontFeatureSettings: '"liga" off' }}
          >
            {tokens.map((line, index) => {
              const number = index + 1;
              const id = `C${blockId}-L${number}`;
              const { key: _lineKey, ...lineProps } = getLineProps({ line });
              return (
                <div
                  key={index}
                  className="line"
                  data-geist-code-block-line="true"
                  id={id}
                  data-highlighted={highlightedLinesNumbers?.includes(number)}
                  data-added={addedLinesNumbers?.includes(number)}
                  data-removed={removedLinesNumbers?.includes(number)}
                  style={{ fontFeatureSettings: '"liga" off' }}
                >
                  {!hideLineNumbers && (
                    <button
                      aria-hidden="true"
                      tabIndex={-1}
                      type="button"
                      aria-label="Add line anchor to the URL"
                      className={styles.lineNumber}
                      onClick={(event) => {
                        window.history.pushState(null, "", `#${id}`);
                        document
                          .querySelectorAll(
                            "[data-geist-code-block-line][data-active]",
                          )
                          .forEach((element) =>
                            element.removeAttribute("data-active"),
                          );
                        event.currentTarget.parentElement?.setAttribute(
                          "data-active",
                          "true",
                        );
                      }}
                    >
                      {number}
                    </button>
                  )}
                  <div {...lineProps}>
                    {line.map((token, tokenIndex) => {
                      const { key: _tokenKey, ...tokenProps } = getTokenProps({
                        token,
                      });
                      return <span key={tokenIndex} {...tokenProps} />;
                    })}
                  </div>
                </div>
              );
            })}
          </code>
        </pre>
      )}
    </Highlight>
  );

  if (pure) return content;
  const frameProps: CodeBlockFrameProps = {
    ...props,
    filename,
    language,
    className,
    textToCopy: props.textToCopy ?? children,
    children: content,
  };
  return <CodeBlockFrame {...frameProps} />;
}
