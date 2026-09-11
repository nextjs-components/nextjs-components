"use client";

import { Portal } from "@radix-ui/react-portal";
import clsx from "clsx";
import {
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
  type ReactNode,
  type HTMLAttributes,
} from "react";
import { FocusScope, mergeProps, useDialog, useModalOverlay } from "react-aria";
import { useOverlayTriggerState } from "react-stately";

import styles from "./drawer.module.css";

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "role"> {
  role?: "dialog" | "alertdialog";
  show: boolean;
  onDismiss?: () => void;
  header?: ReactNode;
  footer?: ReactNode;
}

function DrawerContent({
  children,
  show,
  onDismiss,
  header,
  footer,
  className,
  ...props
}: PropsWithChildren<Props>) {
  const ref = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);
  const state = useOverlayTriggerState({
    isOpen: show,
    onOpenChange: (open) => {
      if (!open) onDismiss?.();
    },
  });
  const { modalProps, underlayProps } = useModalOverlay(
    { isDismissable: true },
    state,
    ref,
  );
  const { dialogProps } = useDialog(props, ref);

  return (
    <Portal>
      <div className={styles.layer} data-open={show || undefined}>
        <div
          {...underlayProps}
          className={clsx(
            styles.overlay,
            "fixed inset-0 bg-geist-background-200/50",
          )}
        />
        <FocusScope contain={show} restoreFocus autoFocus>
          <div
            {...mergeProps(props, modalProps, dialogProps, {
              onTouchStart: (event: React.TouchEvent<HTMLDivElement>) => {
                touchStart.current =
                  event.currentTarget.scrollTop === 0
                    ? event.touches[0].clientY
                    : null;
              },
              onTouchEnd: (event: React.TouchEvent<HTMLDivElement>) => {
                if (
                  touchStart.current !== null &&
                  event.changedTouches[0].clientY - touchStart.current > 100
                ) {
                  onDismiss?.();
                }
                touchStart.current = null;
              },
              onTouchCancel: () => {
                touchStart.current = null;
              },
            })}
            ref={ref}
            aria-hidden={!show || undefined}
            data-geist-drawer=""
            className={clsx(
              styles.panel,
              "relative w-full max-h-[90dvh] overflow-y-auto rounded-t-geist-xl border-t border-geist-gray-alpha-400 bg-geist-background-100 font-geist-sans text-geist-gray-1000",
              className,
            )}
          >
            {header && <div className={styles.header}>{header}</div>}
            {children}
            {footer && (
              <footer
                className={clsx(
                  styles.footer,
                  "sticky bottom-0 p-3 bg-geist-background-200",
                )}
              >
                {footer}
              </footer>
            )}
          </div>
        </FocusScope>
      </div>
    </Portal>
  );
}

export default function Drawer(props: PropsWithChildren<Props>) {
  const [present, setPresent] = useState(props.show);
  useEffect(() => {
    if (props.show) {
      setPresent(true);
      return;
    }
    const timeout = setTimeout(() => setPresent(false), 400);
    return () => clearTimeout(timeout);
  }, [props.show]);
  return props.show || present ? <DrawerContent {...props} /> : null;
}
