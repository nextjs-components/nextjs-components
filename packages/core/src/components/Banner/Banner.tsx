import React from "react";
import Link from "next/link";
import clsx from "clsx";

import XIcon from "../../icons/XIcon";

import { default as useBanner } from "./useBanner";

import styles from "./Banner.module.css";
import { IconSizeContext } from "../../contexts/IconSizeContext";

interface Props {
  title: string;
  subtitle?: string;
  linkText: string;
  href: string;
  localStorageKey?: string;
}

const Banner: React.ComponentType<Props> = ({
  href,
  title,
  subtitle,
  linkText,
  localStorageKey,
}) => {
  const [showBanner, handleClose] = useBanner(localStorageKey);
  return showBanner ? (
    <div
      role="banner"
      className={clsx([
        // "invert-theme",
        styles.banner,
      ])}
    >
      <Link href={href}>
        <a>
          <span className={styles.title}>{title}</span>
          <span className={styles.subtitle}>{subtitle}</span>
          <span className={styles.link}>{linkText}</span>
        </a>
      </Link>
      <button
        className={styles.close}
        aria-label="Hide banner"
        onClick={handleClose}
      >
        <IconSizeContext.Provider value={{ size: 18 }}>
          <XIcon />
        </IconSizeContext.Provider>
      </button>
    </div>
  ) : null;
};

export default Banner;
