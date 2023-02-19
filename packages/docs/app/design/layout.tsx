"use client";

import clsx from "clsx";
import { Avatar } from "nextjs-components/src/components/Avatar";
import { TextField } from "nextjs-components/src/components/Input/TextField";
import { KBD } from "nextjs-components/src/components/KeyboardInput";
import { Text } from "nextjs-components/src/components/Text";
import {
  ToastArea,
  ToastsProvider,
} from "nextjs-components/src/components/Toast";
import Search from "nextjs-components/src/icons/Search";
import { useEffect, useState } from "react";

import { Menu } from "../../components/menu";
import styles from "./design.module.css";
import Link from "./link";
import nodes from "./nodes.json";
import { ThemeSwitcher } from "./theme-switcher";

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
              <Avatar
                size={36}
                // src="https://thekevinwang.com/image/kevin.webp"
                src="https://thekevinwang.com/favicon.ico"
              />
              <ThemeSwitcher />
              <div
                className={styles.burger}
                onClick={() => {
                  setExpanded((e) => !e);
                }}
              >
                <Menu expanded={expanded} />
              </div>
            </div>

            <div className={clsx(styles.search, expanded && styles.open)}>
              <TextField
                prefix={<Search size={16} />}
                prefixStyling={false}
                placeholder="Search TBD..."
                suffix={<KBD small>/</KBD>}
                suffixStyling={false}
              />
            </div>
            <div className={clsx(styles.sidebar, expanded && styles.open)}>
              <div className={styles.navigation}>
                {nodes.map((n) => {
                  if ("category" in n) {
                    return (
                      <Text
                        size={16}
                        weight={500}
                        className={styles.navCategory}
                      >
                        {n.category}
                      </Text>
                    );
                  }

                  const { name, path } = n;
                  return (
                    <Link href={path} key={path}>
                      {name}
                    </Link>
                  );
                })}
              </div>
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
