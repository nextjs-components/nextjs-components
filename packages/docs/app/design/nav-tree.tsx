"use client";

import Link from "next/link";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { Details } from "nextjs-components/src/components/Details";
import { Text } from "nextjs-components/src/components/Text";

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
            <Link href={newpath} key={key} className={classname}>
              <li>
                <Text as="small">{node.name}</Text>
              </li>
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

export default NavTree;
