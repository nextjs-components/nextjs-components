import clsx from "clsx";
import React from "react";
import { useEffect, useRef, useState } from "react";

import { isBrowser } from "../../utils/isBrowser";
import styles from "./Scroller.module.css";

interface Props {
  width?: React.HTMLAttributes<HTMLDivElement>["style"]["width"];
  height?: React.HTMLAttributes<HTMLDivElement>["style"]["height"];
}
const Scroller: React.ComponentType<React.PropsWithChildren<Props>> = ({
  width,
  height,
  children,
}) => {
  const ref = useRef<HTMLDivElement>();

  const [top, setTop] = useState(false);
  const [right, setRight] = useState(false);
  const [bottom, setBottom] = useState(false);
  const [left, setLeft] = useState(false);

  useEffect(() => {
    const handleScroll = (e) => {
      if (!ref.current) return;
      const visibleWidth = ref.current.clientWidth;
      const scrollableWidth = ref.current.scrollWidth;

      const scrolledX = ref.current.scrollLeft;
      const percentX = scrolledX / (scrollableWidth - visibleWidth);
      const x = clamp(Math.round(percentX * 100) / 100, 0, 1);

      if (!isNaN(x)) {
        switch (x) {
          case 0:
            setLeft(false);
            break;
          case 1:
            setRight(false);
            break;
          default:
            setLeft(true);
            setRight(true);
            break;
        }
      }

      const visibleHeight = ref.current.clientHeight;
      const scrollableHeight = ref.current.scrollHeight;
      const scrolledY = ref.current.scrollTop;
      const percentY = scrolledY / (scrollableHeight - visibleHeight);
      const y = clamp(Math.round(percentY * 100) / 100, 0, 1);

      if (!isNaN(y)) {
        switch (y) {
          case 0:
            setTop(false);
            break;
          case 1:
            setBottom(false);
            break;
          default:
            setTop(true);
            setBottom(true);
            break;
        }
      }
    };

    const handleResize = () => {
      if (!ref.current) return;
      // WARN: There's an edge case where clientWidth and
      // scrollWidth may differ by 1 px...
      const visibleWidth = ref.current.clientWidth;
      const scrollableWidth = ref.current.scrollWidth;
      if (Math.abs(visibleWidth - scrollableWidth) <= 1) {
        setLeft(false);
        setRight(false);
      } else {
        const scrolledX = ref.current.scrollLeft;
        const percentX = scrolledX / (scrollableWidth - visibleWidth);

        const x = clamp(Math.abs(Math.round(percentX * 100) / 100), 0, 1);
        switch (x) {
          case 0:
            setLeft(false);
            setRight(true);
            break;
          case 1:
            setRight(false);
            setLeft(true);
            break;
          default:
            setLeft(true);
            setRight(true);
            break;
        }
      }
      const visibleHeight = ref.current.clientHeight;
      const scrollableHeight = ref.current.scrollHeight;
      if (visibleHeight - scrollableHeight === 0) {
        setTop(false);
        setBottom(false);
      } else {
        const scrolledY = ref.current.scrollTop;
        const percentY = scrolledY / (scrollableHeight - visibleHeight);
        const y = clamp(Math.round(percentY * 100) / 100, 0, 1);

        switch (y) {
          case 0:
            setTop(false);
            setBottom(true);
            break;
          case 1:
            setBottom(false);
            setTop(true);
            break;
          default:
            setTop(true);
            setBottom(true);
            break;
        }
      }
    };

    if (ref.current) {
      ref.current.addEventListener("scroll", handleScroll);
    }
    isBrowser() && window.addEventListener("resize", handleResize);
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("scroll", handleScroll);
      }
      isBrowser() && window.removeEventListener("resize", handleResize);
    };
  }, [ref.current]);

  return (
    <div className={styles.overlayContainer} style={{ width, height }}>
      <div
        className={clsx(styles.overlay, {
          [styles.top]: top,
          [styles.right]: right,
          [styles.bottom]: bottom,
          [styles.left]: left,
        })}
      ></div>
      <div className={styles.scroller} ref={ref}>
        <div>{children}</div>
      </div>
    </div>
  );
};
export default Scroller;

// Copied from https://github.com/lodash/lodash/blob/master/clamp.js
function clamp(number: number, lower: number, upper: number) {
  number = +number;
  lower = +lower;
  upper = +upper;
  lower = lower === lower ? lower : 0;
  upper = upper === upper ? upper : 0;
  if (number === number) {
    number = number <= upper ? number : upper;
    number = number >= lower ? number : lower;
  }
  return number;
}
