"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { TextField } from "nextjs-components/src/components/Input/TextField";
// import { ModeSelect } from "nextjs-components/src/components/Select";
import { Text } from "nextjs-components/src/components/Text";
import Search from "nextjs-components/src/icons/Search";
import "nextjs-components/src/styles/globals.css";

import styles from "./docs.module.css";

const ModeSelect = dynamic(
  () =>
    import("nextjs-components/src/components/Select").then(
      (mod) => mod.ModeSelect,
    ),
  { ssr: false },
);

// Must have html and body tags or else:
// Uncaught Error: invariant expected app router to be mounted
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <header className={styles.header}>
          <div className={styles.inner}>
            <div className={styles.left}>
              <Link href="/" passHref>
                <Text>nextjs-components</Text>
              </Link>
            </div>
            <div className={styles.mid}>
              <TextField
                className={styles.input}
                disabled
                prefix={<Search />}
                placeholder="Search coming soon?"
              />
            </div>
            <div className={styles.right}>
              <ModeSelect />
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
