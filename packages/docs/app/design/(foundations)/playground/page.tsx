"use client";

import { MDXProvider } from "@mdx-js/react";

import { mdxComponents } from "@/mdx-components";

import Mdx from "./playground.mdx";

export default function Page() {
  return (
    <MDXProvider components={mdxComponents}>
      <Mdx />
    </MDXProvider>
  );
}
