import React, { useEffect, useState, useRef, useMemo } from "react";
import clsx from "clsx";
import Portal from "@reach/portal";
import { usePopper } from "react-popper";
import { useId } from "@react-aria/utils";

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

  const menuId = useId();
  const buttonId = useId();

  return (
    <MenuContext.Provider
      value={{
        open,
        setOpen,
        menuId: `menu-${menuId}`,
        buttonId: `button-${buttonId}`,
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

const MenuInner: React.FC<MenuInnerProps> = ({ divide, width, children }) => {
  const { listRef, menuId } = useMenu();

  const isActive =
    typeof window !== "undefined" &&
    listRef.current?.contains(document.activeElement);

  return (
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
export const Menu: React.FC<MenuProps> = ({
  children,
  width = 150,
  divide,
}) => {
  const { open, listRef, setOpen, buttonRef, selected, setSelected } =
    useMenu();

  const isSmall = useMediaQuery("(max-width:600px)");

  const prevFocusedEl = useRef<HTMLElement>(
    document.activeElement as HTMLElement
  );

  useEffect(() => {
    if (open) {
      // When the menu opens, focus it
      prevFocusedEl.current = document.activeElement as HTMLElement;
      listRef.current?.focus();
    }
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

  // handle keyboard actions
  useEffect(() => {
    if (!listRef.current) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Tab":
          e.preventDefault();
          break;
        case "Escape":
          // close and focus the previous element. Likely the MenuButton.
          setOpen(false);
          prevFocusedEl.current.focus();
          break;
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

    const handleFocusChange = (e: FocusEvent) => {
      const isSelf =
        e.target === listRef.current ||
        e.target === buttonRef.current ||
        listRef.current.contains(e.target as Node) ||
        buttonRef.current.contains(e.target as Node);
      if (!isSelf) setOpen(false);
    };

    document.addEventListener("focus", handleFocusChange, true);
    document.addEventListener("touchstart", handleClick, true);
    document.addEventListener("mousedown", handleClick, true);

    return () => {
      document.removeEventListener("focus", handleFocusChange, true);
      document.removeEventListener("touchstart", handleClick, true);
      document.removeEventListener("mousedown", handleClick, true);
    };
  }, [open, buttonRef.current, listRef.current]);

  return (
    <Portal>
      {isSmall ? (
        <Drawer show={open}>
          <MenuInner width={width} divide={divide}>
            {children}
          </MenuInner>
        </Drawer>
      ) : (
        <Popper>
          <MenuInner width={width} divide={divide}>
            {children}
          </MenuInner>
        </Popper>
      )}
    </Portal>
  );
};

const Popper = ({ children }) => {
  const { open, popper, popperStyles, popperAttributes, arrow } = useMenu();

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
        key={open ? 1 : 0}
        ref={arrow}
        data-popper-arrow=""
        className={classes.arrow}
        style={popperStyles.arrow}
        {...popperAttributes.arrow}
      />
      {children}
    </div>
  );
};
