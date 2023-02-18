import fs from "fs";
import * as hcl from "hcl2-parser";
import "nextjs-components/src/styles/globals.css";
import path from "path";

import { LeftNav } from "./LeftNav";
import styles from "./layout.module.css";

export default async function Layout({ children }) {
  const navHcl = await fs.promises.readFile(
    path.join(process.cwd(), "app/design/nav.hcl"),
    "utf-8",
  );
  const [{ path: paths }] = hcl.parseToObject(navHcl);

  return (
    <>
      <header></header>
      <nav></nav>
      <main className={styles.main}>
        <aside className={styles.aside_left}>
          <LeftNav paths={paths} />
        </aside>
        <section className={styles.section}>{children}</section>
        <aside></aside>
      </main>
      <footer></footer>
    </>
  );
}
