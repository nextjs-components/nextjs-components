import clsx from "clsx";
import React from "react";
import {
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { FocusRing, useId } from "react-aria";
import useMeasure from "react-use-measure";

import ChevronDown from "../../icons/chevron-down";
import { Text } from "../Text";
import styles from "./Collapse.module.css";

interface ICollapseContext {
  onChange?: (val: string | React.ReactNode) => void;
  selected?: string;
}
const CollapseContext = createContext<ICollapseContext>(undefined);

export const CollapseGroup = ({ children }) => {
  const [selected, setSelected] = useState("");
  const onChange = useCallback((val) => {
    setSelected(val);
  }, []);
  return (
    <CollapseContext.Provider value={{ selected, onChange }}>
      <div className={styles.collapseGroup}>{children}</div>
    </CollapseContext.Provider>
  );
};

interface Props {
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  defaultExpanded?: boolean;
  size?: "small";
  card?: boolean;
}
const Collapse: React.ComponentType<React.PropsWithChildren<Props>> = memo(
  ({ title, subtitle, defaultExpanded, size, card, children }) => {
    const isSmall = size === "small";
    // gets ignored if context is present
    const [open, setOpen] = useState<boolean>();
    const context = useContext(CollapseContext);
    const [ref, bounds] = useMeasure();

    const handleClick = useCallback(
      (title: string | React.ReactNode) => {
        if (context) {
          if (title === context.selected) {
            context.onChange(undefined);
          } else {
            context.onChange(title);
          }
        } else {
          setOpen((s) => !s);
        }
      },
      [context],
    );

    const isOpen = useMemo(
      () => title === context.selected || open,
      [context.selected, title, open],
    );

    return (
      <div
        className={clsx(styles.collapse, {
          [styles.card]: card,
          [styles.small]: isSmall,
          [styles.context]: !!context,
        })}
      >
        <Text as={isSmall ? "h5" : "h3"} weight={isSmall ? 500 : 600}>
          <FocusRing focusRingClass={"focus-visible"}>
            <button
              id={`collapse-button-${useId()}`}
              /**
               * [aria-*] attributes do not have valid values
               */
              // aria-controls={`collapse-section-${useId()}`}
              className={clsx("geist-reset", styles.button)}
              onClick={() => handleClick(title)}
              aria-expanded={isOpen ? "true" : undefined}
            >
              <span>
                {title}
                <span className={clsx(styles.icon, { [styles.open]: isOpen })}>
                  <ChevronDown />
                </span>
              </span>
            </button>
          </FocusRing>
        </Text>
        <div
          className={styles.collapseContent}
          style={{ height: isOpen ? bounds.height : 0 }}
        >
          <div {...{ ref }}>{children}</div>
        </div>
      </div>
    );
  },
);

Collapse.displayName = "Collapse";
export default Collapse;
