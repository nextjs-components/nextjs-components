import React from "react";

import styles from "./Tabs.module.css";

const Tabs: React.ComponentType<React.PropsWithChildren> = ({ children }) => {
  return <div className={styles.tabs}>{children}</div>;
};

export default Tabs;
