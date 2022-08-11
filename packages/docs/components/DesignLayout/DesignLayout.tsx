import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

import { Container } from "nextjs-components/src/components/Container";
import { Details } from "nextjs-components/src/components/Details";
import { Text } from "nextjs-components/src/components/Text";
import { ModeSelect } from "nextjs-components/src/components/Select";

import { useTheme } from "nextjs-components/src/contexts/ThemeContext";

import styles from "./design.module.css";

interface Props {
  title?: string;
  description?: string;
  ogImage?: string;
  ogUrl?: string;
  paths?: string[];
}

const NavTree = ({
  nodes = [],
  path = "/",
  depth = 0,
}: {
  nodes: Node[];
  path?: string;
  depth?: number;
}) => {
  const { asPath } = useRouter();
  if (depth > 2) return null;

  return (
    <>
      {nodes.map((node, i) => {
        const newpath = path + node.path;
        const key = newpath + i;
        // if no children, then node is a leaf
        if (!node?.children || node?.children?.length === 0) {
          const isActive = asPath?.includes(node.path);
          const classname = isActive ? "active" : "";

          return (
            <Link href={newpath} key={key}>
              <a className={classname}>
                <li>
                  <Text as="small">{node.name}</Text>
                </li>
              </a>
            </Link>
          );
        }
        // if children, then node is a tree;
        // render another `ul` and its children
        return (
          <li key={key}>
            <Details open summary={<Text as="small">{node.name}</Text>}>
              <ul>
                <NavTree
                  nodes={node.children}
                  depth={depth + 1}
                  path={newpath}
                />
              </ul>
            </Details>
          </li>
        );
      })}
    </>
  );
};

/** https://stackoverflow.com/a/64489760/9823455 */
const titleCase = (s: string) =>
  s
    .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()) // Initial char (after -/_)
    .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase()); // First char after each -/_

interface Node {
  children?: Node[];
  name: string;
  path: string;
}

const DesignLayout: React.FC<Props> = ({ children, paths = [] }) => {
  const [expanded, setExpanded] = useState(false);
  const { selectTheme, isDarkMode } = useTheme();

  /**
   * @TODO improve this
   */
  const constructNodesFromPaths = useCallback((paths: string[]): Node[] => {
    return paths.reduce(
      ([styleguideNode, componentsNode], nextPath) => {
        const node = {
          name: titleCase(nextPath.replace("/design/", "")),
          path: nextPath.replace("/design/", ""),
        };

        if (nextPath.includes("color") || nextPath.includes("grid")) {
          styleguideNode.children.push(node);
        } else {
          componentsNode.children.push(node);
        }

        return [styleguideNode, componentsNode];
      },
      [
        { path: "design/", name: "Styleguide", children: [] },
        { path: "design/", name: "Components", children: [] },
      ] as Node[]
    );
  }, []);
  const nodes = constructNodesFromPaths(paths);

  // This key is to force toggle to update between SSR and CSR
  const [key, setKey] = useState<number>(0);
  useEffect(() => {
    setKey(+new Date());
  }, []);

  return (
    <>
      <Container className={styles["design-page"]}>
        <aside className={styles.aside}>
          <div className={styles["logo-container"]}>
            <Link href="/">
              <a>Home</a>
            </Link>

            <div>
              <ModeSelect />
            </div>

            <div
              className={styles.burger}
              onClick={() => {
                setExpanded((e) => !e);
              }}
            >
              {/* <Menu expanded={expanded} /> */}
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
