import clsx from "clsx";
import {
  type FC,
  type PropsWithChildren,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import styles from "./dialog.module.css";

interface DialogProps {
  active?: boolean;
  className?: string;
  onAnimationDone?: () => void;
  onClickOutside?: () => void;
  width?: string;
  height?: string;
  allowOverflow?: boolean;
  drawer?: boolean;
  overlayClassname?: string;
  drawerClassname?: string;
  verticalScroll?: boolean;
  style?: React.CSSProperties;
  enableSkip?: boolean;
}
export const Dialog: FC<PropsWithChildren<DialogProps>> = ({
  active,
  children,
  className,
  onAnimationDone,
  onClickOutside,
  width,
  height = "auto",
  allowOverflow,
  drawer = true,
  overlayClassname = "",
  drawerClassname = "",
  verticalScroll = true,
  style,
  enableSkip,
  ...rest
}) => {
  const ref = useRef<HTMLDialogElement>(null);
  const innerContainerRef = useRef<HTMLDivElement>(null);

  const [shouldClose, setShouldClose] = useState(false);

  // open/close dialog in response to active prop
  useLayoutEffect(() => {
    if (ref.current) {
      if (active) {
        if (ref.current.open) return; // cannot open twice
        ref.current.showModal();
      } else {
        setShouldClose(true);
        setTimeout(() => {
          ref.current?.close();
          setShouldClose(false);
        }, 400 /* animation duration */);
      }
    }
  }, [active]);

  let handleClickOutside = useCallback(() => {
    innerContainerRef.current &&
      (innerContainerRef.current.style.marginBottom = "0px");
    onClickOutside?.();
    onAnimationDone?.();
  }, [onAnimationDone, onClickOutside]);

  // click handler for closing the dialog
  useLayoutEffect(() => {
    // https://stackoverflow.com/questions/25864259/how-to-close-the-new-html-dialog-tag-by-clicking-on-its-backdrop
    const _handleClickOutside = (event) => {
      if (ref.current?.open) {
        const rect = ref.current.getBoundingClientRect();
        const isInDialog =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (!isInDialog) {
          // ref.current.close();
          handleClickOutside();
        }
      }
    };
    ref.current.addEventListener("click", _handleClickOutside);
    return () => {
      ref.current.removeEventListener("click", _handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <dialog
      ref={ref}
      className={clsx(
        {
          [styles.allowOverflow]: drawer && allowOverflow,
          modal: !drawer,
          [styles.drawer]: drawer,
          [styles.noVerticalScroll]: drawer && !verticalScroll,
        },
        "geist-dialog",
        { hide: shouldClose },
        className,
      )}
    >
      <div
        ref={innerContainerRef}
        className={clsx({
          [styles.inner]: drawer,
          [styles.max]: height === "max",
        })}
        tabIndex={-1}
        style={{ paddingBottom: 0 }}
      >
        {active ? children : null}
      </div>
    </dialog>
  );
};
