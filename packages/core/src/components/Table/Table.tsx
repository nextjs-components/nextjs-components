import clsx from "clsx";
import React from "react";
import { Children, useState } from "react";

import reset from "../../styles/reset/reset.module.css";
import { Badge } from "../Badge";
import { Checkbox } from "../Checkbox";
import { Scroller } from "../Scroller";
import styles from "./Table.module.css";

interface Cell<T extends any = any>
  extends React.FC<{
    value: any; // FIXME
  }> {}

type Column = {
  Header: string;
  accessor: string | null;
  ellipsis?: boolean;
  expandable?: boolean;
  fixedWidth?: number;
  align?: "right" | "center";
  columnClassName?: string;
  /**
   * @example
   * ```tsx
   * Cell: ({ value }) => {
   *  if (!value) return ''
   *   return '$' + value
   * }
   * ```
   */
  Cell?: Cell;
};
type Data = any;

type HeaderActionParams = { idsChecked: string[]; disabled: boolean };
type RowActionParams = { row: any; rowIdx: number };

interface Props {
  columns?: Column[];
  data?: Data[];
  caption?: string;
  overflow?: number;
  header?: boolean;
  sticky?: boolean;
  sortable?: boolean;
  defaultRows?: number;
  selectable?: boolean;
  fixed?: boolean;
  headerActions?: (params: HeaderActionParams) => JSX.Element;
  rowActions?: (params: RowActionParams) => JSX.Element;
  width?: React.HTMLAttributes<HTMLDivElement>["style"]["width"];
  height?: React.HTMLAttributes<HTMLDivElement>["style"]["height"];
  empty?: JSX.Element;
}

