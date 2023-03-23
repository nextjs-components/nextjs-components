import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import React, {
  type ContextType,
  type Dispatch,
  type FC,
  type MutableRefObject,
  type PropsWithChildren as PWC,
  type ReactNode,
  type Reducer,
  type ReducerAction,
  type SetStateAction,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { useFocusRing } from "react-aria";

import { useMediaQuery } from "../../hooks";
import { ChevronDown, Search, X } from "../../icons";
import reset from "../../styles/reset/reset.module.css";
import { Spinner } from "../Spinner";
import { Text } from "../Text";
import styles from "./combobox.module.css";
import { Dialog } from "./dialog";
import iconButton from "./icon-button.module.css";

const useLayoutEffect =
  typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

/**
 * queries a <ul> for all its [data-descendant] items and returns them
 * as a `list` ref
 */
let useListItems = () => {
  let listRef = useRef([]); // e
  let mapRef = useRef({}); // t
  let [, force] = useState<{}>(); // n
  let ref = useRef<HTMLUListElement>(null); // r

  useLayoutEffect(() => {
    if (!ref.current) return;
    let items = Array.from(ref.current.querySelectorAll("[data-descendant]"));
    let isOutOfSync =
      // UL's data-descendant length is different than the listRef length
      items.length !== listRef.current.length ||
      // UL's data-descendant elements are different than the listRef elements
      !items.every((t, n) => listRef.current[n].element === t);

    if (isOutOfSync) {
      listRef.current = items.map((el) => {
        let n = el.getAttribute("data-descendant");
        if (!n)
          throw Error("Descendant element must have a data-descendant key");
        let r = mapRef.current[n];
        return {
          element: el,
          ...r,
        };
      });
      // force a re-render to synchronize everything
      force({});
    }
  });

  return {
    ref: ref,
    list: listRef,
    map: mapRef,
    force: force,
  };
};

/**
 * Proxies the ComboboxContet's `list`, `map`, and `force` fields.
 *
 * These three fields ultimately come from {@link useListItems}.
 */
const ListContext = createContext({
  list: { current: [] } as ContextType<typeof ComboboxContext>["list"],
  map: { current: {} } as ContextType<typeof ComboboxContext>["map"],
  force: (({}) => {}) as ContextType<typeof ComboboxContext>["force"],
});

const useValue = (
  context: typeof ListContext,
  t: Omit<Item, "_internalId">,
) => {
  let [index, setIndex] = useState(-1);
  let ref = useRef<HTMLLIElement>(null);
  let { list, map, force } = useContext(context);
  let id = useId();

  map.current["asd"];
  useLayoutEffect(() => {
    if (map) {
      map.current[id] = {
        ...t,
        _internalId: id,
      };
    }
    force?.({});
    return () => {
      delete map?.current[id];
      list && (list.current = list.current.filter((e) => e._internalId !== id));
      setIndex(-1);
      force?.({});
    };
  }, []);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.setAttribute("data-descendant", id);
      if (map?.current[id]) {
        map.current[id] = {
          ...t,
          _internalId: id,
        };
      }
      const nextId = list
        ? list.current.findIndex((e) => e._internalId === id)
        : -1;
      setIndex(nextId);
    }
  });

  return {
    index,
    ref,
    id,
  };
};

interface Item {
  callback(): void;
  disabled?: boolean;
  displayValue?: string;
  isMenu?: boolean;
  label: string;
  prefix?: ReactNode;
  value: string;
  _internalId: string;
}

interface ComboboxProps {
  value?: string | null;
  className?: string;
  noNegativeIndex?: boolean;
  onChange?: (value: string | null) => void;
  filter?: <T extends Item[]>(list: T, inputValue: string) => T;
  size?: "small" | "large";
  width?: number | string;
  errored?: boolean;
  disabled?: boolean;
  clearable?: boolean;
  placeholder?: string;
  "aria-label"?: string;
  onChangeOpen?: (open: boolean) => void;
  noTextSelection?: boolean;
  noInputPrefix?: boolean;
  onClear?: () => void;
  prefixIcon?: ReactNode;
  allowTab?: boolean;
  shouldContinue?: boolean;
  showMenuButton?: boolean;
}

interface State {
  open: boolean;
  showAllResults: boolean;
  inputValue: string;
  selectedValue: string | null;
  selectedIndex: number;
}

