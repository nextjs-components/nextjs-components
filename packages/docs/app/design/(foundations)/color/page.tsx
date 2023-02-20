"use client";

import { MDXProvider } from "@mdx-js/react";

import { mdxComponents } from "../../../../mdx-components";
import ColorMdx from "./color.mdx";

export default function ColorPage() {
  return (
    <MDXProvider components={mdxComponents}>
      <ColorMdx />
    </MDXProvider>
  );
}