const Table: React.ComponentType<React.PropsWithChildren<Props>> = ({
  selectable,
  columns = [],
  data = [],
  caption = "A basic table",
  overflow,
  header = true,
  headerActions,
  rowActions,
  width = "100%",
  height = "100%",
  defaultRows,
  sticky,
  empty,
  fixed,
  children,
}) => {
  const [idsChecked, setIdsChecked] = useState<string[]>([]);
  // console.log(Children.count(children)); // 1
  return (
    <div>
      {!!Children.count(children) && (
        <div className={clsx([styles.filter])}>{children}</div>
      )}
      <div
        className={clsx([styles.wrapper, styles.overflow])}
        data-geist-table-wrapper=""
        // @ts-expect-error
        style={{ ...(overflow ? { "--overflow-width": `${1000}px` } : {}) }}
      >
        <Scroller width={width} height={height}>
          <div className={clsx(styles.tableWrapper)}>
            <table
              role="table"
              className={clsx(styles.table, {
                [styles.selectable]: selectable,
                [styles.sticky]: sticky,
                [styles.fixed]: fixed,
              })}
              data-geist-table=""
            >
              <caption className={clsx(styles.caption, reset.visuallyHidden)}>
                {caption}
              </caption>
              <colgroup>
                {selectable && <col style={{ width: "40px" }} />}
                {columns.map((col, i) => {
                  return <col key={`${col}${i}`} />;
                })}
                {selectable && <col style={{ width: "40px" }} />}
              </colgroup>
              <thead
                className={
                  header === false ? "geist-visually-hidden" : undefined
                }
                data-geist-table-header="original"
              >
                <tr role="row">
                  {
                    // Generate Header Checkbox
                    selectable && (
                      <th colSpan={1} role="columnheader">
                        <div className={styles.container}>
                          <Checkbox
                            indeterminate={
                              !(idsChecked.length === 0) &&
                              idsChecked.length !== data?.length
                            }
                            checked={
                              idsChecked.length === data?.length &&
                              data?.length !== 0
                            }
                            disabled={data.length === 0}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setIdsChecked(data?.map((e) => e.id));
                              } else {
                                setIdsChecked([]);
                              }
                            }}
                          />
                        </div>
                      </th>
                    )
                  }
                  {columns.map((column, i) => {
                    const {
                      Header,
                      accessor,
                      fixedWidth,
                      align,
                      columnClassName,
                    } = column;

                    // Generate column headers
                    return (
                      <th
                        colSpan={1}
                        role="columnheader"
                        key={`${accessor}${i}`}
                        style={{ width: fixedWidth }}
                        className={clsx(
                          {
                            [styles.center]: align === "center",
                            [styles.right]: align === "right",
                          },
                          columnClassName,
                        )}
                      >
                        <div className={styles.container}>{Header}</div>
                      </th>
                    );
                  })}
                  {
                    // Generate Header Overflow menu
                    selectable && (
                      <th
                        colSpan={1}
                        role="columnheader"
                        style={{ width: "40px" }}
                        className={styles.right}
                      >
                        <div className={styles.container}>
                          <div className={styles.actions}>
                            {!!idsChecked.length && (
                              <Badge
                                className={styles.count}
                                type="secondary"
                                variant="contrast"
                              >
                                {idsChecked.length}
                              </Badge>
                            )}
                            {typeof headerActions === "function" &&
                              headerActions({
                                idsChecked,
                                disabled: idsChecked.length === 0,
                              })}
                          </div>
                        </div>
                      </th>
                    )
                  }
                </tr>
              </thead>
              <tbody role="rowgroup">
                {data?.map((row, rowIdx) => {
                  // Generate each row
                  return (
                    <tr role="row" key={row.id ?? rowIdx}>
                      {
                        // Generate Row item Checkbox
                        selectable && (
                          <td role="cell">
                            <div className={styles.container}>
                              <Checkbox
                                checked={idsChecked.includes(row.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setIdsChecked((ids) => [...ids, row.id]);
                                  } else {
                                    setIdsChecked((ids) =>
                                      ids.filter((id) => id !== row.id),
                                    );
                                  }
                                }}
                              />
                            </div>
                          </td>
                        )
                      }
                      {columns.map((column, colIdx) => {
                        const {
                          accessor,
                          Cell,
                          ellipsis,
                          align,
                          columnClassName,
                        } = column;

                        // For each row,
                        // Generate each column value, by columns.accessor
                        const cn = clsx(
                          {
                            [styles.ellipsisCell]: ellipsis,
                            [styles.center]: align === "center",
                            [styles.right]: align === "right",
                          },
                          columnClassName,
                        );
                        const key = `${accessor}${colIdx}`;
                        if (Cell) {
                          // accessor may be null if we want to use the `Cell`
                          // property — a React FC — to do some transformations
                          // on the root data object.
                          // ex. The root object might have related models.
                          //     And the column value that should be displayed
                          //     may need to derive data from various related models
                          if (accessor === null) {
                            return (
                              <td role="cell" className={cn} key={key}>
                                <Cell value={row} />
                              </td>
                            );
                          }
                          return (
                            <td role="cell" className={cn} key={key}>
                              <Cell value={row[accessor]} />
                            </td>
                          );
                        }
                        return (
                          <td role="cell" className={cn} key={key}>
                            {row[accessor]}
                          </td>
                        );
                      })}
                      {
                        // Generate Row item Overflow menu
                        selectable && (
                          <td
                            role="cell"
                            style={{ width: "40px" }}
                            className={styles.right}
                          >
                            <div className={styles.actions}>
                              {typeof rowActions === "function" &&
                                rowActions({
                                  row,
                                  rowIdx,
                                })}
                            </div>
                          </td>
                        )
                      }
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {!data || data?.length === 0 ? (
              empty ? (
                <div
                  style={{ "--rows": defaultRows } as any}
                  className={styles.empty}
                >
                  <span>{empty}</span>
                </div>
              ) : (
                <div
                  aria-hidden="true"
                  style={{ "--rows": defaultRows } as any}
                  className={styles.placeholder}
                />
              )
            ) : null}
          </div>
        </Scroller>
      </div>
    </div>
  );
};
export default Table;
