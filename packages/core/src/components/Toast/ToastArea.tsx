import React from "react";
import { useRef, useReducer } from "react";
import clsx from "clsx";
import { useHover } from "@react-aria/interactions";
import Portal from "@reach/portal";

import useToasts from "./useToasts";
import styles from "./toasts.module.css";
import ToastContainer from "./ToastContainer";

function useForceUpdate(): () => void {
  return useReducer(() => ({}), {})[1];
}

const ToastArea = () => {
  const { hoverProps, isHovered } = useHover({});
  const { current } = useToasts();

  const messages = current?.messages ?? [];

  const heights = useRef([]);

  const forceUpdate = useForceUpdate();

  return (
    <Portal>
      <div
        {...hoverProps}
        className={clsx("toast-area", styles.toastArea, {
          [styles.multiple]: messages.length > 1,
        })}
      >
        {messages.map((e, i) => {
          return (
            <ToastContainer
              key={e.key}
              hovering={isHovered}
              position={messages.length - 1 - i}
              text={e.text}
              height={e.height}
              heights={heights.current}
              remove={() => {
                current?.removeToastByKey(e.key);
              }}
              type={e.type}
              preserve={e.preserve}
              action={e.action}
              cancelAction={e.cancelAction}
              id={e.key}
              onMount={forceUpdate}
            />
          );
        })}
      </div>
    </Portal>
  );
};

export default ToastArea;
