"use client";

import { MDXProvider } from "@mdx-js/react";

import { mdxComponents } from "@/mdx-components";

import IntroductionMdx from "./introduction.mdx";

export default function IntroductionPage() {
  return (
    <MDXProvider components={mdxComponents}>
      <IntroductionMdx />
    </MDXProvider>
  );
}
