"use client";

import clsx from "clsx";
import { Container } from "nextjs-components/src/components/Container";
import { useTheme } from "nextjs-components/src/contexts/ThemeContext";
import { useCallback, useEffect, useState } from "react";

import { Menu } from "../../components/menu";
import styles from "./layout.module.css";
import NavTree from "./nav-tree";
import nodes from "./nodes.json";

interface Props extends React.PropsWithChildren {
  title?: string;
  description?: string;
  ogImage?: string;
  ogUrl?: string;
  paths?: string[];
}

const DesignLayout: React.FC<Props> = ({ children }) => {
  const [expanded, setExpanded] = useState(false);
  const { selectTheme, isDarkMode } = useTheme();

  // This key is to force toggle to update between SSR and CSR
  const [key, setKey] = useState<number>(0);
  useEffect(() => {
    setKey(+new Date());
  }, []);

  return (
    <>
      <div className={styles.hairline} />
      <Container className={styles["design-page"]}>
        <aside className={styles.aside}>
          <div className={styles["logo-container"]}>
            <div
              className={styles.burger}
              onClick={() => {
                setExpanded((e) => !e);
              }}
            >
              <Menu expanded={expanded} />
            </div>
          </div>

          <div className={clsx(styles.sidebar, expanded && styles.open)}>
            <ul className={styles.navigation}>
              <NavTree nodes={nodes} />
            </ul>
          </div>
        </aside>

        <main className={styles.main}>
          <Container className={styles.container}>{children}</Container>
        </main>
      </Container>
    </>
  );
};
export default DesignLayout;
