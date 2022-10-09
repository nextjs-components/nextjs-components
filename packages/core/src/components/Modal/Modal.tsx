import { Portal } from "@radix-ui/react-portal";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { FocusScope, usePreventScroll } from "react-aria";

import { Text } from "../Text";
import styles from "./Modal.module.css";

export interface ModalProps {
  isOpen: boolean;
  active: boolean;
  onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  disableBackdropClick?: boolean;
  isDismissable?: boolean;
}

export interface BodyProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}
export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
export interface SubtitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}
export interface ActionsProps extends React.HTMLAttributes<HTMLElement> {}
export interface ActionProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

/**
 * https://vercel.com/design/modal
 * https://react-spectrum.adobe.com/react-aria/useDialog.html#example
 */
export const Modal = (props) => {
  const { children, disableBackdropClick, active, onClickOutside } = props;

  const [mounted, setMounted] = useState(() => active);
  useEffect(() => {
    setTimeout(() => {
      setMounted(active);
    }, 200);
  }, [active]);
  // Handle interacting outside the dialog and pressing
  // the Escape key to close the modal.

  // Prevent scrolling while the modal is open, and hide content
  // outside the modal from screen readers.
  usePreventScroll({ isDisabled: !active });
  // Note: isDisabled
  // - `true` means the scroll lock itself is disabled
  // - `false` means the scroll lock itself enabled
  // ...so this value should be the logical opposite of if the modal is open (`active`)

  // Mount the portal for as long as `active` or `mounted` is true
  // - `mounted` will _trail_ behind `active` state changes, by 200

  return active || mounted ? (
    <Portal>
      <div className={"geist-overlay"}>
        <div
          className={clsx("geist-overlay-backdrop", {
            active: active && mounted,
          })}
          onClick={onClickOutside}
        />
        <div
          className={clsx(styles.wrapper, {
            [styles.active]: active && mounted,
          })}
        >
          <FocusScope contain restoreFocus autoFocus>
            <div aria-hidden="true" className="focus-trap-backdrop"></div>
            <div tabIndex={0} className="focus-trap">
              {children}
            </div>
          </FocusScope>
        </div>
      </div>
    </Portal>
  ) : null;
};

export const Body = (props) => {
  const { children, ...rest } = props;

  return (
    <div {...rest} className={clsx(styles.modalBody, styles.padding)}>
      {children}
    </div>
  );
};
export const Header = ({ children, ...props }) => (
  <header {...props} className={styles.header}>
    <h3>{children}</h3>
  </header>
);
export const Title = ({ children, ...props }) => (
  <Text as="h3" weight={600} size={24} {...props} className={styles.title}>
    {children}
  </Text>
);
export const Subtitle = ({ children, ...props }) => (
  <Text
    align="center"
    {...props}
    color="geist-secondary"
    className={clsx(styles.subtitle, "geist-themed", "geist-secondary")}
  >
    {children}
  </Text>
);
export const Actions = ({ children, ...props }: ActionsProps) => (
  <footer {...props} className={styles.actions}>
    {children}
  </footer>
);
export const Action = ({
  children,
  type = "button",
  ...props
}: ActionProps) => {
  return (
    <button type={type} {...props} className={styles.action}>
      {children}
    </button>
  );
};
