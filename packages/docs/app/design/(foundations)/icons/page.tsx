"use client";

import commandScore from "command-score";
import { Container, Spacer, Text } from "nextjs-components";
import { SearchInput } from "nextjs-components/src/components/Input";
import { useMemo, useState } from "react";

import styles from "../../design.module.css";
import { iconMap } from "./icon-map";
import IconsMdx from "./icons.mdx";
import { ListItem } from "./list";
import listStyles from "./list.module.css";

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
        className={styles.module}
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

        <div className="geist-list">
          {entries.map(({ key, Icon }) => {
            return (
              <ListItem key={key}>
                <button className="icon">
                  <Container center>
                    <Icon />
                  </Container>
                  <Spacer />
                  <Container>
                    <Text as="small" color="geist-secondary">
                      {key}
                    </Text>
                  </Container>
                </button>
              </ListItem>
            );
          })}
        </div>

        <Spacer y={4} />

        <style jsx>{`
          .icon {
            --icon-color: var(--geist-secondary);
            transition: color 0.2s ease;

            color: var(--geist-foreground);
            width: 100%;
            height: 100%;
            margin: 0;
            background: var(--geist-background);
            padding: 0;
            border: none;
            user-select: none;
            cursor: pointer;
            border-radius: var(--geist-radius);
            transition: background-color.1s ease-in-out,
              box-shadow.1s ease-in-out;
          }
          .icon:hover {
            background-color: var(--hover);
          }
          .geist-list {
            display: flex;
            flex-wrap: wrap;
            margin: var(--geist-gap-half-negative);
            box-sizing: border-box;
          }
          .geist-list > :global(.${listStyles.geistListItem}) {
            padding: var(--geist-gap-half);
            flex-grow: 0;
            flex-basis: 25%;
            min-width: 0;
          }
        `}</style>
      </div>
    </>
  );
}
