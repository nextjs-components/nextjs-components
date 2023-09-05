import clsx from "clsx";

import styles from "./list.module.css";

type LIProps = React.LiHTMLAttributes<HTMLLIElement>;
const LI: React.FC<LIProps> = ({ children, className, ...props }) => {
  return (
    <li className={clsx(styles.li, className)} {...props}>
      {children}
    </li>
  );
};

export default LI;
