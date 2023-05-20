"use client";

import clsx from "clsx";
import commandScore from "command-score";
import { usePathname } from "next/navigation";
import { Avatar } from "nextjs-components/src/components/Avatar";
import { Input } from "nextjs-components/src/components/Input";
import { KBD } from "nextjs-components/src/components/KeyboardInput";
import { Text } from "nextjs-components/src/components/Text";
import * as Icons from "nextjs-components/src/icons";
import React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { ThemeSwitcher } from "@/app/theme-switcher";
import { Menu } from "@/components/menu";

import componentsNodes from "./(components)/nodes.json";
import foundationsNodes from "./(foundations)/nodes.json";
import Link from "./link";

const NavigationNodesContext = createContext<{
  prevNode:
    | (typeof foundationsNodes)[number]
    | (typeof componentsNodes)[number]
    | null;
  nextNode:
    | (typeof foundationsNodes)[number]
    | (typeof componentsNodes)[number]
    | null;
  navigationNodes: {
    foundations: typeof foundationsNodes;
    components: typeof componentsNodes;
  };
}>({
  prevNode: null,
  nextNode: null,
  navigationNodes: { foundations: [], components: [] },
});

/**
 * A context provider.
 */
const Navigation = ({ children }) => {
  const navigationNodes = useMemo(() => {
    return {
      foundations: foundationsNodes,
      components: componentsNodes,
    };
  }, []);

  const nodes = [...foundationsNodes, ...componentsNodes];

  const pathname = usePathname();
  const currentNodeIdx = nodes.findIndex((n) => n.path === pathname);
  const prevNode = nodes[currentNodeIdx - 1];
  const nextNode = nodes[currentNodeIdx + 1];
  return (
    <NavigationNodesContext.Provider
      value={{ prevNode, nextNode, navigationNodes }}
    >
      {children}
    </NavigationNodesContext.Provider>
  );
};

