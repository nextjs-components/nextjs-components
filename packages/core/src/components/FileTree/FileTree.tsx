import React from "react";
import type { CSSProperties, ComponentType } from "react";
import { useState, memo } from "react";
import clsx from "clsx";

import styles from "./file-tree.module.css";
import { useDepth, DepthContextProvider } from "./DepthContext";

import {
  plusIcon,
  minusIcon,
  /**
   * TODO - convert to JSX icons
   */
  folderIcon,
  fileIcon,
  lambdaIcon,
} from "./file-tree-icons";

export const Tree = ({ children, style }) => {
  return (
    <div className={styles.tree} style={style}>
      {children}
    </div>
  );
};

interface Props {
  style?: CSSProperties;
  name: string;
}

interface FolderProps extends Props {
  open?: boolean;
  defaultOpen?: boolean; // TODO
  onToggle?: () => void;
}
export const Folder: ComponentType<FolderProps> = memo(
  ({ children, name, open, style, defaultOpen = false }) => {
    const depth = useDepth();
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
      <DepthContextProvider value={1 + depth}>
        <li className={clsx(styles.folder, { open: isOpen || open })}>
          <a title={name} onClick={() => setIsOpen((s) => !s)} style={style}>
            {Array.from(Array(depth)).map((_e, i) => {
              return <span key={i} data-tree-indent=""></span>;
            })}
            <span className={styles.status}>
              {open || isOpen ? minusIcon : plusIcon}
            </span>
            <span className={styles.icon}>{folderIcon}</span>
            <span className={styles.name}>{name}</span>
          </a>
          {(open || isOpen) && <ul>{children}</ul>}
        </li>
      </DepthContextProvider>
    );
  }
);

interface FileProps extends Props {
  active?: boolean;
  type?: "lambda";
}
export const File: ComponentType<FileProps> = memo(
  ({ name, style, active, type }) => {
    const depth = useDepth();
    return (
      <li className={clsx(styles.file, { [styles.active]: active })}>
        <a style={style}>
          {Array.from(Array(depth)).map((_e, i) => {
            return <span key={i} data-tree-indent=""></span>;
          })}
          <span className={styles.icon}>
            {type === "lambda" ? lambdaIcon : fileIcon}
          </span>
          <span className={styles.name}>{name}</span>
        </a>
      </li>
    );
  }
);
