"use client";

import { Spacer } from "nextjs-components/src/components/Spacer";
import { Text } from "nextjs-components/src/components/Text";

import styles from "../design.module.css";
import ColorCard from "./color-card";
import colorsStyles from "./colors.module.css";

export default function ColorPage() {
  return (
    <>
      <Text as="h1" size={32} weight={600}>
        Color
      </Text>
      <Spacer />
      <Text as="h2" color="geist-secondary" size={20} weight={400}>
        Gallery of colors used across ∆ products.
      </Text>
      <Spacer y={2} />

      <div className={styles["title-bar"]} style={{ marginBottom: "1.25rem" }}>
        <Text as="h3" size={20}>
          Primary
        </Text>
      </div>

      <div className={colorsStyles.grid}>
        <ColorCard color={"--geist-background"} />
        <ColorCard color={"--accents-1"} />
        <ColorCard color={"--accents-2"} />
        <ColorCard color={"--accents-3"} />
        <ColorCard color={"--accents-4"} />
        <ColorCard color={"--accents-5"} />
        <ColorCard color={"--accents-6"} />
        <ColorCard color={"--accents-7"} />
        <ColorCard color={"--accents-8"} />
        <ColorCard color={"--geist-foreground"} />
      </div>

      <Spacer y={2} />

      <div className={styles["title-bar"]} style={{ marginBottom: "1.25rem" }}>
        <Text as="h3" size={20}>
          Error
        </Text>
      </div>

      <div className={colorsStyles.grid}>
        <ColorCard color={"--geist-error-lighter"} />
        <ColorCard color={"--geist-error-light"} />
        <ColorCard color={"--geist-error"} />
        <ColorCard color={"--geist-error-dark"} />
      </div>
      <Spacer y={2} />

      <div className={styles["title-bar"]} style={{ marginBottom: "1.25rem" }}>
        <Text as="h3" size={20}>
          Success
        </Text>
      </div>

      <div className={colorsStyles.grid}>
        <ColorCard color={"--geist-success-lighter"} />
        <ColorCard color={"--geist-success-light"} />
        <ColorCard color={"--geist-success"} />
        <ColorCard color={"--geist-success-dark"} />
      </div>
      <Spacer y={2} />

      <div className={styles["title-bar"]} style={{ marginBottom: "1.25rem" }}>
        <Text as="h3" size={20}>
          Warning
        </Text>
      </div>

      <div className={colorsStyles.grid}>
        <ColorCard color={"--geist-warning-lighter"} />
        <ColorCard color={"--geist-warning-light"} />
        <ColorCard color={"--geist-warning"} />
        <ColorCard color={"--geist-warning-dark"} />
      </div>
      <Spacer y={2} />

      <div className={styles["title-bar"]} style={{ marginBottom: "1.25rem" }}>
        <Text as="h3" size={20}>
          Violet
        </Text>
      </div>

      <div className={colorsStyles.grid}>
        <ColorCard color={"--geist-violet-lighter"} />
        <ColorCard color={"--geist-violet-light"} />
        <ColorCard color={"--geist-violet"} />
        <ColorCard color={"--geist-violet-dark"} />
      </div>
      <Spacer y={2} />

      <div className={styles["title-bar"]} style={{ marginBottom: "1.25rem" }}>
        <Text as="h3" size={20}>
          Cyan
        </Text>
      </div>

      <div className={colorsStyles.grid}>
        <ColorCard color={"--geist-cyan-lighter"} />
        <ColorCard color={"--geist-cyan-light"} />
        <ColorCard color={"--geist-cyan"} />
        <ColorCard color={"--geist-cyan-dark"} />
      </div>
      <Spacer y={2} />

      <div className={styles["title-bar"]} style={{ marginBottom: "1.25rem" }}>
        <Text as="h3" size={20}>
          Highlight
        </Text>
      </div>

      <div className={colorsStyles.grid}>
        <ColorCard color={"--geist-highlight-purple"} />
        <ColorCard color={"--geist-highlight-magenta"} />
        <ColorCard color={"--geist-highlight-pink"} />
        <ColorCard color={"--geist-highlight-yellow"} />
      </div>
      <Spacer y={5} />
    </>
  );
}
