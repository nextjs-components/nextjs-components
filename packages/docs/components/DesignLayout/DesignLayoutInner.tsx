import React, { useState, useMemo } from "react";
import { MDXProvider } from "@mdx-js/react";
import Link from "next/link";

import { Avatar } from "nextjs-components/src/components/Avatar";
import { Button } from "nextjs-components/src/components/Button";
import { Editor } from "nextjs-components/src/components/Editor";
import { Checkbox } from "nextjs-components/src/components/Checkbox";
import { ColorCard } from "nextjs-components/src/components/ColorCard";
import { Container } from "nextjs-components/src/components/Container";
import { fs } from "nextjs-components";
import { Tree, Folder, File } from "nextjs-components/src/components/FileTree";
import { LoadingDots } from "nextjs-components/src/components/LoadingDots";
import { Toggle } from "nextjs-components/src/components/Toggle";
import { Snippet } from "nextjs-components/src/components/Snippet";
import { Spacer } from "nextjs-components/src/components/Spacer";
import { Spinner } from "nextjs-components/src/components/Spinner";
import { Table } from "nextjs-components/src/components/Table";
import {
  Text,
  InlineCode,
  Code,
  OldCode,
  UL,
  OL,
  LI,
} from "nextjs-components/src/components/Text";
import { useToasts } from "nextjs-components/src/components/Toast";
import { KBD } from "nextjs-components/src/components/KeyboardInput";
import { Capacity } from "nextjs-components/src/components/Capacity";
import Modal from "nextjs-components/src/components/Modal";
import {
  Entity,
  EntityField,
  EntityThumbnail,
} from "nextjs-components/src/components/Entity";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuWrapper,
  MenuLink,
} from "nextjs-components/src/components/Menu";
import { StatusDot } from "nextjs-components/src/components/StatusDot";

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowUp as Up,
  GitHub,
  FacebookIcon,
  GoogleIcon,
  MoreHorizontal,
} from "nextjs-components/src/icons";

const BlueContainer = ({ style, children, ...props }) => (
  <Container
    style={{
      ...style,
      background: "var(--geist-success)",
      color: "rgb(255, 255, 255)",
      padding: "var(--geist-gap-half)",
      borderRadius: "var(--geist-radius)",
    }}
    {...props}
  >
    {children}
  </Container>
);

const columns = [
  {
    Header: "First Name",
    accessor: "first",
  },
  {
    Header: "Last Name",
    accessor: "last",
  },
  {
    Header: "Email",
    accessor: "email",
  },
];

const data = [
  {
    first: "John",
    last: "Doe",
    email: "john@doe.com",
  },
  {
    first: "Dorothy",
    last: "Boe",
    email: "dorothy@boe.com",
  },
  {
    first: "Baby",
    last: "Moe",
    email: "baby@moe.com",
  },
];

/**
 * This components fulfill in-MDX code blocks that use JSX.
 */
const editorScope = {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Avatar,
  BlueContainer,
  Button,
  Capacity,
  Checkbox,
  Code,
  Container,
  Entity,
  EntityField,
  EntityThumbnail,
  Facebook: FacebookIcon,
  File,
  Folder,
  fs,
  GitHub,
  Google: GoogleIcon,
  InlineCode,
  isMounted: true,
  KBD,
  Link,
  LoadingDots,
  Menu,
  MenuButton,
  MenuItem,
  MenuWrapper,
  MenuLink,
  Modal,
  MoreHorizontal,
  Snippet,
  Spacer,
  Spinner,
  StatusDot,
  Table,
  columns,
  data,
  Text,
  UL,
  OL,
  LI,
  Toggle,
  Tree,
  Up,
  useMemo,
  useState,
  useToasts,
};

const mdxComponents = {
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
  pre: ({ children }) => {
    // render Code Block
    if ("className" in children.props) {
      return <Code>{children.props.children}</Code>;
    }
    return <Editor scope={editorScope} code={children.props.children} />;
  },
  ColorCard,
  Spacer,
  Link,
};

export default function DesignLayoutInner({ children }) {
  return <MDXProvider components={mdxComponents}>{children}</MDXProvider>;
}
