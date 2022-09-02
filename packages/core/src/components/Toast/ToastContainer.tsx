import clsx from "clsx";
import React from "react";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";

import { Button } from "../Button";
import type { IToast } from "./ToastsProvider";
import styles from "./toasts.module.css";

interface ToastContainerProps extends IToast {
  height: number;
  heights?: number[];
  hovering: boolean;
  onMount?: () => void;
  position?: number;
  preserve?: boolean;
  remove?: () => void;
  text: string;
  id: string;
}

const ToastContainer: React.ComponentType<ToastContainerProps> = ({
  // children,
  text,
  position,
  height,
  heights,
  onMount,
  remove,
  preserve,
  type,
  action,
  cancelAction,
  hovering,
  ...props
}) => {
  const [hiding] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 0);
  }, []);

  useEffect(() => {
    // force update, because...
    // the heights array (mutable ref) gets mutate
    // we want the changes to be repainted
    setTimeout(() => onMount?.(), 0);
  }, [onMount]);

  useEffect(() => {
    // auto-remove, but don't remove if hovering
    let id: NodeJS.Timeout;

    if (!preserve && !hovering) {
      id = setTimeout(remove, 4000);
    }
    return () => {
      clearTimeout(id);
    };
  }, [hovering, preserve]);

  // get the height of the toast
  const heightRef = useRef(height);
  // mutate the array

  useEffect(() => {
    // when mounted, update the heights array with current height
    heights[position] = heightRef.current;
    // when unmounting, remove current height from the heights array
    return () => {
      heights.splice(position, 1);
    };
  }, [position, heights]);

  const sum = useCallback((a: number, b: number) => a + b, []);

  return (
    <div
      data-geist-toast=""
      className={clsx("toast-container", styles.toastContainer, {
        [styles.visible]: visible,
        [styles[type]]: !!type,
      })}
      style={{
        maxHeight: position === 0 ? heightRef.current : 50,
        transform:
          // prettier-ignore
          position === 0
            ? visible && "none"
            : `translate3d(0px, calc(-${heights[0]}px + 100% + -${20 * position}px),-${position}px)
               scale(${1 - position * 0.05})`,
      }}
    >
      <div className={styles.toast}>
        <div // inner text
          ref={(el) => (heightRef.current = el?.offsetHeight - 1 + 48)}
          className={clsx(styles.message, {
            [styles.action]: action,
            [styles.cancel]: cancelAction,
          })}
        >
          {text}
        </div>
        {cancelAction && (
          <Button
            size="small"
            type="secondary"
            style={{ marginRight: 10 }}
            className={clsx("button", "small")}
          >
            {cancelAction}
          </Button>
        )}
        {action && (
          <Button size="small" className={clsx("button", "small")}>
            {action}
          </Button>
        )}
      </div>
      <style jsx>{`
        :global(.toast-area:hover) .toast-container {
          max-height: ${heightRef.current}px !important;
          transform: translate3d(
              0px,
              -${heights.slice(0, position).reduce(sum, 0) + position * 20}px,
              ${position * -1}px
            )
            scale(1) !important;
        }
        :global(.button.small) {
          min-width: auto;
          height: 24px;
          line-height: 22px;
          padding: 0 10px 0 10px;
        }
      `}</style>
    </div>
  );
};

export default ToastContainer;

// Multiline
// translate3d(0px, -236px, -2px)
//  - height 98
// translate3d(0px, -118px, -1px) scale(1) !important;
//  - height 98
// translate3d(0px, 0px, 0px) scale(1) !important;
//  - height 98

// ransform: translate3d( 0px, 118px, --1px ) scale(1) !important;
