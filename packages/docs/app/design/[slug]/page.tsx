"use client";

import { MDXProvider } from "@mdx-js/react";
import dynamic from "next/dynamic";

import { mdxComponents } from "../../../mdx-components";

const Button = dynamic(() => import("./button.mdx"));
const Capacity = dynamic(() => import("./capacity.mdx"));
const Entity = dynamic(() => import("./entity.mdx"));

export default function Slug({ params: { slug } }) {
  const Page = () => {
    switch (slug) {
      case "button":
        return <Button />;
      case "capacity":
        return <Capacity />;
      case "entity":
        return <Entity />;
      default:
        return (
          <div>
            <h1>🚧 Under construction 🚧</h1>
            In the process of migrating to the Next.js 13 App Dir. Only the
            following component docs have been migrated:
            <ul>
              <li>Button</li>
              <li>Capacity</li>
              <li>Entity</li>
            </ul>
          </div>
        );
    }
  };

  return (
    <MDXProvider components={mdxComponents}>
      <Page />
    </MDXProvider>
  );
}