import { Portal } from "@radix-ui/react-portal";
import clsx from "clsx";
import React, { useEffect, useId, useRef, useState } from "react";
import { DismissButton, Overlay, usePopover } from "react-aria";
import { FocusScope, useFocusManager } from "react-aria";
import { usePopper } from "react-popper";

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

  const menuId = "menu-" + useId();
  const buttonId = "menu-button-" + useId();

  return (
    <MenuContext.Provider
      value={{
        open,
        setOpen,
        menuId,
        buttonId,
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
  id?: string;
  width: number;
  divide?: boolean;
}

const MenuInner: React.FC<React.PropsWithChildren<MenuInnerProps>> = ({
  divide,
  width,
  children,
}) => {
  const { listRef, menuId } = useMenu();

  const isActive =
    typeof window !== "undefined" &&
    listRef.current?.contains(document.activeElement);

  return (
    <FocusScope contain restoreFocus autoFocus>
      <ul
        id={menuId}
        data-geist-menu=""
        role="menu"
        tabIndex={-1}
        className={clsx(classes.menu, {
          [classes.divide]: divide,
          ["focus-visible"]: isActive,
        })}
        data-focus-visible-added={isActive ? "" : undefined}
        style={{ width }}
        ref={listRef}
      >
        {children}
      </ul>
    </FocusScope>
  );
};

interface MenuProps {
  /** default: 150 */
  width?: number;
  divide?: boolean;
}
/**
 * @see {@link MenuWrapper} for code sample usage
 */
export const Menu: React.FC<React.PropsWithChildren<MenuProps>> = ({
  children,
  width = 150,
  divide,
}) => {
  const { open, listRef, setOpen, buttonRef, selected, setSelected } =
    useMenu();

  const isSmall = useMediaQuery("(max-width:600px)");

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

  // handle keyboard actions
  useEffect(() => {
    if (!listRef.current) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          // @ts-expect-error TODO: fix .props
          React.Children.toArray(children)[selected]?.props?.onClick?.();
          setOpen(false);
          setSelected(0);
          break;
        case "ArrowUp": {
          e.preventDefault();
          // prevent selecting a disabled sibling
          let siblings = React.Children.toArray(children);
          let step = 1;
          let curr = selected;
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
          // prevent selecting a disabled sibling
          let siblings = React.Children.toArray(children);
          let step = 1;
          let curr = selected;
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

    listRef.current?.addEventListener("keydown", handleKeyDown);
    return () => {
      listRef.current?.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, listRef.current, selected]);

  // Drawer has its own portal so don't wrap it again.
  // Drawer also handles slide animation so don't
  // conditionally render it. Rely on `show={open}` instead.
  return isSmall ? (
    <Drawer
      show={open}
      onDismiss={() => {
        console.log("Drawer dismissed");
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

// This should be conditionally rendered due to `usePopover` behavior
const Popper = ({ children }) => {
  const {
    open,
    popper,
    popperStyles,
    popperAttributes,
    arrow,
    setOpen,
    listRef,
    buttonRef,
  } = useMenu();

  // injects "padding-right: 0px; overflow: hidden;" to the html element
  const _popover = usePopover(
    {
      popoverRef: listRef,
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
      <div
        // this prevents background scroll
        {..._popover.underlayProps} // what does this even do?
        // (e)=>{
        //   // fixes a firefox issue that starts text selection https://bugzilla.mozilla.org/show_bug.cgi?id=1675846
        //   if (e.target === e.currentTarget) e.preventDefault();
        // }
        className="underlay"
        style={{ position: "fixed", inset: 0 }}
      />
      <div
        ref={popper}
        className={classes.wrapper}
        hidden={!open}
        style={popperStyles.popper}
        // style={_popover.popoverProps.style}
        // onBlur={_popover.popoverProps.onBlur}
        // ^ don't want this because it causes inspector open (Cmd+Shift+C) to close the menu.
        onFocus={_popover.popoverProps.onFocus}
        onKeyDown={_popover.popoverProps.onKeyDown}
        {...popperAttributes.popper}
        data-popper-reference-hidden={!open}
        data-popper-escaped={false}
        data-popper-placement={_popover.placement}
      >
        <div
          ref={arrow}
          data-popper-arrow=""
          className={classes.arrow}
          style={popperStyles.arrow}
          // style={_popover.arrowProps.style}
          {...popperAttributes.arrow}
        />

        {children}
      </div>
    </>
  );
};
