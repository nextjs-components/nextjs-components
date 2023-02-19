import { Text } from "nextjs-components/src/components/Text";
import { useToasts } from "nextjs-components/src/components/Toast";
import { Color } from "nextjs-components/src/styles/Color";

import styles from "./colors.module.css";

// color prop is expected to be a value like
// --geist-foreground
const ColorCard = ({ color }: { color: Color }) => {
  const varName = `var(${color})`;
  const hex = getComputedStyle(document.documentElement).getPropertyValue(
    color,
  );

  const toasts = useToasts();

  return (
    <button
      className={styles.colorCard}
      style={{ "--color": hex }}
      onClick={() => {
        navigator.clipboard.writeText(hex.toUpperCase());
        toasts.current?.success({
          text: `Copied \`${hex.toUpperCase()}\` to clipboard!`,
        });
      }}
    >
      <div className={styles.colorRect}></div>
      <div className={styles.content}>
        <Text>{varName}</Text>
        <Text color="accents-5">
          {hex}
          {/* TODO */}
          {false ? <div className={styles.text}></div> : null}
        </Text>
      </div>
    </button>
  );
};

export default ColorCard;
