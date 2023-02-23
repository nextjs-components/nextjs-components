import clsx from "clsx";
import React from "react";
import type { CSSProperties } from "react";
import { memo, useState } from "react";

import {
  File as FileIcon,
  Folder as FolderIcon,
  FileLambda as LambdaIcon,
  MinusSquare as MinusIcon,
  PlusSquare as PlusIcon,
} from "../../icons";
import { DepthContextProvider, useDepth } from "./DepthContext";
import styles from "./file-tree.module.css";

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
export const Folder: React.FC<React.PropsWithChildren<FolderProps>> = memo(
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
              {open || isOpen ? (
                <MinusIcon size={12} />
              ) : (
                <PlusIcon size={12} />
              )}
            </span>
            <span className={styles.icon}>{<FolderIcon size={22} />}</span>
            <span className={styles.name}>{name}</span>
          </a>
          {(open || isOpen) && <ul>{children}</ul>}
        </li>
      </DepthContextProvider>
    );
  },
);

interface FileProps extends Props {
  active?: boolean;
  type?: "lambda";
}
export const File: React.ComponentType<FileProps> = memo(
  ({ name, style, active, type }) => {
    const depth = useDepth();
    return (
      <li className={clsx(styles.file, { [styles.active]: active })}>
        <a style={style}>
          {Array.from(Array(depth)).map((_e, i) => {
            return <span key={i} data-tree-indent=""></span>;
          })}
          <span className={styles.icon}>
            {type === "lambda" ? (
              <LambdaIcon size={22} />
            ) : (
              <FileIcon size={22} />
            )}
          </span>
          <span className={styles.name}>{name}</span>
        </a>
      </li>
    );
  },
);