type Action =
  | {
      type: "OPEN";
      selectedIndex?: number;
    }
  | {
      type: "RESET";
      inputValue: string;
    }
  | {
      type: "CONTINUE";
      selectedValue: string;
    }
  | {
      type: "NAVIGATE";
      selectedIndex: number;
    }
  | {
      type: "CLEAR";
    }
  | {
      type: "CLOSE";
    }
  | {
      type: "CHANGE";
      inputValue: string;
    }
  | {
      type: "SELECT";
      selectedValue: string;
    };

const reducer: Reducer<State, Action> = (state, action) => {
  // update state based on action
  switch (action.type) {
    case "OPEN":
      return {
        ...state,
        open: true,
        showAllResults: true,
        selectedIndex: 0,
      };
    case "CLOSE":
      return {
        ...state,
        open: false,
      };
    case "CHANGE":
      return {
        ...state,
        selectedIndex: 0,
        inputValue: action.inputValue,
        showAllResults: false,
        open: true,
      };
    case "SELECT":
      return {
        ...state,
        selectedValue: action.selectedValue,
        inputValue: null,
        open: false,
      };
    case "CONTINUE":
      return {
        ...state,
        selectedValue: action.selectedValue,
        open: true,
      };
    case "NAVIGATE":
      return {
        ...state,
        selectedIndex: action.selectedIndex,
      };
    case "RESET":
      return {
        ...state,
        inputValue: action.inputValue,
      };
    case "CLEAR":
      return {
        ...state,
        inputValue: "",
        selectedValue: null,
      };
    default:
      return state;
  }
};

const ComboboxContext = createContext({
  allowTab: undefined,
  ariaLabel: undefined,
  clearSelectedValue(e: any) {},
  clearable: true,
  disabled: undefined,
  /**
   * - T = "OPEN"
   * - A = "CLOSE"
   * - S = "RESET"
   * - z = "CLEAR"
   * - O = "CHANGE"
   * - I = "SELECT"
   * - N = "CONTINUE"
   * - D = "NAVIGATE";
   */
  dispatch: (() => {}) as Dispatch<ReducerAction<Reducer<State, Action>>>,
  errored: undefined,
  filterList: [],
  footerRef: { current: null },
  force: (() => {}) as Dispatch<SetStateAction<{}>>,
  inputId: "combobox-input-:R6ol8mH1:",
  inputRef: { current: null } as MutableRefObject<HTMLInputElement | null>,
  inputValue: "",
  isMobile: false,
  list: { current: Array(0) },
  listId: "combobox-list-:R6ol8m:",
  listRef: { current: null } as MutableRefObject<HTMLUListElement | null>,
  map: {
    current: {},
  } as MutableRefObject<Record<string, Item>>,
  noInputPrefix: undefined,
  noNegativeIndex: undefined,
  noTextSelection: undefined,
  onSelect(e: any): void {},
  open: false,
  openWithSelection() {},
  placeholder: "",
  prefixIcon: undefined,
  selectedIndex: 0,
  selectedValue: null,
  showMenuButton: true,
  showAllResults: true,
  size: undefined as ComboboxProps["size"],
});
const useComboboxContext = () => useContext(ComboboxContext);

/**
<Combobox placeholder="Search...">
  <Combobox.Input />
  <Combobox.List>
    <Combobox.Option value="a">One</Combobox.Option>
    <Combobox.Option value="b">Two</Combobox.Option>
    <Combobox.Option value="c">Three</Combobox.Option>
  </Combobox.List>
</Combobox>
  */
