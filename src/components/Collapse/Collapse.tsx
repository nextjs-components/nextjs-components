import React from "react";
import clsx from "clsx";
import useMeasure from "react-use-measure";
import {
  createContext,
  useContext,
  useCallback,
  useState,
  memo,
  useMemo,
} from "react";
import { useId } from "@react-aria/utils";
import { FocusRing } from "@react-aria/focus";

import { Text } from "../../components/Text";
import styles from "./Collapse.module.css";
import { ChevronDown } from "../../icons";

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
const Collapse: React.ComponentType<Props> = memo(
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
      [context]
    );

    const isOpen = useMemo(
      () => title === context.selected || open,
      [context.selected, title, open]
    );

    return (
      <div
        className={clsx(styles.collapse, {
          [styles.card]: card,
          [styles.small]: isSmall,
          [styles.context]: !!context,
        })}
      >
        <Text
          Component="h3"
          h5={isSmall}
          h3={!size}
          noMargin
          className={clsx({ ["w-600"]: !size, ["w-500"]: isSmall })}
        >
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
  }
);

Collapse.displayName = "Collapse";
export default Collapse;
