"use client";

import { lazy, Suspense } from "react";

import nodes from "../nodes.json";

// MDX examples pass component functions to the live editor's scope.
// Load them inside the client boundary so those functions stay on the client.
const posts = Object.fromEntries(
  nodes.map(({ path }) => {
    const slug = path.slice("/design/".length);
    return [slug, lazy(() => import(`./${slug}.mdx`))] as const;
  }),
);

export default function Post({ slug }: { slug: string }) {
  const Content = posts[slug];
  return (
    <Suspense fallback={null}>
      <Content />
    </Suspense>
  );
}
