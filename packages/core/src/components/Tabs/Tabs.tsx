import React from "react";

import styles from "./Tabs.module.css";

interface Props {}
const Tabs: React.ComponentType<Props> = ({ children }) => {
  return <div className={styles.tabs}>{children}</div>;
};

export default Tabs;
