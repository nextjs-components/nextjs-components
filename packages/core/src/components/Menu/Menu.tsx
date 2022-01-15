import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import Portal from "@reach/portal";
import { usePopper } from "react-popper";

import useMediaQuery from "../../hooks/useMediaQuery";

import Drawer from "../Drawer";

import classes from "./Menu.module.css";

import MenuContext, { useMenu } from "./menu-context";

/**
 *
 * @usage
 * ```tsx
 * <MenuWrapper>
 *   <MenuButton>Actions</MenuButton>
 *   <Menu width={200}>
 *     <MenuItem onClick={() => alert('One')}>One</MenuItem>
 *     <MenuItem onClick={() => alert('Two')}>Two</MenuItem>
 *     <MenuItem onClick={() => alert('Three')}>Three</MenuItem>
 *     <MenuItem onClick={() => alert('Delete')} type="error">Delete</MenuItem>
 *   </Menu>
 * </MenuWrapper>
 * ```
 */
export const MenuWrapper = ({ children }) => {
  const listRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [popperElement, setPopperElement] = useState<HTMLDivElement>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement>(null);
  const popper = usePopper(buttonRef.current, popperElement, {
    placement: "bottom-start",
    modifiers: [
      { name: "arrow", options: { element: arrowElement } },
      { name: "offset", options: { offset: [0, 10] } },
    ],
  });

  const [selected, setSelected] = useState(-1);

  const [open, setOpen] = useState(false);

  const menuId = open ? "simple-popover" : undefined;

  return (
    <MenuContext.Provider
      value={{
        open,
        setOpen,
        menuId,
        buttonId: "",
        buttonRef,
        listRef,
        arrow: setArrowElement,
        popper: setPopperElement,
        popperStyles: popper.styles,
        popperAttributes: popper.attributes,
        selected,
        setSelected,
        typeahead: "",
        afterSelect: () => {
          /** TODO */
        },
        closeAndRestoreFocus: () => {
          /** TODO */
          setOpen(false);
        },
        handleKey: () => {
          /** TODO */
        },
        selectFirstNonDisabled: () => {
          /** TODO */
        },
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

interface MenuInnerProps {
  "aria-labelledby"?: string;
  // children: MenuItem[]
  id?: string;
  onKeyDown: any;
  width: number;
}

const MenuInner: React.FC<MenuInnerProps> = ({
  onKeyDown,
  width,
  children,
}) => {
  const { popper, listRef, arrow, popperStyles, popperAttributes, open } =
    useMenu();

  const isActive = listRef.current?.contains(document.activeElement);

  return (
    <div
      ref={popper}
      className={classes.wrapper}
      hidden={!open}
      style={popperStyles.popper}
      {...popperAttributes.popper}
    >
      <div
        // force arrow position to update on
        // initial paint
        key={open && 1}
        data-popper-arrow=""
        className={classes.arrow}
        style={popperStyles.arrow}
        ref={arrow}
        {...popperAttributes.arrow}
      />
      {children}
    </div>
  );
};

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

// Complex keyboard logic :(
export const Menu = ({ children, width = 150 }) => {
  const { open, listRef, setOpen, buttonRef, selected, setSelected } =
    useMenu();
  const isSmall = useMediaQuery("(max-width:600px)");
  console.log({ isSmall });
  const prevFocusedEl = useRef<HTMLElement>();
  // focus the menu
  // - document.activeElement
  // if (open) {
  //   prevFocusedEl.current = document.activeElement;
  //   listRef.current.focus();
  // }

  useEffect(() => {
    if (open) {
      // When the menu opens, focus it
      // and store the previous focused element
      prevFocusedEl.current = document.activeElement as HTMLElement;
      listRef.current?.focus();
    }
    return () => {
      if (open) {
        // When the menu is closing, focus the previous element
        console.log("cleanup");
        prevFocusedEl.current.focus();
      }
    };
  }, [open]);

  useEffect(() => {
    if (!buttonRef.current) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "ArrowDown":
          e.preventDefault();
          if (!open) setOpen(true);
          break;
      }
    };

    buttonRef.current?.addEventListener("keydown", handleKeyDown);
    return () => {
      buttonRef.current?.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, buttonRef.current]);

  useEffect(() => {
    if (!listRef.current) return;
    const len = listRef.current.children.length;
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Tab":
          e.preventDefault();
          break;
        case "Escape":
          setOpen(false);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          // @ts-expect-error TODO: fix .props
          React.Children.toArray(children)[selected]?.props?.onClick?.();
          setOpen(false);
          setSelected(0);
          break;
        case "ArrowUp":
          e.preventDefault();
          if (selected === -1) return;
          setSelected((s) => Math.max(s - 1, 0));
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelected((s) => Math.min(s + 1, len - 1));
          break;
      }
    };

    listRef.current?.addEventListener("keydown", handleKeyDown);
    return () => {
      listRef.current?.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, listRef.current, selected]);

  // handle outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const isOutside =
        !buttonRef.current?.contains(e.target as Node) &&
        !listRef.current?.contains(e.target as Node);

      if (open && isOutside) {
        setOpen(false);
      }
    };

    document.addEventListener("touchstart", handleClick);
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("touchstart", handleClick);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open]);

  const isActive = listRef.current?.contains(document.activeElement);

  return (
    <Portal>
      {isSmall ? (
        <Drawer show={open}>
          <ul
            data-geist-menu=""
            role="menu"
            tabIndex={-1}
            className={clsx(classes.menu, { ["focus-visible"]: isActive })}
            data-focus-visible-added={isActive ? "" : undefined}
            style={{ width }}
            ref={listRef}
          >
            {children}
          </ul>
        </Drawer>
      ) : (
        <MenuInner width={width} onKeyDown={() => {}}>
          <ul
            data-geist-menu=""
            role="menu"
            tabIndex={-1}
            className={clsx(classes.menu, { ["focus-visible"]: isActive })}
            data-focus-visible-added={isActive ? "" : undefined}
            style={{ width }}
            ref={listRef}
          >
            {children}
          </ul>
        </MenuInner>
      )}
    </Portal>
  );
};
