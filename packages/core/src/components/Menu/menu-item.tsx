import React, { useRef, forwardRef, PointerEventHandler } from "react";
import clsx from "clsx";

import { useMenu } from "./menu-context";

import classes from "./Menu.module.css";

interface MenuItemInnerProps {
  children?: any;
  Component?: any;
  "aria-disabled": boolean | "true" | "false";
  "aria-labelledby"?: string;
  onPointerUp: () => void;
  onPointerMove: PointerEventHandler<HTMLLIElement>;
  "data-selected"?: "";
  className: string;
}

const MenuItemInner: React.ForwardRefExoticComponent<
  MenuItemInnerProps & React.RefAttributes<unknown>
> = forwardRef(
  ({ children, className, onPointerMove, onPointerUp, ...props }, ref) => {
    return (
      <li
        ref={ref as any}
        aria-disabled={props["aria-disabled"]}
        aria-labelledby={props["aria-labelledby"]}
        data-geist-menu-item=""
        data-selected={props["data-selected"]}
        className={className}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
        tabIndex={-1}
        onKeyPress={() => {
          console.log("keydown");
        }}
      >
        {children}
      </li>
    );
  }
);
MenuItemInner.displayName = "MenuItemInner";

interface MenuItemProps {
  disabled?: boolean;
  onClick?: () => void;
  value?: any; // fixme
  isLink?: boolean;
  type?: "error";
  divide?: boolean;
  error?: boolean;
}

export const MenuItem: React.ComponentType<MenuItemProps> = ({
  children,
  onClick,
  type,
  divide,
  error,
  disabled,
}) => {
  const { setOpen, listRef, selected, setSelected } = useMenu();

  const itemRef = useRef<HTMLLIElement>();

  // https://stackoverflow.com/a/23528539/9823455
  // const idx =
  //   listRef.current?.children &&
  //   Array.prototype.indexOf.call(listRef.current.children, itemRef.current);
  // equivalent to
  const idx = [...(listRef.current?.childNodes.values() ?? [])].indexOf(
    itemRef.current
  );

  return (
    <MenuItemInner
      ref={itemRef}
      aria-disabled={disabled ? "true" : undefined}
      aria-labelledby={"FIXME-menu-item-278"}
      data-selected={selected === idx ? "" : undefined}
      className={clsx(classes.item, classes[type], {
        [classes.divide]: divide,
        [classes.error]: error,
        [classes.disabled]: disabled,
      })}
      onPointerUp={() => {
        if (disabled) return;
        onClick?.();
        setOpen(false);
      }}
      onPointerMove={() => {
        setSelected(idx);
      }}
    >
      <span>{children}</span>
    </MenuItemInner>
  );
};
