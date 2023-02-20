"use client";

import { MDXProvider } from "@mdx-js/react";

import { mdxComponents } from "../../../../mdx-components";
import GridMdx from "./grid.mdx";

export default function ColorPage() {
  return (
    <MDXProvider components={mdxComponents}>
      <GridMdx />
    </MDXProvider>
  );
}
