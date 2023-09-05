import Link from "next/link";
import { type PropsWithChildren, ReactNode, useId } from "react";

import reset from "../../styles/reset/reset.module.css";
import styles from "./footer.module.css";

export interface FooterProps extends PropsWithChildren {
  subFooter?: ReactNode;
}
const Footer = ({ children, subFooter }: FooterProps) => {
  return (
    <footer className={styles.footer}>
      <nav aria-label="Directory" role="navigation">
        {children}
      </nav>
      {subFooter && <section>{subFooter}</section>}
    </footer>
  );
};

export interface FooterGroupProps extends PropsWithChildren {
  title?: ReactNode;
}
const FooterGroup = ({ title, children }: FooterGroupProps) => {
  const id = useId();
  return (
    <div className={styles.group}>
      <input id={id} className={reset.visuallyHidden} type="checkbox" />
      <label htmlFor={id}>
        <h2 className={styles.header}>{title}</h2>
      </label>
      <ul className={styles.list}>{children}</ul>
    </div>
  );
};

const FooterColumn = ({ children }: PropsWithChildren) => {
  return <div className={styles.column}>{children}</div>;
};

export interface FooterLinkProps extends PropsWithChildren {
  href: string;
}
const FooterLink = ({ href, children }: FooterLinkProps) => {
  return (
    <li className={styles.item}>
      <Link href={href}>{children}</Link>
    </li>
  );
};

export default Object.assign(Footer, {
  Group: FooterGroup,
  Column: FooterColumn,
  Link: FooterLink,
});
