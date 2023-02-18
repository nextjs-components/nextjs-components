import Link from "next/link";
import { Spacer } from "nextjs-components";
import { ColorCard } from "nextjs-components/src/components/ColorCard";
import { Editor } from "nextjs-components/src/components/Editor";
import { OldCode, Text } from "nextjs-components/src/components/Text";

export const mdxComponents = {
  th: ({ children, ...props }) => {
    return (
      <th className={"head-cell"}>
        <div>{children}</div>
      </th>
    );
  },
  td: ({ children, ...props }) => {
    return (
      <td className={"table-cell"}>
        <div>{children}</div>
      </td>
    );
  },
  table: (props) => {
    return (
      <div className={"table-container"}>
        <table
          {...props}
          // style={{
          //   "--font-size-primary": "1rem",
          //   "--font-size-small": "0.875rem",
          //   "--line-height-primary": "1.5em",
          //   "--line-height-small": "1.571em",
          // }}
        />
        <style jsx>{`
          .table-container {
            font-size: 0.875rem;
            margin: 40px -24px;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
          table {
            min-width: 640px;
            padding: 0 24px;
            border-collapse: separate;
            border-spacing: 0;
            width: 100%;
          }
          table :global(thead) :global(th):nth-child(1) {
            border-bottom: 1px solid var(--accents-2);
            border-left: 1px solid var(--accents-2);
            border-radius: 4px 0px 0px 4px;
            border-top: 1px solid var(--accents-2);
          }
          table :global(thead) :global(th):last-child {
            border-bottom: 1px solid var(--accents-2);
            border-radius: 0 4px 4px 0;
            border-right: 1px solid var(--accents-2);
            border-top: 1px solid var(--accents-2);
          }
          table :global(thead) :global(th) {
            background: var(--accents-1);
            border-bottom: 1px solid var(--accents-2);
            border-top: 1px solid var(--accents-2);
          }
          table :global(th) {
            color: var(--accents-5);
            font-size: var(--font-size-small);
            line-height: var(--line-height-small);
            font-weight: 400;
            letter-spacing: 0;
          }
          table :global(th),
          table :global(td) {
            padding: 0 10px;
            text-align: left;
            vertical-align: top;
          }
          table :global(th) > :global(div) {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-align-items: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding: 10px 0;
            line-height: var(--line-height-small);
            font-size: var(--font-size-small);
          }
          table :global(td) > :global(div) {
            min-height: 50px;
            padding: 12px 0;
            line-height: 24px;
          }
          table :global(tbody) :global(tr):not(:last-child) :global(td) {
            border-bottom: 1px solid var(--accents-2);
          }
          table :global(td):nth-child(1) {
            border-left: 1px solid transparent;
            min-width: 120px;
          }
          table :global(tbody) :global(tr):not(:last-child) :global(td) {
            border-bottom: 1px solid var(--accents-2);
          }
          table :global(td):last-child {
            border-right: 1px solid transparent;
          }

          table
            :global(thead)
            + :global(tbody)
            :global(tr):last-child
            :global(td) {
            border-bottom: 1px solid var(--accents-2);
          }

          table :global(td):nth-child(1) {
            border-left: 1px solid transparent;
            min-width: 120px;
          }

          table :global(th),
          table :global(td) {
            padding: 0 10px;
            text-align: left;
            vertical-align: top;
          }

          table :global(tbody) :global(td) {
            color: var(--accents-6);
            font-size: var(--font-size-small);
            line-height: var(--line-height-small);
          }
        `}</style>
      </div>
    );
  },
  Text: (props) => <Text {...props} />,
  // margin: "revert" allows margin to use the user agent stylesheet values
  h1: (props) => (
    <Text as="h1" size={48} style={{ margin: "revert" }} {...props} />
  ),
  h2: (props) => (
    <Text as="h2" size={24} style={{ margin: "revert" }} {...props} />
  ),
  h3: (props) => (
    <Text as="h3" size={24} style={{ margin: "revert" }} {...props} />
  ),
  h4: (props) => <Text as="h4" style={{ margin: "revert" }} {...props} />,
  h5: (props) => <Text as="h5" style={{ margin: "revert" }} {...props} />,
  h6: (props) => <Text as="h6" style={{ margin: "revert" }} {...props} />,
  p: (props) => <Text as="p" style={{ margin: "revert" }} {...props} />,
  code: (props) => <OldCode noTicks {...props} />,
  ColorCard,
  Spacer,
  Link,
  Editor,
};
