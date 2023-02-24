import clsx from "clsx";
import Link from "next/link";
import { Spacer } from "nextjs-components";
import { Code, InlineCode, Text } from "nextjs-components/src/components/Text";
import { Link as LinkIcon } from "nextjs-components/src/icons";
import React from "react";

import { Editor } from "@/components/editor";
import { Example } from "@/components/example";
import link from "@/components/link/link.module.css";

import styles from "./app/design/design.module.css";

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
  Text,
  h1: (props) => <Text as="h1" size={32} weight={600} {...props} />,
  h2: (props) => (
    <Text as="h2" color="accents-5" size={16} weight={400} {...props} />
  ),
  // Strange situation going on here... but this
  // is what I transcribed from the Vercel design site.
  h3: ({ children, ...props }) => {
    // props are provided by a mix of
    // - rehype-autolink-headings
    // - rehype-slug
    const { id } = props;
    const text = children.props.children;
    const newChild = React.cloneElement(children, {
      id,
      className: clsx(link.link, link["fragment-link"]),
      children: (
        <>
          <i className={link.anchor}>
            <LinkIcon size={16} />
          </i>
          <Text as="h3" size={20} weight={600}>
            {text}
          </Text>
        </>
      ),
    });
    return (
      <div style={{ marginBottom: "1.25rem" }} className={styles["title-bar"]}>
        {newChild}
      </div>
    );
  },
  h4: (props) => <Text as="h4" {...props} />,
  h5: (props) => <Text as="h5" {...props} />,
  h6: (props) => <Text as="h6" {...props} />,
  p: (props) => <Text as="p" size={16} color="accents-6" {...props} />,
  code: (props) => {
    // Check if content of an MDX ```codeblock```. This code tags will likely have a language-* className added.
    if (props.className) {
      return <code {...props} />;
    }
    /// Plain `code` MDX will have no className added.
    return <InlineCode {...props} />;
  },
  pre: Code,
  a: ({ children, ...props }) => {
    // anchor link
    if (props.id) {
      return <a {...props}>{children}</a>;
    }
    // internal link
    if (props.href.startsWith("/")) {
      return <Link {...props}>{children}</Link>;
    }
    // external link
    return (
      <a rel="noopener" target="_blank" {...props} className="external">
        {children}
        <style jsx>{`
          .external {
            color: var(--geist-success);
          }
          .external:hover {
            color: var(--geist-foreground);
          }
        `}</style>
      </a>
    );
  },
  Spacer,
  Link,
  Editor,
  Example,
};

export function useMDXComponents(components) {
  return { ...mdxComponents, ...components };
}
