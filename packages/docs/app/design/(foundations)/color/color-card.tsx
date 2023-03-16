"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Text } from "nextjs-components/src/components/Text";
import Check from "nextjs-components/src/icons/check";
import { useEffect, useState } from "react";

import styles from "./colors.module.css";

// color prop is expected to be a value like
// --geist-foreground
const ColorCard = ({ color }: { color: string }) => {
  const varName = `var(${color})`;
  const hex =
    typeof window !== "undefined"
      ? getComputedStyle(document.documentElement).getPropertyValue(color)
      : "";

  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    let id: NodeJS.Timeout;
    if (clicked) {
      id = setTimeout(() => {
        setClicked(false);
      }, 1000);
    }
    return () => {
      clearTimeout(id);
    };
  }, [clicked]);

  return (
    <button
      className={styles.colorCard}
      style={{ "--color": hex }}
      onClick={() => {
        setClicked(true);
        navigator.clipboard.writeText(hex.toUpperCase());
      }}
    >
      <div className={styles.colorRect}></div>
      <div className={styles.content}>
        <Text className={styles.text}>
          {varName}
          <AnimatePresence>
            {clicked ? (
              <motion.div
                className={styles.text}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Check size={20} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </Text>
        <Text color="accents-5">{hex}</Text>
      </div>
    </button>
  );
};

export default ColorCard;
