"use client";

import clsx from "clsx";
import { type PropsWithChildren, createContext, useContext } from "react";

import ChevronRight from "../../icons/chevron-right";
import styles from "./breadcrumbs.module.css";

interface BreadcrumbsType {
  type?: "menu";
}
const TypeContext = createContext<BreadcrumbsType>({
  type: undefined,
});

const useTypeContext = () => useContext(TypeContext);

export interface BreadcrumbsProps extends PropsWithChildren, BreadcrumbsType {}
/**
 * @usage
 * ```tsx
 * () => {
 *   const [active, setActive] = React.useState(0);
 *   return (
 *     <Breadcrumbs>
 *       <Breadcrumbs.Item active={active === 0} onClick={() => setActive(0)}>
 *         <Link href="/design/breadcrumbs">Item 1</Link>
 *       </Breadcrumbs.Item>
 *       <Breadcrumbs.Item active={active === 1} onClick={() => setActive(1)}>
 *         <Link href="/design/breadcrumbs">Item 1</Link>
 *       </Breadcrumbs.Item>
 *       <Breadcrumbs.Item active={active === 2} onClick={() => setActive(2)}>
 *         <Link href="/design/breadcrumbs">Item 3</Link>
 *       </Breadcrumbs.Item>
 *     </Breadcrumbs>
 *   );
 * }
 * ```
 */
const Breadcrumbs = ({ type, children }: BreadcrumbsProps) => {
  if (type === "menu") {
    return (
      <TypeContext.Provider value={{ type }}>
        <div className={styles.menuWrapper}>{children}</div>
      </TypeContext.Provider>
    );
  }
  return (
    <TypeContext.Provider value={{ type }}>
      <nav aria-label="Breadcrumb">
        <ol className={styles.ol}>{children}</ol>
      </nav>
    </TypeContext.Provider>
  );
};

export interface BreadcrumbsItemProps extends PropsWithChildren {
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const Item = ({
  active,
  onClick,
  children,
  disabled,
}: BreadcrumbsItemProps) => {
  const { type } = useTypeContext();
  if (type === "menu") {
    return (
      <button
        className={clsx(styles.menuItem, {
          [styles.active]: active,
          [styles.disabled]: disabled,
        })}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  return (
    <li
      aria-current={active}
      className={clsx(styles.textItem, {
        [styles.active]: active,
        [styles.disabled]: disabled,
      })}
      onClick={onClick}
    >
      {children}
      {<ChevronRight size={16} />}
    </li>
  );
};

Breadcrumbs.Item = Item;
export default Breadcrumbs;
