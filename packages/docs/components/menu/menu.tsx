import clsx from "clsx";

import styles from "./menu.module.css";

interface MenuProps {
  expanded?: boolean;
}
const Menu = ({ expanded }: MenuProps) => {
  return (
    <div
      className={clsx(styles.toggle_wrap, expanded && styles.toggle_expanded)}
      aria-label={expanded ? "close menu" : "open menu"}
    ></div>
  );
};

export default Menu;
