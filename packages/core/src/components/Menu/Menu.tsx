"use client";

import { Portal } from "@radix-ui/react-portal";
import clsx from "clsx";
import { Children, useEffect, useId, useRef, useState } from "react";
import type { FC, PropsWithChildren } from "react";
import { FocusScope, useFocusManager, usePopover } from "react-aria";

import useMediaQuery from "../../hooks/useMediaQuery";
import Drawer from "../Drawer";
import classes from "./Menu.module.css";
import MenuContext, { useMenu } from "./menu-context";

/**
 *
 * @example
 * <MenuWrapper>
 *   <MenuButton>Actions</MenuButton>
 *   <Menu width={200}>
 *     <MenuItem onClick={() => alert('One')}>One</MenuItem>
 *     <MenuItem onClick={() => alert('Two')}>Two</MenuItem>
 *     <MenuItem onClick={() => alert('Three')}>Three</MenuItem>
 *     <MenuItem onClick={() => alert('Delete')} type="error">Delete</MenuItem>
 *   </Menu>
 * </MenuWrapper>
 */
export const MenuWrapper = (({ children }) => {
  const [listElement, setListElement] = useState<HTMLUListElement | null>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState(-1);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!listElement || !buttonRef.current || !popperRef.current) return;
      if (listElement.contains(e.target as Node)) {
        return;
      }
      if (buttonRef.current.contains(e.target as Node)) {
        return;
      }
      if (popperRef.current.contains(e.target as Node)) {
        return;
      }
      setOpen(false);
    }

    document.addEventListener("click", (e) => handleClickOutside(e));

    return () => {
      document.removeEventListener("click", (e) => handleClickOutside(e));
    };
  }, [open, listElement, buttonRef.current, popperRef.current]);

  const menuId = "menu-" + useId();
  const buttonId = "menu-button-" + useId();

  return (
    <MenuContext.Provider
      value={{
        popperRef,
        buttonRef,
        listElement,
        setListElement,
        menuId,
        buttonId,
        open,
        setOpen,
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
}) satisfies FC<PropsWithChildren>;

interface MenuInnerProps {
  "aria-labelledby"?: string;
  id?: string;
  width: number;
  divide?: boolean;
}

const MenuInner: FC<PropsWithChildren<MenuInnerProps>> = ({
  divide,
  width,
  children,
}) => {
  const { menuId, setListElement, buttonId } = useMenu();

  return (
    <FocusScope contain restoreFocus autoFocus>
      <ul
        ref={setListElement}
        aria-labelledby={buttonId}
        id={menuId}
        data-geist-menu=""
        role="menu"
        tabIndex={-1}
        className={clsx(classes.menu, {
          [classes.divide]: divide,
        })}
        style={{ width }}
      >
        {children}
      </ul>
    </FocusScope>
  );
};

export interface MenuProps {
  /** default: 200 */
  width?: number;
  divide?: boolean;
}
/**
 * @see {@link MenuWrapper} for code sample usage
 */
export const Menu: FC<PropsWithChildren<MenuProps>> = ({
  children,
  width = 200,
  divide,
}) => {
  const { open, listElement, setOpen, buttonRef, selected, setSelected } =
    useMenu();

  const isSmall = useMediaQuery("(max-width:600px)");

  // When MenuButton is focused, open the menu
  // on arrow up/down
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

  // When Menu is open, listen for keyboard events
  useEffect(() => {
    if (!listElement) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          if (e.repeat) {
            // prevent holding enter from triggering
            return;
          }
          // @ts-expect-error TODO: fix .props
          Children.toArray(children)[selected]?.props?.onClick?.();
          setOpen(false);
          setSelected(0);
          break;
        case "ArrowUp": {
          e.preventDefault();
          e.stopPropagation(); // prevent scrolling
          // prevent selecting a disabled sibling
          let siblings = Children.toArray(children);
          let step = 1;
          let curr = selected!;
          if (curr <= 0) return;

          // @ts-expect-error .props
          while (siblings[curr - step]?.props?.disabled) {
            step++;
          }
          if (curr - step < 0) break;
          setSelected(curr - step);
          break;
        }
        case "ArrowDown": {
          e.preventDefault();
          e.stopPropagation(); // prevent scrolling
          // prevent selecting a disabled sibling
          let siblings = Children.toArray(children);
          let step = 1;
          let curr = selected!;
          let len = siblings.length;
          if (curr >= len - 1) return;

          // @ts-expect-error .props
          while (siblings[curr + step]?.props?.disabled) {
            step++;
          }
          if (curr + step >= len) break;
          setSelected(curr + step);
          break;
        }
      }
    };

    listElement.addEventListener("keydown", handleKeyDown);
    return () => {
      listElement.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, listElement, selected]);

  // Drawer has its own portal so don't wrap it again.
  // Drawer also handles slide animation so don't
  // conditionally render it. Rely on `show={open}` instead.
  return isSmall ? (
    <Drawer
      show={open}
      onDismiss={() => {
        setOpen(false);
      }}
    >
      <MenuInner width={width} divide={divide}>
        {children}
      </MenuInner>
    </Drawer>
  ) : open ? (
    <Portal>
      <Popper>
        <MenuInner width={width} divide={divide}>
          {children}
        </MenuInner>
      </Popper>
    </Portal>
  ) : null;
};

const Popper = (({ children }) => {
  const { popperRef, open, setOpen, buttonRef } = useMenu();

  const { arrowProps, placement, popoverProps, underlayProps } = usePopover(
    {
      // "modal": injects "padding-right: 0px; overflow: hidden;" to the html element
      // - prevents scrolling
      // - closes on outside click
      // "non-modal"
      // - allows scrolling
      // - doesn't close on outside click
      // ∆ closes on outside click, escape, but allows scrolling too...
      isNonModal: true,
      popoverRef: popperRef,
      triggerRef: buttonRef,
      placement: "bottom start",
      offset: 10,
    },
    {
      isOpen: open,
      setOpen: (val) => {
        console.log("setOpen");
        setOpen(val);
      },
      close: () => {
        console.log("close");
        setOpen(false);
      },
      open: () => {
        console.log("open");
        setOpen(true);
      },
      toggle: () => {
        console.log("toggle");
        setOpen(!open);
      },
    },
  );

  return (
    <>
      <div className="underlay" {...underlayProps} />
      <div
        ref={popperRef}
        className={classes.wrapper}
        style={popoverProps.style}
        onFocus={popoverProps.onFocus}
        onKeyDown={popoverProps.onKeyDown}
        data-popper-reference-hidden={!open}
        data-popper-escaped={false}
        data-popper-placement={placement}
      >
        <div className={classes.arrow} style={arrowProps.style} />

        {children}
      </div>
    </>
  );
}) satisfies FC<PropsWithChildren>;
