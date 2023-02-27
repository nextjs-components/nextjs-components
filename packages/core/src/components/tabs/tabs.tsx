import clsx from "clsx";
import React from "react";
import { useFocus } from "react-aria";

import { Text } from "../Text";
import styles from "./tabs.module.css";

interface TabsProps extends React.PropsWithChildren {
  tabs: { title: string; value: string; icon?: JSX.Element }[];
  selected?: string;
  setSelected?: (value: string) => void;
}
const Tabs: React.ComponentType<TabsProps> = ({
  children,
  tabs,
  selected,
  setSelected,
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
          />
        );
      })}
    </div>
  );
};

export default Tabs;

const Tab = ({ title, value, selected, setSelected }) => {
  let [focused, setFocused] = React.useState(false);
  let { focusProps } = useFocus({
    onFocusChange: setFocused,
  });
  return (
    <div
      {...focusProps}
      className={styles.tabContainer}
      data-geist-tab=""
      data-focus-visible-added={focused}
      role="button"
      tabIndex={0}
      onClick={() => setSelected?.(value)}
      onKeyDown={(e) => {
        if (e.key === " ") {
          setSelected?.(value);
        }
      }}
    >
      <div
        className={clsx(styles.tab, {
          [styles.activeTab]: selected == value,
        })}
      >
        <Text>{title}</Text>
      </div>
    </div>
  );
};
