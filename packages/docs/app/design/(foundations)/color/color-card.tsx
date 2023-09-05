"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Text } from "nextjs-components/src/components/Text";
import Check from "nextjs-components/src/icons/check";
import { useEffect, useState } from "react";

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
      className={clsx(
        "-m-2 flex cursor-pointer items-center justify-between gap-4 rounded-md border-none bg-transparent p-2 text-left transition-[background]",
        "hover:bg-[--hover]",
      )}
      style={{ "--color": hex }}
      onClick={() => {
        setClicked(true);
        navigator.clipboard.writeText(hex.toUpperCase());
      }}
    >
      <div
        // TODO(kevin): Taiwind `shadow-[--inset-shadow]` doesn't appear to be working
        style={{ boxShadow: "var(--inset-shadow)" }}
        className="h-[60px] w-[60px] shrink-0 rounded-md bg-[--color] shadow-[--inset-shadow]"
      />
      <div className="mr-auto flex flex-col">
        <Text className="flex items-center gap-[6px]">
          {varName}
          <AnimatePresence>
            {clicked ? (
              <motion.div
                className="flex items-center gap-[6px]"
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
