import clsx from "clsx";
import React from "react";
import { Children, useContext, useState } from "react";

import { DisabledContext } from "../../contexts/DisabledContext";
import { Text } from "../Text";
import styles from "./Fieldset.module.css";

const Status: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={styles.status}>{children}</div>;
};

const Actions: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.actions}>
      <div>{children}</div>
    </div>
  );
};

interface FooterProps {
  style?: React.CSSProperties;
  disabled?: boolean;
  highlight?: boolean;
}
interface IFooter extends React.FC<React.PropsWithChildren<FooterProps>> {
  Status: typeof Status;
  Actions: typeof Actions;
}

const Footer: IFooter = ({ children, style, disabled, highlight }) => {
  const ctxDisabled = useContext(DisabledContext);
  const isDisabled = disabled ?? ctxDisabled;

  return (
    <DisabledContext.Provider value={isDisabled}>
      <footer
        className={clsx(styles.footer, {
          [styles.highlight]: highlight,
          [styles.disabled]: isDisabled,
          ["geist-disabled"]: isDisabled,
        })}
        style={style}
      >
        {isDisabled && <div className="geist-disabled-wall" />}
        {children}
      </footer>
    </DisabledContext.Provider>
  );
};
Footer.Status = Status;
Footer.Actions = Actions;

interface Fs {
  Tabs: React.FC<
    React.PropsWithChildren<{ tabs: string[] }> &
      React.HTMLAttributes<HTMLDivElement>
  >;
  Fieldset: React.FC<
    React.PropsWithChildren<{ disabled?: boolean }> &
      React.HTMLAttributes<HTMLDivElement>
  >;
  Content: React.FC<
    React.PropsWithChildren<{ disabled?: boolean }> &
      React.HTMLAttributes<HTMLDivElement>
  >;
  Title: React.FC<React.PropsWithChildren>;
  Subtitle: React.FC<React.PropsWithChildren>;
  ErrorText: React.FC<React.PropsWithChildren>;
  Footer: typeof Footer;
}

const Tabs = ({ children, tabs, ...props }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className={styles.tabs} {...props}>
      <div className={styles.tabsRow}>
        {tabs.map((e, i) => (
          <button
            className={styles.tab}
            key={i}
            disabled={activeIndex === i}
            onClick={() => setActiveIndex(i)}
          >
            {e}
          </button>
        ))}
      </div>
      {Children.toArray(children)[activeIndex]}
    </div>
  );
};

const ErrorText = ({ children }) => {
  return <span className={styles.error}>{children}</span>;
};

/**
 * # fs
 * @example
 * ```tsx
 * <fs.Fieldset>
 *   <fs.Content>
 *     <fs.Title>fs.Title</fs.Title>
 *     <fs.Subtitle>fs.Subtitle</fs.Subtitle>
 *   </fs.Content>
 *   <fs.Footer>
 *     <fs.Footer.Status>fs.Footer.Status</fs.Footer.Status>
 *     <fs.Footer.Actions>
 *       <button>fs.Footer.Action</button>
 *     </fs.Footer.Actions>
 *   </fs.Footer>
 * </fs.Fieldset>
 * ```
 */
const fs: Fs = {
  Tabs: Tabs,
  Fieldset: ({ className, disabled, ...props }) => (
    <DisabledContext.Provider value={disabled}>
      <div {...props} className={clsx(styles.fieldset, className)} />
    </DisabledContext.Provider>
  ),
  Content: ({ className, children, disabled, ...props }) => {
    const ctxDisabled = useContext(DisabledContext);
    const isDisabled = disabled ?? ctxDisabled;
    return (
      <DisabledContext.Provider value={isDisabled}>
        <div
          className={clsx(styles.content, className, {
            [styles.disabled]: isDisabled,
            ["geist-disabled"]: isDisabled,
          })}
          {...props}
        >
          {isDisabled && <div className="geist-disabled-wall" />}
          {children}
        </div>
      </DisabledContext.Provider>
    );
  },
  Title: ({ children, ...props }) => (
    <Text as={"h4"} size={20} {...props} className={styles.title}>
      {children}
    </Text>
  ),
  Subtitle: ({ children, ...props }) => (
    <Text {...props} size={14} style={{ margin: "var(--geist-gap-half) 0" }}>
      {children}
    </Text>
  ),
  ErrorText: ErrorText,
  Footer: Footer,
};

export default fs;
