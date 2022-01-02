import clsx from "clsx";
import styles from "./Switch.module.css";

interface SwitchProps {
  items: {
    name: string; // ex. 'Source'
    value: string; // ex. 'source'
    width: React.CSSProperties["width"];
  }[];
  active?: string;
  onChange?: (value: string) => void;
  size?: "small" | "large";
}
const Switch = ({ items, onChange, active, size }: SwitchProps) => {
  return (
    <div className={clsx(styles.switch, { [styles[size]]: !!size })}>
      {items.map((e) => (
        <button
          className={clsx(styles.button, "geist-ellipsis", {
            [styles.active]: active === e.value,
          })}
          key={e.value}
          onClick={() => {
            onChange(e.value);
          }}
          style={{ width: e.width }}
        >
          <span>{e.name}</span>
        </button>
      ))}
    </div>
  );
};

export default Switch;
