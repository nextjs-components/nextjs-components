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
            "njc:fixed njc:inset-0 njc:bg-background-200/50",
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
              "njc:relative njc:w-full njc:max-h-[90dvh] njc:overflow-y-auto njc:rounded-t-xl njc:border-t njc:border-gray-alpha-400 njc:bg-background-100 njc:font-sans njc:text-gray-1000",
              className,
            )}
          >
            {header && <div className={styles.header}>{header}</div>}
            {children}
            {footer && (
              <footer
                className={clsx(
                  styles.footer,
                  "njc:sticky njc:bottom-0 njc:p-3 njc:bg-background-200",
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
