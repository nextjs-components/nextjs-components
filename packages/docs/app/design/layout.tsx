"use client";

import clsx from "clsx";
import {
  ToastArea,
  ToastsProvider,
} from "nextjs-components/src/components/Toast";
import { useEffect, useState } from "react";

import { Menu } from "../../components/menu";
import styles from "./design.module.css";
import Link from "./link";
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

  // This key is to force toggle to update between SSR and CSR
  const [key, setKey] = useState<number>(0);
  useEffect(() => {
    setKey(+new Date());
  }, []);

  return (
    <ToastsProvider>
      <div className={styles["design-page"]}>
        <aside className={styles.aside}>
          <div className={styles.asideInner}>
            <div className={styles["logo-container"]}>
              {/* <a>intro</a> */}
              <div className={"theme_switcher"}></div>
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
                {nodes.map(({ name, path }) => {
                  return (
                    <Link href={path} key={path}>
                      {name}
                    </Link>
                  );
                })}
              </ul>
            </div>
          </div>
        </aside>

        <main className={styles.main}>
          <div className={styles.container}>{children}</div>
        </main>
      </div>
      <ToastArea />
    </ToastsProvider>
  );
};
export default DesignLayout;
