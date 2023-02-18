"use client";

import { MDXProvider } from "@mdx-js/react";
import dynamic from "next/dynamic";

import { mdxComponents } from "../../../mdx-components";

const Button = dynamic(() => import("./button.mdx"));
const Capacity = dynamic(() => import("./capacity.mdx"));

export default function Slug({ params: { slug } }) {
  const Page = () => {
    switch (slug) {
      case "button":
        return <Button />;
      case "capacity":
        return <Capacity />;
      default:
        return <div>🚧 Under construction 🚧</div>;
    }
  };

  return (
    <MDXProvider components={mdxComponents}>
      <Page />
    </MDXProvider>
  );
}
