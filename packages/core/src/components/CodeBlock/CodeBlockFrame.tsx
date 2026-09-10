"use client";

import clsx from "clsx";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import Check from "../../icons/check";
import ChevronDown from "../../icons/chevron-down";
import Copy from "../../icons/copy";
import File from "../../icons/file";
import LogoV0 from "../../icons/logo-v0";
import type { CodeBlockSwitcher } from "./CodeBlock";
import styles from "./CodeBlock.module.css";

// Internal layout for CodeBlock variants. Not a public root export.
export interface CodeBlockFrameProps extends HTMLAttributes<HTMLDivElement> {
  filename?: string;
  language: string;
  textToCopy: string;
  switcher?: CodeBlockSwitcher;
  tabs?: CodeBlockSwitcher;
  headerActions?: ReactNode;
  copyButtonPlacement?: "header" | "overlay";
  trackCopy?: () => void;
  v0?: "ask" | "build";
}

function LanguageSelect({ switcher }: { switcher: CodeBlockSwitcher }) {
  return (
    <div className={styles.switcher}>
      <div aria-hidden="true" className={styles.switcherLabel}>
        <span>
          {switcher.options.find((option) => option.value === switcher.value)
            ?.label ?? switcher.options[0]?.label}
        </span>
        <ChevronDown size={16} />
      </div>
      <select
        aria-label={switcher.ariaLabel ?? "Code language"}
        value={switcher.value}
        onChange={(event) => switcher.onChange(event.target.value)}
      >
        {switcher.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function CopyButton({
  text,
  className,
  trackCopy,
}: {
  text: string;
  className?: string;
  trackCopy?: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      clearTimeout(timer.current);
    };
  }, []);
  const copy = async () => {
    trackCopy?.();
    let result: "copied" | "error";
    try {
      await navigator.clipboard.writeText(text);
      result = "copied";
    } catch {
      result = "error";
    }
    if (!mounted.current) return;
    clearTimeout(timer.current);
    setStatus(result);
    timer.current = setTimeout(() => setStatus("idle"), 2000);
  };
  return (
    <button
      type="button"
      aria-label={
        status === "copied"
          ? "Copied to clipboard"
          : status === "error"
            ? "Could not copy. Try again"
            : "Copy to clipboard"
      }
      className={clsx(styles.action, className)}
      onClick={() => {
        void copy();
      }}
    >
      <span
        className={styles.copyIcons}
        aria-hidden="true"
        data-copied={status === "copied"}
      >
        <Check size={16} />
        <Copy size={16} />
      </span>
      <output className={styles.srOnly}>
        {status === "copied"
          ? "Copied to clipboard"
          : status === "error"
            ? "Could not copy to clipboard"
            : ""}
      </output>
    </button>
  );
}

export function CodeBlockFrame({
  filename,
  language,
  textToCopy,
  switcher,
  tabs,
  headerActions,
  copyButtonPlacement = "header",
  trackCopy,
  v0,
  className,
  children,
  ...props
}: CodeBlockFrameProps) {
  const tabId = useId();
  const tabList = useRef<HTMLDivElement>(null);
  const tabbed = !!tabs && tabs.options.length <= 4;
  const header = !!(filename || headerActions || (tabs && !tabbed));
  const overlay =
    !(filename || tabs || headerActions) || copyButtonPlacement === "overlay";
  const copy = <CopyButton text={textToCopy} trackCopy={trackCopy} />;
  const v0Url = (mode: "ask" | "minimal" | "full") =>
    `https://v0.app/chat?q=${encodeURIComponent(`${mode === "ask" ? "Explain what this code does and how it works" : mode === "full" ? "Create a complete Next.js example app using this code" : "Create a minimal example app using this code"}:\n\n${textToCopy}`)}`;

  return (
    <div
      {...props}
      className={clsx(styles.root, className)}
      data-geist-code-block=""
      data-has-header={header || tabbed}
      data-has-footer={!!v0}
    >
      {tabbed && tabs && (
        <div className={styles.tabsRow}>
          <div
            ref={tabList}
            role="tablist"
            aria-label={tabs.ariaLabel ?? "Code language"}
            aria-orientation="horizontal"
            className={styles.tabs}
          >
            {tabs.options.map((option, index) => (
              <button
                key={option.value}
                id={`${tabId}-${index}`}
                type="button"
                role="tab"
                aria-selected={option.value === tabs.value}
                aria-controls={`${tabId}-content`}
                tabIndex={option.value === tabs.value ? 0 : -1}
                onClick={() => tabs.onChange(option.value)}
                onKeyDown={(event) => {
                  const nextIndex =
                    event.key === "ArrowRight"
                      ? (index + 1) % tabs.options.length
                      : event.key === "ArrowLeft"
                        ? (index - 1 + tabs.options.length) %
                          tabs.options.length
                        : event.key === "Home"
                          ? 0
                          : event.key === "End"
                            ? tabs.options.length - 1
                            : -1;
                  if (nextIndex < 0) return;
                  event.preventDefault();
                  tabs.onChange(tabs.options[nextIndex].value);
                  tabList.current
                    ?.querySelectorAll<HTMLButtonElement>("button")
                    [nextIndex]?.focus();
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
          {!header && !overlay && copy}
        </div>
      )}
      {header && (
        <div data-section="tabs" className={styles.header}>
          {filename && (
            <div className={styles.filename}>
              <div aria-hidden="true" className={styles.fileIcon}>
                {/^(jsx|tsx|react|next)$/.test(language) ? (
                  <svg
                    height="16"
                    width="16"
                    viewBox="-11.5 -10.23174 23 20.46348"
                    style={{ shapeRendering: "auto" }}
                  >
                    <circle cx="0" cy="0" r="2.05" fill="currentColor" />
                    <g fill="none" stroke="currentColor" strokeWidth="1">
                      <ellipse rx="11" ry="4.2" />
                      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                    </g>
                  </svg>
                ) : (
                  <File size={16} />
                )}
              </div>
              <span>{filename}</span>
            </div>
          )}
          <div className={styles.actions}>
            {headerActions}
            {tabs && !tabbed && <LanguageSelect switcher={tabs} />}
            {switcher && <LanguageSelect switcher={switcher} />}
            {!overlay && copy}
          </div>
        </div>
      )}
      {overlay && (
        <CopyButton
          text={textToCopy}
          trackCopy={trackCopy}
          className={clsx(styles.overlay, header && styles.overlayWithHeader)}
        />
      )}
      <div
        data-section="content"
        className={styles.content}
        id={tabbed ? `${tabId}-content` : undefined}
        role={tabbed ? "tabpanel" : undefined}
        aria-labelledby={
          tabbed
            ? `${tabId}-${tabs?.options.findIndex((option) => option.value === tabs.value)}`
            : undefined
        }
      >
        {children}
      </div>
      {v0 && (
        <div className={styles.footer}>
          <a
            className={styles.v0Link}
            href={v0Url(v0 === "ask" ? "ask" : "minimal")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={v0 === "ask" ? "Ask v0" : "Open in v0"}
          >
            {v0 === "ask" ? "Ask" : "Open in"}
            <LogoV0 size={20} />
          </a>
          {v0 === "build" && (
            <details className={styles.v0Menu}>
              <summary aria-label="Open in v0 options">
                <ChevronDown size={16} />
              </summary>
              <div>
                <a
                  href={v0Url("minimal")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MVP Example
                </a>
                <a
                  href={v0Url("full")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Full Example
                </a>
              </div>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
