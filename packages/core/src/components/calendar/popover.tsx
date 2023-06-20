"use client";

import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";
import { DismissButton, useModal, useOverlay } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import clsx from "clsx";
import { forwardRef } from "react";

import styles from "./calendar.module.css";

interface PopoverProps {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  style?: React.CSSProperties;
}
export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  ({ children, isOpen, onOpenChange, style, ...otherProps }, ref) => {
    // Handle events that should cause the popup to close,
    // e.g. blur, clicking outside, or pressing the escape key.
    let { overlayProps } = useOverlay(
      {
        isOpen,
        onClose: () => onOpenChange(false),
        shouldCloseOnBlur: true,
        isDismissable: true,
      },
      // @ts-expect-error - fix type
      ref,
    );

    let { modalProps } = useModal();
    let { dialogProps } = useDialog(
      otherProps,
      // @ts-expect-error - fix type
      ref,
    );

    // Add a hidden <DismissButton> component at the end of the popover
    // to allow screen reader users to dismiss the popup easily.
    return (
      <FocusScope contain restoreFocus>
        <div
          {...mergeProps(overlayProps, dialogProps, otherProps, modalProps)}
          ref={ref}
          className={clsx(styles.popover)}
          style={{ width: 280, ...style }}
        >
          {children}
          <DismissButton onDismiss={() => onOpenChange(false)} />
        </div>
      </FocusScope>
    );
  },
);
