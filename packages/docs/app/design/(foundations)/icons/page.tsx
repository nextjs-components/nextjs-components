"use client";

import clsx from "clsx";
import commandScore from "command-score";
import { AnimatePresence, motion } from "framer-motion";
import { Container, Spacer, Text } from "nextjs-components";
import { SearchInput } from "nextjs-components/src/components/Input";
import Check from "nextjs-components/src/icons/check";
import { useEffect, useMemo, useState } from "react";

import { iconMap } from "./icon-map";
import IconsMdx from "./icons.mdx";

export default function IconsPage() {
  const [search, setSearch] = useState("");
  const entries = useMemo(() => {
    return Object.entries(iconMap)
      .reduce((acc, [key, Icon]) => {
        const score = commandScore(key, search);
        if (score > 0) {
          acc.push({ Icon, score, key });
        }
        return acc;
      }, [])
      .sort((a, b) => {
        if (a.score === b.score) {
          return a.key.localeCompare(b.key);
        }
        return b.score - a.score;
      })
      .map((suggestion) => {
        return {
          key: suggestion.key,
          Icon: suggestion.Icon,
        };
      });
  }, [search]);

  return (
    <>
      <IconsMdx />

      <div
        // .module
        className={clsx(
          "relative w-full rounded-[--geist-radius] border border-solid border-[--accents-2] p-4",
        )}
        // overwrites above styles... but why?
        style={{
          padding: 0,
          border: "none",
          marginTop: 30,
        }}
      >
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search icons..."
        />
        <Spacer />

        <div className="m-[--geist-gap-half-negative] box-border flex flex-wrap">
          {entries.map(({ key, Icon }) => {
            return (
              <ClickableIcon key={key} name={key}>
                <Icon />
              </ClickableIcon>
            );
          })}
        </div>

        <Spacer y={4} />
      </div>
    </>
  );
}

const ClickableIcon = ({ children, name }) => {
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    let id: NodeJS.Timeout;
    if (clicked) {
      id = setTimeout(() => {
        setClicked(false);
      }, 1500);
    }
    return () => {
      clearTimeout(id);
    };
  }, [clicked]);

  return (
    <div
      // geistListItem
      className="min-w-0 grow-0 basis-1/4 p-[--geist-gap-half]"
    >
      <Container style={{ height: 100 }}>
        <AnimatePresence>
          <button
            style={{ "--icon-color": "var(--geist-secondary)" }}
            className={clsx(
              "h-full w-full cursor-pointer select-none rounded-[var(--geist-radius)] border-none bg-[--geist-background] p-0 text-[--geist-foreground] transition-colors duration-200",
              "hover:bg-[--hover]",
            )}
            onClick={() => {
              setClicked(true);
            }}
          >
            <Container center>
              {clicked ? (
                <motion.div
                  key="check"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <Check />
                </motion.div>
              ) : (
                <motion.div
                  key="icon"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  {children}
                </motion.div>
              )}
            </Container>
            <Spacer y={0.5} />
            <Container>
              {clicked ? (
                <motion.div
                  key="check2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <Text as="small" color="geist-secondary">
                    Copied!
                  </Text>
                </motion.div>
              ) : (
                <motion.div
                  key="icon2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <Text as="small" color="geist-secondary">
                    {name}
                  </Text>
                </motion.div>
              )}
            </Container>
          </button>
        </AnimatePresence>
      </Container>
    </div>
  );
};
