import * as Popover from "@radix-ui/react-popover";
import * as Portal from "@radix-ui/react-portal";
import clsx from "clsx";
import React, {
  type Dispatch,
  type FC,
  type MutableRefObject,
  type PropsWithChildren as PWC,
  type ReactNode,
  type Reducer,
  type ReducerAction,
  createContext,
  forwardRef,
  startTransition,
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
import { mergeRefs } from "../../utils/merge-refs";
import { Text } from "../Text";
import styles from "./combobox.module.css";
import iconButton from "./icon-button.module.css";

// ??????
function K(e) {
  return window.setTimeout(e, 150);
}

const useLayoutEffect =
  typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

let useCThing = () => {
  let listRef = useRef([]); // e
  let mapRef = useRef({}); // t
  let [, force] = useState<{}>(); // n
  let ref = useRef<HTMLUListElement>(null); // r

  useLayoutEffect(() => {
    if (!ref.current) return;
    let items = Array.from(ref.current.querySelectorAll("[data-descendant]"));
    let o =
      items.length !== listRef.current.length ||
      !items.every((t, n) => listRef.current[n].element === t);

    if (o) {
      listRef.current = items.map((e) => {
        let n = e.getAttribute("data-descendant");
        if (!n)
          throw Error("Descendant element must have a data-descendant key");
        let r = mapRef.current[n];
        return {
          element: listRef,
          ...r,
        };
      });
      // force({}); // this causes infinite renders..
    }
  });

  return {
    ref: ref,
    list: listRef,
    map: mapRef,
    force: force,
  };
};

/** what provider is this? */
const $ = createContext({
  list: { current: [] },
  map: { current: {} },
  force: ({}) => {},
});

const useValue = (context: typeof $, t: Partial<Item>) => {
  let [index, setIndex] = useState(-1);
  let ref = useRef(null);
  let { list, map, force } = useContext(context);
  let id = useId();

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

const INITIAL_STATE: State = {
  open: false,
  showAllResults: false,
  inputValue: "",
  selectedValue: null,
  selectedIndex: 0,
};

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
  force() {},
  inputId: "combobox-input-:R6ol8mH1:",
  inputRef: { current: null } as MutableRefObject<HTMLInputElement | null>,
  inputValue: "",
  isMobile: false,
  list: { current: Array(0) },
  listId: "combobox-list-:R6ol8m:",
  listRef: { current: null } as MutableRefObject<HTMLUListElement | null>,
  map: {
    current: {},
  } as MutableRefObject<
    Map<
      string,
      {
        _internalId: ReturnType<typeof useId>;
        callback: () => void;
        disabled?: boolean;
        displayValue?: ReactNode;
        isMenu?: boolean;
        label?: ReactNode;
        prefix?: ReactNode;
        value: string;
      }
    >
  >,
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
      ...INITIAL_STATE,
      inputValue: value,
    });

    // U
    const inputRef = useRef<HTMLInputElement>(null);
    // q
    const footerRef = useRef(null);

    const id = useId();
    const inputId = "combobox-input-" + id;
    const listId = "combobox-list-" + id;

    const { ref: listRef, ...Y } = useCThing();

    useEffect(() => {
      onChangeOpen?.(open);
    }, [onChangeOpen, open]);

    // useImperativeHandle(
    //   forwardedRef,
    //   () => ({
    //     setValue(e) {
    //       dispatch({
    //         type: "RESET",
    //         inputValue: e,
    //       });
    //     },
    //     setSelectedValue(e) {
    //       dispatch({
    //         type: "CONTINUE",
    //         selectedValue: e,
    //       });
    //     },
    //     setSelectedIndex(e) {
    //       dispatch({
    //         type: "NAVIGATE",
    //         selectedIndex: e,
    //       });
    //     },
    //     getSelectedIndex: () => X,
    //     clear() {
    //       dispatch({
    //         type: "CLEAR",
    //       });
    //     },
    //     close() {
    //       dispatch({
    //         type: "CLOSE",
    //       });
    //     },
    //   }),
    //   [dispatch, selectedIndex],
    // );

    let er = value ? value : selectedValue;
    // ei
    let items = Object.values(Y.map.current);
    // eo
    let regularItems = [];
    // MenuItems are sent to the end of the list
    // es
    let menuItems = [];

    for (let item of items) {
      // @ts-expect-error TODO: type items array
      item.isMenu ? menuItems.push(item) : regularItems.push(item);
    }

    let result = showAllResults
      ? regularItems
      : filter(regularItems, inputValue);
    let allItems =
      showAllResults || result.length ? [...result, ...menuItems] : [];

    function eu() {
      if (!open) {
        setTimeout(() => {
          noTextSelection || inputRef.current?.select?.();
        }, 10);
        dispatch({
          type: "OPEN",
        });
      }
    }
    useEffect(() => {
      let e;
      if (!open) {
        if (er && items?.length) {
          // @ts-expect-error TODO: type items array
          let t = items.find((e) => e.value === er);

          t
            ? // @ts-expect-error TODO: type items array
              t.displayValue
              ? dispatch({
                  type: "RESET",
                  inputValue: er,
                })
              : inputValue
              ? (e = K(() => {
                  dispatch({
                    type: "RESET",
                    // @ts-expect-error TODO: type items array
                    inputValue: t.label,
                  });
                }))
              : dispatch({
                  type: "RESET",
                  // @ts-expect-error TODO: type items array
                  inputValue: t.label,
                })
            : dispatch({
                type: "RESET",
                inputValue: er,
              });
        }
        return () => {
          clearTimeout(e);
        };
      }
    }, [er, open, items.length]);

    // coerce null to empty string
    useEffect(() => {
      null === value &&
        dispatch({
          type: "RESET",
          inputValue: "",
        });
    }, [value, dispatch]);

    const isMobile = useMediaQuery("(max-width: 375px)");
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
          inputId,
          inputRef,
          listId,
          listRef,
          footerRef,
          placeholder,
          filterList: allItems,
          clearSelectedValue: function (e) {
            e.preventDefault(), onClear?.(); // E
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
          openWithSelection: eu,
          // list, map, force
          ...Y,
        }}
      >
        <div
          className={styles.screenReaderSelect}
          tabIndex={0}
          aria-expanded="false"
          aria-haspopup="listbox"
          aria-owns={listId}
          role="combobox"
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
  const { className, onChange, loading: a, onKeyDown, onBlur, onFocus } = props;

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
        <Search size={18} />
      </div>

      <input
        id={inputId}
        // ref={mergeRefs([inputRef])} // [t:dispatch,h:inputRef]
        ref={inputRef}
        aria-activedescendant={open ? selectedId : undefined}
        aria-autocomplete="list"
        aria-controls={listId}
        aria-label={ariaLabel || placeholder}
        autoComplete="off"
        className={clsx(styles.input, styles.truncate, {
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
          console.log("onFocus");
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

  const { open, inputRef, dispatch, listRef, listId, list, map, force } =
    useComboboxContext();

  let P = useMemo(
    () => ({
      list: list,
      map: map,
      force: force,
    }),
    [list, map, force],
  );

  return (
    <Popover.Root open={open}>
      <Popover.Anchor></Popover.Anchor>

      <Popover.Portal>
        <Popover.Content
          asChild
          align={align}
          side={side}
          sideOffset={8}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          // onInteractOutside={(e) => {
          //   dispatch({ type: "CLOSE" });
          // }}
          style={{
            outline: 0,
            overflowY: "auto",
            width: inputRef.current?.offsetWidth,
            // height formula = 18px + itemCount * 36px
            height: 18 + Math.max(1, list.current.length) * 36,
            maxHeight: 216, // arbitrary?
          }}
        >
          <div className={clsx(styles.list, styles.open)}>
            <ul
              data-geist-combobox-list=""
              role="listbox"
              id={listId}
              ref={listRef}
            >
              <$.Provider value={P}>{children}</$.Provider>
              {!list.current?.length ? (
                <Text
                  color="geist-secondary"
                  className={styles.empty}
                  align="center"
                >
                  No results
                </Text>
              ) : null}
            </ul>
          </div>
        </Popover.Content>
      </Popover.Portal>

      {!open ? (
        <ul aria-hidden="true" id={listId} style={{ display: "none" }}>
          {children}
        </ul>
      ) : (
        <div aria-live="polite" className="geist-sr-only" role="status">
          {list.current.length} results available
        </div>
      )}
    </Popover.Root>
  );
};

List.displayName = "Combobox.List";

interface OptionProps extends React.PropsWithChildren {
  value: string;
  prefix: JSX.Element;
  suffix: JSX.Element;
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

  const { index, ref, id } = useValue($, {
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
  let __R =
    (-1 !== index && selectedIndex === index && open) ||
    (0 === index && selectedIndex === (noNegativeIndex ? index : -1) && open);

  let P = selectedValue === value && open;
  let L = useCallback(() => {
    dispatch({
      type: "NAVIGATE",
      selectedIndex: index,
    });
  }, [index]);

  useEffect(() => {
    __R &&
      ref.current &&
      !isMobile &&
      ref.current.scrollIntoView({
        block: "nearest",
      });
  }, [__R, isMobile]);

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
      // grey bg
      aria-selected={__R}
      // bold text
      data-highlighted={P}
      data-descendant={id}
      data-order={order}
      role="option"
      style={{ height: ignoreDefaultHeight ? undefined : 36 }}
      onMouseMove={L}
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