export const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  // attach "/" keyboard shortcut to search input
  const searchRef = React.useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        // 1. preventDefault() to prevent immediately inputting a "/" into the search input
        // 2. noop if the search input is already focused
        if (searchRef.current && document.activeElement !== searchRef.current) {
          e.preventDefault();
          searchRef.current.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const [search, setSearch] = useState("");
  const { navigationNodes } = useContext(NavigationNodesContext);

  const filteredNodes = useMemo(() => {
    if (!search) {
      return navigationNodes;
    }
    return Object.keys(navigationNodes).reduce(
      (acc, next) => {
        const nodes = navigationNodes[next as "foundations" | "components"];

        acc[next] = nodes
          .reduce((acc, next) => {
            const score = commandScore(next.name, search);
            if (score > 0) {
              acc.push({ ...next, score });
            }
            return acc;
          }, [] as ((typeof nodes)[number] & { score: number })[])
          .sort((a, b) => {
            if (a.score === b.score) {
              return a.name.localeCompare(b.name);
            }
            return b.score - a.score;
          })
          .map((n) => {
            delete n.score;
            return n;
          });

        return acc;
      },
      {
        foundations: [] as typeof foundationsNodes,
        components: [] as typeof componentsNodes,
      },
    );
  }, [search, navigationNodes]);
  return (
    <aside
      // .aside
      className={clsx(
        "fixed bottom-0 top-0 flex w-[296px] flex-col overflow-hidden rounded-[--geist-space-gap-half]",
        // @media screen and (max-width: 960px) {
        "max-[960px]:position-unset max-[960px]:w-[calc(100vw_-_(100vw_-_100%))] max-[960px]:h-[unset] max-[960px]:block max-[960px]:py-6 max-[960px]:px-0 max-[960px]:bg-[--geist-background]",
      )}
    >
      <div
        // .asideInner
        className={clsx(
          "flex h-full flex-col px-[--geist-space-small] pb-0 pt-[--geist-space-small]",
          // @media screen and (max-width: 960px) {
          "max-[960px]:p-0",
        )}
      >
        <div
          // logo-container
          className={clsx(
            "flex w-[calc(100%_-_16px)] items-center justify-between pt-[--geist-space-small]",
            "max-[960px]:pt-0",
          )}
        >
          <a
            aria-label="Next.js Components GitHub Repository"
            href="https://github.com/nextjs-components/nextjs-components"
            target="_blank"
            rel="noopener"
          >
            <Avatar
              size={36}
              // src="https://thekevinwang.com/image/kevin.webp"
              src="https://thekevinwang.com/favicon.ico"
            />
          </a>
          <ThemeSwitcher />
          <div
            className={clsx(
              "hidden border-[none] bg-[none]",
              "max-[960px]:block max-[960px]:h-10 max-[960px]:w-10 max-[960px]:cursor-pointer",
            )}
            onClick={() => {
              setExpanded((e) => !e);
            }}
          >
            <Menu expanded={expanded} />
          </div>
        </div>

        <div
          // .search
          className={clsx(
            "mt-[30px] w-[calc(100%_-_16px)]",
            "max-[960px]:hidden",
            expanded && "max-[960px]:!block",
          )}
        >
          <Input
            value={search}
            ref={searchRef}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
            }}
            prefix={<Icons.Search size={16} />}
            prefixStyling={false}
            placeholder="Search..."
            suffix={<KBD small>/</KBD>}
            suffixStyling={false}
          />
        </div>
        <div
          // sidebar
          className={clsx(
            "relative z-[100] -ml-4 h-full overflow-y-auto overflow-x-visible px-4 pb-8 pt-0",
            !expanded && "max-[960px]:hidden",
            expanded &&
              "max-[960px]:fixed max-[960px]:bottom-0 max-[960px]:left-0 max-[960px]:right-0 max-[960px]:top-[150px] max-[960px]:z-[105] max-[960px]:m-[unset] max-[960px]:flex max-[960px]:max-h-[calc(100vh_-_150px)] max-[960px]:w-full max-[960px]:overflow-y-scroll max-[960px]:bg-[--geist-background] max-[960px]:p-[--geist-gap] max-[960px]:pt-0",
            "design-mask-image",
          )}
        >
          <div
            // .navigation
            className={"relative flex w-full flex-col gap-[2px]"}
          >
            {Object.entries(filteredNodes).map(([category, nodes]) => {
              return (
                <React.Fragment key={category}>
                  {nodes.length > 0 ? (
                    <Text
                      size={16}
                      weight={500}
                      // .navCategory
                      className="!mt-5 flex items-center gap-2 px-0 py-3 capitalize"
                    >
                      {category}
                    </Text>
                  ) : null}
                  {nodes.map((n) => {
                    const { name, path } = n;
                    return (
                      <Link href={path} key={path}>
                        {name}
                      </Link>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};

const Prev = () => {
  const { prevNode } = useContext(NavigationNodesContext);

  if (!prevNode) {
    return null;
  }
  return (
    <Link
      href={prevNode.path}
      className={clsx(
        "flex items-center gap-[--geist-space-2x] rounded-lg p-[--geist-space-2x] transition-[background]",
        // prev styles
        "pr-[--geist-space-4x] text-left",
      )}
    >
      <Icons.ChevronLeft size={16} /> {prevNode.name}
    </Link>
  );
};

const Next = () => {
  const { nextNode } = useContext(NavigationNodesContext);
  if (!nextNode) {
    return null;
  }
  return (
    <Link
      href={nextNode.path}
      className={clsx(
        "flex items-center gap-[--geist-space-2x] rounded-lg p-[--geist-space-2x] transition-[background]",
        // next styles
        "text-right] ml-auto pl-[--geist-space-4x]",
      )}
    >
      {nextNode.name} <Icons.ChevronRight size={16} />
    </Link>
  );
};

export const SiblingLinks = () => {
  return (
    <nav className="mt-auto flex content-between border-t border-solid border-t-[--accents-2] px-0 py-[--geist-space-8x]">
      <Prev />
      <Next />
    </nav>
  );
};

// export default Navigation;

// TODO(kevin): This might be a next.js bug — exporting an object of components appears to
// cause problems with Server Components
// 1. Exporting and Importing results in no issues.
// 2. Rendering <Navigation.Sidebar /> causes the following error to be thrown:
//    | Error: Unsupported Server Component type: undefined
export default Object.assign(Navigation, { Sidebar, SiblingLinks });
