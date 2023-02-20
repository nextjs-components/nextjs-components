"use client";

import clsx from "clsx";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Avatar } from "nextjs-components/src/components/Avatar";
import { Input } from "nextjs-components/src/components/Input";
import { KBD } from "nextjs-components/src/components/KeyboardInput";
import { Text } from "nextjs-components/src/components/Text";
import { ToastsProvider } from "nextjs-components/src/components/Toast";
import Search from "nextjs-components/src/icons/Search";
import { useEffect, useState } from "react";

import { Menu } from "@/components/menu";

import componentsNodes from "./(components)/nodes.json";
import foundationsNodes from "./(foundations)/nodes.json";
import styles from "./design.module.css";
import Link from "./link";
import { ThemeSwitcher } from "./theme-switcher";

// ToastArea should not be ssr'd because it causes hydration issues
// TODO: figure out why and document it.
const ToastArea = dynamic(
  () => import("nextjs-components/src/components/Toast/ToastArea"),
  { ssr: false },
);

interface Props extends React.PropsWithChildren {
  title?: string;
  description?: string;
  ogImage?: string;
  ogUrl?: string;
  paths?: string[];
}

const navigationNodes = {
  foundations: foundationsNodes,
  components: componentsNodes,
};

const DesignLayout: React.FC<Props> = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  const pathname = usePathname();
  const nodes = [...foundationsNodes, ...componentsNodes];
  const currentNodeIdx = nodes.findIndex((n) => n.path === pathname);
  const prevNode = nodes[currentNodeIdx - 1];
  const nextNode = nodes[currentNodeIdx + 1];

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
              <Input
                disabled
                prefix={<Search size={16} />}
                prefixStyling={false}
                placeholder="Search TBD..."
                suffix={<KBD small>/</KBD>}
                suffixStyling={false}
              />
            </div>
            <div className={clsx(styles.sidebar, expanded && styles.open)}>
              <div className={styles.navigation}>
                {Object.entries(navigationNodes).map(([category, nodes]) => {
                  return (
                    <>
                      <Text
                        key={category}
                        size={16}
                        weight={500}
                        className={styles.navCategory}
                      >
                        {category}
                      </Text>
                      {nodes.map((n) => {
                        const { name, path } = n;
                        return (
                          <Link href={path} key={path}>
                            {name}
                          </Link>
                        );
                      })}
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        <main className={styles.main}>
          <div className={styles.container}>
            {children}
            <nav className="sibling-links">
              {/* TODO add ChevronRight & ChevronLeft */}
              {prevNode ? (
                <Link href={prevNode.path} className="link previous-link">
                  {prevNode.name}
                </Link>
              ) : null}
              {nextNode ? (
                <Link href={nextNode.path} className="link next-link">
                  {nextNode.name}
                </Link>
              ) : null}
            </nav>
            <style jsx>{`
              :global(.link) {
                display: flex;
                align-items: center;
                gap: var(--geist-space-2x);
                padding: var(--geist-space-2x);
                border-radius: 8px;
                transition: background-color.2s ease;
              }
              :global(.previous-link) {
                padding-right: var(--geist-space-4x);
                text-align: left;
              }
              :global(.next-link) {
                margin-left: auto;
                padding-left: var(--geist-space-4x);
                text-align: right;
              }
              .sibling-links {
                display: flex;
                justify-content: space-between;
                padding: var(--geist-space-8x) 0;
                margin-top: auto;
                border-top: 1px solid var(--accents-2);
              }
            `}</style>
          </div>
        </main>
      </div>
      <ToastArea />
    </ToastsProvider>
  );
};
export default DesignLayout;
