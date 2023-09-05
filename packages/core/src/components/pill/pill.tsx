import clsx from "clsx";
import Link from "next/link";
import type { PropsWithChildren, ReactNode } from "react";

import ChevronDown from "../../icons/chevron-down";
import { Menu as _Menu, MenuWrapper as _MenuWrapper } from "../Menu";
import { MenuButton as _MenuButton } from "../Menu/menu-button";
import { MenuItem as _MenuItem } from "../Menu/menu-item";
import styles from "./pill.module.css";

interface PillProps extends PropsWithChildren {
  href: string;
  label: string;
  prefix?: ReactNode;
}

const Pill = ({ href, label, prefix, children }: PillProps) => {
  const isExternalHref = href.startsWith("http");
  const hasChildren = !!children;
  const hasPrefix = !!prefix;
  return (
    <div className={styles.pill}>
      <Link
        href={href}
        className={clsx(styles.mainArea, {
          [styles.hasMenu]: hasChildren,
          [styles.isExternal]: isExternalHref,
          [styles.hasPrefix]: hasPrefix,
        })}
      >
        {hasPrefix && <span className={styles.prefix}>{prefix}</span>}
        {label}
        {isExternalHref && (
          <span className={styles.externalIcon}>
            <svg
              fill="none"
              height="16"
              viewBox="0 0 16 16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="External">
                <path
                  clip-rule="evenodd"
                  d="M6.75007 4H6.00007V5.5H6.75007H9.43941L5.46974 9.46967L4.93941 10L6.00007 11.0607L6.5304 10.5303L10.4989 6.56182V9.25V10H11.9989V9.25V5C11.9989 4.44772 11.5512 4 10.9989 4H6.75007Z"
                  fill="var(--ds-gray-900)"
                  fill-rule="evenodd"
                  id="Union"
                ></path>
              </g>
            </svg>
          </span>
        )}
      </Link>
      {hasChildren && <_MenuWrapper>{children}</_MenuWrapper>}
    </div>
  );
};

interface PillMenuProps extends PropsWithChildren {}

const Menu = ({ children }: PillMenuProps) => {
  // @ts-expect-error
  const childrenCount = children.length || 0;
  return (
    <>
      <_MenuButton
        variant="unstyled"
        className={styles.menuButton}
        svgOnly
        align="center"
      >
        <span className={styles.menuButtonContent}>+{childrenCount}</span>
        <ChevronDown size={16} />
      </_MenuButton>
      <_Menu>{children}</_Menu>

      <div aria-hidden={true} className={styles.divider}></div>
    </>
  );
};

const MenuItem = ({ children }) => {
  return <_MenuItem>{children}</_MenuItem>;
};

{
  /* <MenuWrapper>
  <MenuButton variant="unstyled">
    <Avatar size={30} src="https://thekevinwang.com/image/kevin.webp" />
  </MenuButton>
  <Menu width={200}>
    <MenuItem>One</MenuItem>
    <MenuItem>Two</MenuItem>
    <MenuItem>Three</MenuItem>
  </Menu>
</MenuWrapper> */
}

export default Object.assign(Pill, { Menu, MenuItem });
