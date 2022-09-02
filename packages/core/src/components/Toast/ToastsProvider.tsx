import React from "react";
import { createContext, useRef, useState } from "react";

type ToastType = "success" | "error" | "violet";
export interface IToast {
  height: number;
  key: string;
  preserve?: boolean;
  text: string;
  type?: ToastType;
  action?: string;
  cancelAction?: string;
}

export interface IToastsContext {
  current?: {
    messages: IToast[];
    message: (message: Partial<IToast> | string) => void;
    error: (message: Partial<IToast> | string) => void;
    success: (message: Partial<IToast> | string) => void;
    removeToastByKey: (key: string) => void;
  };
}

const throwerFn = () => {
  throw new Error("Missing a ToastsProvider");
};

export const ToastsContext = createContext<IToastsContext>({
  current: {
    messages: [],
    message: throwerFn,
    error: throwerFn,
    success: throwerFn,
    removeToastByKey: throwerFn,
  },
});

const ToastsProvider = ({ children }) => {
  const [messages, setMessages] = useState<IToast[]>([]);

  const message = (toast: Partial<IToast> | string) => {
    let text, preserve, action, cancelAction;
    if (typeof toast === "string") {
      text = toast;
    } else {
      ({ text, preserve, action, cancelAction } = toast);
    }
    setMessages((prev) => [
      ...prev,
      {
        text,
        preserve,
        height: action || cancelAction ? 72 : 64,
        key: (+new Date()).toString(),
        action,
        cancelAction,
      },
    ]);
  };
  const error = (toast: Partial<IToast> | string) => {
    let text, preserve, action, cancelAction;
    if (typeof toast === "string") {
      text = toast;
    } else {
      ({ text, preserve, action, cancelAction } = toast);
    }
    setMessages((prev) => [
      ...prev,
      {
        text,
        preserve,
        height: action || cancelAction ? 72 : 64,
        key: (+new Date()).toString(),
        action,
        cancelAction,
        type: "error",
      },
    ]);
  };
  const success = (toast: Partial<IToast> | string) => {
    let text, preserve, action, cancelAction;
    if (typeof toast === "string") {
      text = toast;
    } else {
      ({ text, preserve, action, cancelAction } = toast);
    }
    setMessages((prev) => [
      ...prev,
      {
        text,
        preserve,
        height: action || cancelAction ? 72 : 64,
        key: (+new Date()).toString(),
        action,
        cancelAction,
        type: "success",
      },
    ]);
  };
  const removeToastByKey = (key: string) => {
    setMessages((prev) => prev.filter((p) => p.key !== key));
  };

  return (
    <ToastsContext.Provider
      value={{
        current: {
          messages,
          message,
          error,
          success,
          removeToastByKey,
        },
      }}
    >
      {children}
    </ToastsContext.Provider>
  );
};

export default ToastsProvider;