const Combobox = forwardRef<unknown, PWC<ComboboxProps>>(
  (
    {
      children,
      placeholder,
      value,
      onChange,
      onClear,
      shouldContinue = false,
      onChangeOpen,
      noNegativeIndex,
      disabled,
      errored,
      width,
      size,
      filter = (items, searchTerm) => {
        if (!searchTerm) return items;

        // crude filtering
        return items.filter((item) => {
          return (
            item.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.label?.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
      },
      noTextSelection,
    },
    forwardedRef,
  ) => {
    const id = useId();
    const inputId = "combobox-input-" + id;
    const listId = "combobox-list-" + id;
    // U
    const inputRef = useRef<HTMLInputElement>(null);
    // q
    const footerRef = useRef(null);

    const { ref: listRef, ...Y } = useListItems();
    const [
      {
        inputValue,
        // et
        open,
        selectedIndex,
        selectedValue,
        showAllResults,
      },
      dispatch,
    ] = useReducer(reducer, {
      open: false,
      showAllResults: true,
      inputValue: "",
      selectedValue: null,
      selectedIndex: 0,
    });

    // trigger onChangeOpen prop when open changes
    useEffect(() => {
      onChangeOpen?.(open);
    }, [onChangeOpen, open]);

    useImperativeHandle(
      forwardedRef,
      () => ({
        setValue(e) {
          dispatch({
            type: "RESET",
            inputValue: e,
          });
        },
        setSelectedValue(e) {
          dispatch({
            type: "CONTINUE",
            selectedValue: e,
          });
        },
        setSelectedIndex(e) {
          dispatch({
            type: "NAVIGATE",
            selectedIndex: e,
          });
        },
        getSelectedIndex: () => X,
        clear() {
          dispatch({
            type: "CLEAR",
          });
        },
        close() {
          dispatch({
            type: "CLOSE",
          });
        },
      }),
      [dispatch, selectedIndex],
    );

    // controlled handling
    let actualValue = value ? value : selectedValue;
    // ei
    let items = Object.values(Y.map.current) as Item[];
    // eo
    let regularItems = [];
    // MenuItems are sent to the end of the list
    // es
    let menuItems = [];

    for (let item of items) {
      item.isMenu ? menuItems.push(item) : regularItems.push(item);
    }

    let result = showAllResults
      ? regularItems
      : filter(regularItems, inputValue);
    let allItems =
      showAllResults || result.length ? [...result, ...menuItems] : [];

    function handleOpenWithSelection() {
      if (!open) {
        setTimeout(() => {
          noTextSelection || inputRef.current?.select?.();
        }, 10);
        dispatch({
          type: "OPEN",
        });
      }
    }

    // when not open, display the selected value
    useEffect(() => {
      let timerId;

      if (!open) {
        if (actualValue && items?.length) {
          let match = items.find((e) => e.value === actualValue);
          if (match) {
            // console.log({ match, inputValue });
            if (match.displayValue) {
              dispatch({
                type: "RESET",
                inputValue: actualValue,
              });
            } else if (inputValue) {
              timerId = K(() => {
                dispatch({
                  type: "RESET",
                  inputValue: match.label,
                });
              });
            } else {
              dispatch({
                type: "RESET",
                inputValue: match.label,
              });
            }
          } else {
            dispatch({
              type: "RESET",
              inputValue: actualValue,
            });
          }
        }
        return () => {
          clearTimeout(timerId);
        };
      }
    }, [actualValue, open, items.length]);

    // coerce null to empty string
    useEffect(() => {
      null === value &&
        dispatch({
          type: "RESET",
          inputValue: "",
        });
    }, [value, dispatch]);

    const isMobile = useMediaQuery("(max-width: 600px)");
    return (
      <ComboboxContext.Provider
        // @ts-expect-error TODO: satisfy context type
        value={{
          // state
          selectedIndex,
          selectedValue,
          inputValue,
          open,
          showAllResults,
          // ---
          dispatch,
          disabled,
          errored,
          size,
          inputId,
          inputRef,
          listId,
          listRef,
          footerRef,
          placeholder,
          filterList: allItems,
          isMobile,
          clearSelectedValue: function (e) {
            e.preventDefault();
            onClear?.(); // E
            onChange?.(null);
            inputRef.current?.focus(),
              isMobile ||
                dispatch({
                  type: "CLOSE",
                });
            open
              ? K(() => {
                  dispatch({
                    type: "CLEAR",
                  });
                })
              : dispatch({
                  type: "CLEAR",
                });
          },
          onSelect: function (e) {
            onChange?.(e);
            shouldContinue
              ? dispatch({
                  type: "CONTINUE",
                  selectedValue: e,
                })
              : dispatch({
                  type: "SELECT",
                  selectedValue: e,
                });
          },
          noNegativeIndex,
          openWithSelection: handleOpenWithSelection,
          // list, map, force
          list: Y.list,
          map: Y.map,
          force: Y.force,
        }}
      >
        <div
          className={styles.screenReaderSelect}
          tabIndex={0}
          aria-expanded="false"
          aria-haspopup="listbox"
          aria-owns={listId}
          role="combobox"
          style={{ width }}
        >
          {/* <pre>
            {JSON.stringify(
              {
                // inputValue,
                // open,
                selectedIndex,
                selectedValue,
                // showAllResults,
                // ...Y,
              },
              null,
              2,
            )}
          </pre> */}
          {children}
        </div>
      </ComboboxContext.Provider>
    );
  },
);
Combobox.displayName = "Combobox";

interface InputProps {
  className?: string;
  onChange?: (e) => void;
  loading?: boolean;
  onKeyDown?: (e) => void;
  onBlur?: (e) => void;
  onFocus?: (e) => void;
}
const Input: FC<PWC<InputProps>> = (props) => {
  const { className, onChange, loading, onKeyDown, onBlur, onFocus, ...rest } =
    props;

  const {
    open,
    inputValue,
    dispatch,
    inputRef,
    inputId,
    ariaLabel,
    placeholder,
    listId,
    list,
    selectedIndex,
    size,
    errored,
    noInputPrefix,
    disabled,
    noTextSelection,
    footerRef,
    allowTab,
    isMobile,
    openWithSelection, // S
    clearSelectedValue,
  } = useComboboxContext();

  const selectedId = list.current[selectedIndex]?._internalId;
  const handleKeyDown = (function ({
    dispatch,
    open,
    selectedIndex,
    inputRef,
    footerRef,
    list,
    noTextSelection,
    allowTab,
    onKeyDown,
  }) {
    return function (e) {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          if (open) {
            dispatch({
              type: "CLOSE",
            });
          }
          break;
        case "Home":
          e.preventDefault();
          dispatch({
            type: "NAVIGATE",
            selectedIndex: 0,
          });
          break;
        case "End":
          e.preventDefault();
          dispatch({
            type: "NAVIGATE",
            selectedIndex: list.current.length - 1,
          });
          break;
        case "ArrowDown": {
          e.preventDefault();
          if (!open) {
            dispatch({
              type: "OPEN",
            });
            noTextSelection || inputRef.current?.select?.();
            break;
          }
          let l = footerRef.current?.querySelector(
            "input:not([type=hidden]), select, button, textarea, a",
          );
          if (selectedIndex === list.current.length - 1 && l) {
            l.focus();
            dispatch({
              type: "NAVIGATE",
              selectedIndex: -1,
            });
            break;
          }
          if (list.current.length > 0) {
            // s = list
            // r = selectedIndex
            let e = P(selectedIndex, list.current);
            for (; e !== selectedIndex && list.current[e].disabled; )
              e = P(e, list.current);
            dispatch({
              type: "NAVIGATE",
              selectedIndex: e,
            });
          }
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          if (!open) {
            dispatch({
              type: "OPEN",
              selectedIndex: list.current.length - 1,
            });
            inputRef.current?.select();
            break;
          }
          let a = footerRef.current?.querySelector(
            "input:not([type=hidden]), select, button, textarea, a",
          );
          if (0 === selectedIndex && a) {
            a.focus();
            dispatch({
              type: "NAVIGATE",
              selectedIndex: -1,
            });
            break;
          }
          if (list.current.length > 0) {
            // s = list
            // r = selectedIndex
            let e = L(selectedIndex, list.current);
            for (; e !== selectedIndex && list.current[e].disabled; )
              e = L(e, list.current);
            dispatch({
              type: "NAVIGATE",
              selectedIndex: e,
            });
          }
          break;
        }
        case "Tab":
        case "Enter": {
          if ("Tab" === e.key && !allowTab) break;
          e.preventDefault();
          let n = list.current[selectedIndex]?.callback;
          if (!n) {
            dispatch({
              type: "CLOSE",
            });
            break;
          }
          n();
        }
      }
      onKeyDown && onKeyDown(e);
    };
  })({
    open,
    noTextSelection,
    list: list,
    selectedIndex,
    dispatch,
    inputRef,
    footerRef,
    allowTab,
    onKeyDown,
  });

  return (
    <div
      className={clsx(styles.container, {
        [styles.small]: size === "small",
        [styles.large]: size === "large",
      })}
    >
      <div aria-hidden="true" className={styles.prefix}>
        {loading ? <Spinner size={18} /> : <Search size={18} />}
      </div>

      <input
        {...rest}
        id={inputId}
        ref={inputRef}
        aria-activedescendant={open ? selectedId : undefined}
        aria-autocomplete="list"
        aria-controls={listId}
        aria-label={ariaLabel || placeholder}
        autoComplete="off"
        className={clsx(className, styles.input, styles.truncate, {
          [styles.errored]: errored,
          [styles.noPrefix]: noInputPrefix,
        })}
        disabled={disabled}
        placeholder={placeholder}
        role="searchbox"
        spellCheck="false"
        type="text"
        value={inputValue}
        onBlur={(e) => {
          let t = e.relatedTarget;
          for (
            ;
            // @ts-expect-error — TODO: Figure out what's going on here
            null !== t && ("FOOTER" !== t.tagName || !t.dataset.listFooter);

          ) {
            t = t.parentElement;
          }
          onBlur?.(e);
          isMobile ||
            t ||
            dispatch({
              type: "CLOSE",
            });
        }}
        onChange={(e) => {
          dispatch({
            type: "CHANGE",
            inputValue: e.target.value,
          });
          onChange?.(e);
        }}
        onFocus={(e) => {
          onFocus?.(e);
          isMobile ? inputRef.current?.select() : openWithSelection();
        }}
        onKeyDown={handleKeyDown}
        onMouseDown={openWithSelection}
        onTouchEnd={(e) => {
          // (0, k.gn)() &&
          inputRef.current && e.preventDefault();
          inputRef.current.style.transform = "translateY(-10000px)";
          inputRef.current.focus();

          setTimeout(() => {
            inputRef.current.style.transform = "";
          }, 50);
        }}
      />

      <ClearButton
        open={open}
        onClick={(e) => clearSelectedValue(e)}
        style={inputValue ? undefined : { display: "none" }}
      />

      {!inputValue ? (
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className={clsx(
            iconButton.iconButton,
            styles.iconButton,
            reset.reset,
          )}
          data-open={open}
          tabIndex={-1}
          type="button"
          onPointerDown={() => {
            open ? dispatch({ type: "CLOSE" }) : dispatch({ type: "OPEN" });
          }}
        >
          {/* @ts-expect-error TODO: className needs to be added to allow types */}
          <ChevronDown size={18} className={iconButton.chevron} />
        </button>
      ) : null}
    </div>
  );
};

Input.displayName = "Combobox.Input";

interface ListProps {
  className?: string;
  emptyMessage?: string;
  ListFooterComponent?: ReactNode;
  align?: "center" | "start" | "end";
  side?: "top" | "bottom" | "left" | "right";
  alignOffset?: number;
  width?: number | string;
  avoidCollisions?: boolean;
}

// Z
const List: FC<PWC<ListProps>> = (props) => {
  const {
    children,
    className,
    emptyMessage = "No results",
    ListFooterComponent,
    align = "center",
    side = "bottom",
    alignOffset,
    width,
    avoidCollisions = true,
    ...rest
  } = props;

  const {
    listId,
    listRef,
    footerRef,
    map,
    list,
    force,
    inputRef,
    open,
    isMobile,
    selectedIndex,
    dispatch,
  } = useComboboxContext();

  const [_width, setWidth] = useState<string | number>(0);

  // const {mounted: N,rendered:R} = ({exitDelay:150})

  // ???
  useEffect(() => {
    width && setWidth(width);
  }, [width]);

  // handle window resize
  useEffect(() => {
    let e = inputRef.current;
    if (!e) return;
    let t = new window.ResizeObserver(() => {
      if (!width) {
        let { width: t } = e.getBoundingClientRect();
        setWidth(t);
      }
    });

    return (
      t.observe(e),
      () => {
        t.disconnect();
      }
    );
  }, []);

  // TODO: describe this effect
  useEffect(() => {
    if (!listRef.current) return;
    let e = new Map();
    let items = Array.from(
      listRef.current.querySelectorAll("[data-descendant]"),
    );
    items
      .sort(
        (e, t) =>
          Number(e.getAttribute("data-order")) -
          Number(t.getAttribute("data-order")),
      )
      .forEach((t) => {
        if (t.parentElement) {
          t.parentElement.appendChild(t);
          let n = t.closest("[data-geist-combobox-list] > *");
          !n ||
            n === t ||
            n === listRef.current ||
            e.has(n) ||
            (listRef.current?.appendChild(n), e.set(n, !0));
        }
      });
  });

  // Footer?
  // (({ dispatch, open, inputRef, footerRef, list }) => {
  //   console.log("WHAT??");
  //   function handleKeyDown(e) {
  //     switch (e.key) {
  //       case "Escape":
  //         e.preventDefault();
  //         if (open) {
  //           inputRef.current?.focus();
  //           dispatch({
  //             type: "CLOSE",
  //           });
  //         }
  //         break;
  //       case "Home":
  //       case "ArrowDown":
  //         e.preventDefault();
  //         inputRef.current?.focus();
  //         dispatch({
  //           type: "NAVIGATE",
  //           selectedIndex: 0,
  //         });
  //         break;
  //       case "End":
  //       case "ArrowUp":
  //         e.preventDefault();
  //         inputRef.current?.focus();
  //         dispatch({
  //           type: "NAVIGATE",
  //           selectedIndex: list.current.length - 1,
  //         });
  //         break;
  //       case "Tab":
  //         e.preventDefault();
  //         inputRef.current?.focus();
  //     }
  //   }
  //   function handleClick() {
  //     setTimeout(() => {
  //       inputRef.current?.focus();
  //     }, 0);
  //     dispatch({
  //       type: "NAVIGATE",
  //       selectedIndex: list.current.length - 1,
  //     });
  //   }
  //   useEffect(() => {
  //     let e = footerRef.current?.querySelector(
  //       "input:not([type=hidden]), select, button, textarea, a",
  //     );
  //     return (
  //       open &&
  //         list.current.length > 0 &&
  //         (e?.addEventListener("keydown", handleKeyDown),
  //         e?.tagName === "BUTTON" && e.addEventListener("click", handleClick)),
  //       () => {
  //         e?.removeEventListener("keydown", handleKeyDown),
  //           e?.removeEventListener("click", handleClick);
  //       }
  //     );
  //   }, [open, list.current.length]);
  // })({
  //   dispatch,
  //   open,
  //   selectedIndex,
  //   inputRef,
  //   footerRef,
  //   list,
  // });

  let P = useMemo(
    () => ({
      list: list,
      map: map,
      force: force,
    }),
    [list, map, force],
  );

  // L
  const message = !list.current?.length ? (
    <Text
      color="geist-secondary"
      className={styles.empty}
      align="center"
      style={{ lineHeight: "initial" }}
    >
      {emptyMessage}
    </Text>
  ) : null;

  let M = null;
  if (ListFooterComponent) {
    M = React.isValidElement(ListFooterComponent) ? (
      ListFooterComponent
    ) : (
      // @ts-ignore
      <ListFooterComponent />
    );
  }

  const listChildren = (
    <ListContext.Provider value={P}>{children}</ListContext.Provider>
  );

  let footer = M ? (
    <footer data-list-footer={true} ref={footerRef}>
      {M}
    </footer>
  ) : null;

  if (isMobile) {
    return (
      <Dialog
        active={open}
        className={styles.drawer}
        onClickOutside={() => {
          dispatch({
            type: "CLOSE",
          });
        }}
      >
        <Input />
        <ul
          className={clsx(styles.list, styles.mobileList)}
          data-geist-combobox-list=""
          id={listId}
          ref={listRef}
          role="listbox"
          {...rest}
        >
          {listChildren}
          {message}
        </ul>
        {footer}
      </Dialog>
    );
  }

  let itemHeight =
    (function (e) {
      let t = e.current?.querySelector("[data-descendant]");
      // @ts-ignore
      if (t) return t.offsetHeight;
    })(listRef) || 36;
  let maxHeight = 5 * itemHeight + 16 + 2 + itemHeight / 2;
  let height =
    0 === list.current.length
      ? itemHeight + 16 + 2
      : list.current.length * itemHeight + 16 + 2;

  return (
    <Popover.Root open={open}>
      <Popover.Anchor></Popover.Anchor>

      <Popover.Portal>
        <Popover.Content
          // o.VY
          align={align}
          alignOffset={8}
          avoidCollisions
          className={clsx(styles.list, {
            [styles.open]: open,
            [styles.hidden]: !open,
          })}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
          side={side}
          sideOffset={8}
          style={{
            outline: 0,
            overflowY: height > maxHeight ? "auto" : "hidden",
            height: height,
            width: _width,
            maxHeight: maxHeight,
          }}
          tabIndex={-1}
        >
          <ul
            ref={listRef}
            {...rest}
            data-geist-combobox-list=""
            id={listId}
            role="listbox"
          >
            {listChildren}
            {message}
          </ul>
          {footer}
        </Popover.Content>
      </Popover.Portal>

      {!open ? (
        <ul aria-hidden="true" id={listId} style={{ display: "none" }}>
          {listChildren}
        </ul>
      ) : (
        <div aria-live="polite" className="geist-sr-only" role="status">
          {list.current.length > 0
            ? `${list.current.length} result${
                list.current.length > 1 ? "s" : ""
              } available`
            : null}
          {0 === list.current.length
            ? "string" == typeof emptyMessage
              ? emptyMessage
              : "No results"
            : null}
        </div>
      )}
    </Popover.Root>
  );
};

List.displayName = "Combobox.List";

interface OptionProps extends React.PropsWithChildren {
  value: string;
  prefix?: JSX.Element;
  suffix?: JSX.Element;
  className?: string;
  truncatePrefix?: boolean;
  truncateSuffix?: boolean;
  displayValue?: string;
  isMenu?: boolean;
  "data-testid"?: string;
  disabled?: boolean;
  ignoreDefaultHeight?: boolean;
}
const Option: FC<PWC<OptionProps>> = ({
  children,
  className,
  value,
  prefix,
  suffix,
  truncatePrefix,
  truncateSuffix,
  displayValue,
  isMenu,
  disabled,
  ignoreDefaultHeight,
}) => {
  const {
    selectedIndex,
    selectedValue,
    filterList,
    map,
    onSelect,
    size,
    listRef,
    open,
    dispatch,
    inputRef,
    isMobile,
    noNegativeIndex,
  } = useComboboxContext();

  function S() {
    onSelect(value);
  }

  const { index, ref, id } = useValue(ListContext, {
    callback: S,
    label: "string" == typeof children ? children : value,
    value,
    prefix,
    displayValue,
    isMenu,
    disabled,
  });

  let isInMap = Boolean(map.current[id]);

  // grey bg
  let shouldHighlight =
    (-1 !== index && selectedIndex === index && open) ||
    (0 === index && selectedIndex === (noNegativeIndex ? index : -1) && open);

  let shouldBold = selectedValue === value && open;
  let handleMouseMove = useCallback(() => {
    dispatch({
      type: "NAVIGATE",
      selectedIndex: index,
    });
  }, [index]);

  useEffect(() => {
    shouldHighlight &&
      ref.current &&
      !isMobile &&
      ref.current.scrollIntoView({
        block: "nearest",
      });
  }, [shouldHighlight, isMobile]);

  const order =
    filterList && isInMap
      ? filterList.findIndex((e) => {
          let { _internalId: t } = e;
          return t === id;
        })
      : undefined;

  return -1 === order ? null : (
    <li
      ref={ref}
      className={clsx(styles.option, {
        [styles.small]: size === "small",
        [styles.large]: size === "large",
        [styles.optionDisabled]: disabled,
      })}
      id={id}
      aria-selected={shouldHighlight}
      data-highlighted={shouldBold}
      data-descendant={id}
      data-order={order}
      role="option"
      style={{ height: ignoreDefaultHeight ? undefined : 36 }}
      onMouseMove={handleMouseMove}
      onMouseUp={(e) => {
        e.preventDefault();
        S();
      }}
      onPointerOver={() => {
        isMobile && inputRef.current?.blur();
      }}
    >
      {prefix ? (
        <span data-geist-combobox-option-prefix="true">{prefix}</span>
      ) : null}
      <span className={styles.truncate}>{children}</span>
      {suffix ? (
        <span data-geist-combobox-option-suffix="true">{suffix}</span>
      ) : null}
    </li>
  );
};

Option.displayName = "Combobox.Option";

export default Object.assign(Combobox, {
  Input,
  List,
  Option,
});

const ClearButton = ({ style, onClick, open }) => {
  const { focusProps, isFocusVisible } = useFocusRing();
  return (
    <button
      {...focusProps}
      aria-label="Clear selected value"
      className={clsx(
        iconButton.iconButton,
        styles.iconButton,
        styles.clearButton,
        reset.reset,
        { ["focus-visible"]: isFocusVisible },
      )}
      onClick={onClick}
      data-open={open}
      tabIndex={0}
      type="button"
      style={style}
    >
      {/* @ts-expect-error TODO className needs to be added to allow types */}
      <X size={18} className={iconButton.cross} />
    </button>
  );
};

// wrap end of array to beginning
function P(e: number, t: any[]) {
  return 0 === t.length ? e : (e + 1) % t.length;
}
// wrap beginning of array to end
function L(e: number, t: any[]) {
  return 0 === t.length ? e : (e - 1 + t.length) % t.length;
}
// ??????
function K(e) {
  return window.setTimeout(e, 150);
}
