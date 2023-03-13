import clsx from "clsx";
import React from "react";
import { useFocusRing } from "react-aria";

import { Text } from "../Text";
import styles from "./tabs.module.css";

interface TabsProps extends React.PropsWithChildren {
  tabs: { title: string; value: string; icon?: JSX.Element }[];
  selected?: string;
  setSelected?: (value: string) => void;
  disabled?: boolean;
}
const Tabs: React.ComponentType<TabsProps> = ({
  tabs,
  selected,
  setSelected,
  disabled,
}) => {
  return (
    <div className={clsx("geist-no-scrollbar", styles.tabs)} data-geist-tabs="">
      {tabs.map((tab) => {
        return (
          <Tab
            key={tab.value}
            title={tab.title}
            value={tab.value}
            selected={selected}
            setSelected={setSelected}
            icon={tab.icon}
            disabled={disabled}
          />
        );
      })}
    </div>
  );
};

export default Tabs;

const Tab = ({ title, value, selected, setSelected, icon, disabled }) => {
  let { focusProps, isFocusVisible } = useFocusRing();
  return (
    <div
      aria-disabled={disabled}
      {...focusProps}
      className={clsx(styles.tabContainer, { "focus-visible": isFocusVisible })}
      data-geist-tab=""
      data-focus-visible-added={isFocusVisible}
      role="button"
      tabIndex={0}
      onClick={() => {
        if (!disabled) setSelected?.(value);
      }}
      onKeyDown={(e) => {
        if (e.key === " " && !disabled) {
          e.preventDefault(); // prevent page scroll
          setSelected?.(value);
        }
      }}
    >
      <div
        className={clsx(styles.tab, {
          [styles.activeTab]: selected == value,
        })}
      >
        {icon ? <div className={styles.tabIcon}>{icon}</div> : null}
        <Text>{title}</Text>
      </div>
    </div>
  );
};
