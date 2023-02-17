import dynamic from "next/dynamic";
import Link from "next/link";
import { TextField } from "nextjs-components/src/components/Input/TextField";
import { Text } from "nextjs-components/src/components/Text";
import Search from "nextjs-components/src/icons/Search";

import styles from "./docs.module.css";

// Don't render this serverside. This avoids https://nextjs.org/docs/messages/react-hydration-error
const ModeSelect = dynamic(
  () =>
    import("nextjs-components/src/components/Select").then(
      (mod) => mod.ModeSelect,
    ),
  { ssr: false },
);

const DocsLayout = ({ children }) => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <div className={styles.left}>
            <Link href="/" passHref legacyBehavior>
              <Text // @ts-ignore — just let it be an <a/> ok?
                as="a"
              >
                nextjs-components
              </Text>
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
    </>
  );
};

export default DocsLayout;
